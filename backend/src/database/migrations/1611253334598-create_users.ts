import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1611253334598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name:'profile_pic_path',
                    type:'varchar',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                },   
                {
                    name: 'birthdate',
                    type: 'date',
                }, 
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
