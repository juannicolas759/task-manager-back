const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { encrypt, compare } = require('../utils/handleBcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    try{
        const user =  req.body.email
        const password = req.body.user_password
        const verify = await prisma.users.findMany({
            where:{
                email: user,
                user_password: password,
                user_state: "A"
            }
        })
        if(verify.length === 0){
            res.json({
                message : "email o contraseña incorrecta"
            })
        }else{
            const validate = await compare(password, verify[0].user_password)
            if(validate){
                jwt.sign({verify}, "secretWord",(error,token)=>{
                    console.log(parseJwt(token))
                    res.json({
                        token: token
                    })
                })
            }else{
                res.json({
                    message : "email o contraseña incorrecta"
                })
            }
        }
    }catch (error) {
        if(error.code === undefined){
            res.status(400).send({
                message: "Ocurrió un error al ingresar con el usuario registrado"
            })
        }else{
            res.status(400).send({
                message: "Ocurrió un error al ingresar con el usuario registrado"
            });  
        }
        console.log(error)
    }    
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

module.exports = {
    loginUser
}
