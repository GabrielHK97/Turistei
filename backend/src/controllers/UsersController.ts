import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

// index, show, create, update, delete
export default {

    //List all users
    async index(request: Request, response: Response){
        try {
            const usersRepository = getRepository(User);
            const users = await usersRepository.find();
            if (!users) return response.json({ message:"users not found" });
            return response.json(users);    
        } catch(err) {
            return response.status(400).json({ error:"Fail to list users" });
        }
    },

    //List user by ID
    async show(request: Request, response: Response){
        try {
            const { id } = request.params;
            const usersRepository = getRepository(User);
            const user = await usersRepository.findOne(id);
            if (!user) return response.json({ message:"user not found" });
            return response.json(user);
        } catch(err) {
            return response.status(400).json({ error:"Failed to list user" });
        }
    },

    //Delete user by ID
    async delete(request: Request, response: Response){
        try {
            const { id } = request.params;
            const usersRepository = getRepository(User);
            if (!(await usersRepository.findOne(id))) return response.status(400).json({ message:"user not found" });
                await usersRepository.delete(id);
                return response.json({ message:"user deleted!" });
            
        } catch(err) {
            return response.status(400).json({ error:"Failed to delete user" });
        }
        
    },

    //Updates user info by ID
    async update(request: Request, response: Response){
        try {
            const {
                profile_pic_path,
                name,
                email,
                username,
                password,
                birthdate, 
            } = request.body;
            const { id } = request.params;
            const usersRepository = getRepository(User);      
            if (!(await usersRepository.findOne(id))) return response.status(400).json({ message:"user not found" });
            const user = usersRepository.create({
                profile_pic_path,
                name,
                email,
                username,
                password,
                birthdate,  
            });
            await usersRepository.update(id, user);
            return response.status(201).json(user);
        } catch (err) { 
            return response.status(400).json({ error:"Failed to update user" });
        }
    },

    //Register a user
    async create(request: Request, response: Response){
        const {
            profile_pic_path,
            name,
            email,
            username,
            password,
            birthdate, 
        } = request.body;

        try {
            const usersRepository = getRepository(User);
            if (await usersRepository.findOne({ username })) return response.status(400).json({ message:"username already exists" });
            if (await usersRepository.findOne({ email })) return response.status(400).json({ message:"email already exists" });
            const user = usersRepository.create({
                profile_pic_path,
                name,
                email,
                username,
                password,
                birthdate,  
            });
            await usersRepository.save(user);
            return response.status(201).json(user);
        } catch (err) {
            return response.status(400).json({ error:"Failed to register user" });
        }     
    },

    //Authenticate
    async authenticate(request: Request, response: Response){
        try {
            const {
                login,
                password
            } = request.body;
            const username = login;
            const email = login;
            const usersRepository = getRepository(User);
            const u = async() => {
                if (await usersRepository.findOne({ username })) return await usersRepository.findOne({ username });
                if (await usersRepository.findOne({ email })) return await usersRepository.findOne({ email });
            }
            u().then(async user =>{
                if (!user) response.json({ message:"username/email not found" });
                if (!(await user?.comparePassword(password))) return response.status(400).json({ error:"invalid password" });
                console.log(user);
                return response.json({
                    user,
                    token: user?.generateToken(),
                });
            });          
        }catch(err) {
            return response.status(400).json({ error:"Failed to authenticate user" });
        }
    },

    async me(request: Request, response: Response){
        try {
            const { id } = request.params;
            const usersRepository = getRepository(User);      
            const user = await usersRepository.findOne(id);
            return response.json(user);
        } catch (err) { 
            return response.status(400).json({ error:"Failed to get user information" });
        }
    },

};

//https://blog.rocketseat.com.br/autenticacao-react-native-nodejs/
//https://blog.rocketseat.com.br/fluxo-de-autenticacao-com-react-native/
//https://www.notion.so/Vers-o-2-0-do-Happy-c754db7a4d41469e8c2d00fcf75392c4