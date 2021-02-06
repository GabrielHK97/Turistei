import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');

@Entity('users')
export default class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    profile_pic_path: string;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    birthdate :Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }


    async comparePassword(hash: string){
      return await bcrypt.compare(hash, this.password);
    }

    generateToken() {
      return jwt.sign({ id: this.id },"secret", { expiresIn: 86400});
    }
    
}