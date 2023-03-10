const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { encrypt, compare } = require('../utils/handleBcrypt')
const jwt = require('jsonwebtoken')


function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const getUsers = async (req, res) => { 
    try {
        const data = await prisma.users.findMany({
        })        
        if (data[0] === undefined){
            res.status(400).send({
                message: "No se encuentra los datos solicitados"
            })
        }else{
            res.json(data) 
        }
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener los usuarios"
        })
        console.log(error)
    }
}

const getUserById = async (req, res) => { 
    try {
        const data = await prisma.users.findUnique({
            where:{
                user_id: req.body.user_id
            }
        })        
        console.log(data);
        if (data === null){
            res.status(400).send({
                message: "No se encuentra los datos solicitados"
            })
        }else{
            res.json(data) 
        }
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener los usuarios"
        })
        console.log(error)
    }
}

const createUsers = async (req, res) => {
    try {
        const product =await prisma.users.create({
            data:{
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                user_password: await encrypt(req.body.user_password),
                user_state: req.body.user_state,
                manager_id: req.body.manager_id

            }
        })
        
        res.send({
            message: "Usuario creado con éxito"
        });
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió el error al momento de crear el users"
        });
        console.log(error)
    }

}

const getUser = (req, res) => { }

const updateUsers = (req, res) => { }

const deleteUsers = (req, res) => { }

module.exports = { getUsers, createUsers, getUser,getUserById,  updateUsers, deleteUsers }