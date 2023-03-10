const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { encrypt, compare } = require('../utils/handleBcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    try{
        const user =  req.body.email
        const password = req.body.password_account
        const verify = await prisma.accounts.findMany({
            where:{
                EMAIL: user 
            }
        })
        if(verify.length === 0){
            res.json({
                message : "email o contraseña incorrecta"
            })
        }else{
            const validate = await compare(password, verify[0].PASSWORD_ACCOUNT)
            if(validate){
                const person = await prisma.persons.findUnique({
                    where:{
                        ID_PERSON: verify[0].ID_PERSON
                    },
                    include:{
                        user_roles:{
                            include:{
                                roles: true
                            }
                        }, 
                        person_dependencies:{
                            include:{
                                dependencies:true
                            }
                        }
                    }
                })
                const object = [
                    {
                        ID_ACCOUNTS : verify[0].ID_ACCOUNTS,
                        EMAIL : verify[0].EMAIL,
                        PASSWORD_ACCOUNT : verify[0].PASSWORD_ACCOUNT,
                        STATE : verify[0].STATE,
                        ID_PERSON : verify[0].ID_PERSON,
                        NAME_ROL: person.user_roles[0].roles.NAME_ROL,
                        DEPENDECIES:[],
                        ROLES:[]
                        
                    }
                ]
                let arrayAux =[]
                person.person_dependencies.map((dependencie)=>{
                    arrayAux.push({
                        ID_DEPENDECIE:dependencie.dependencies.ID_DEPENDENCIE,
                        DEPENDECIE_NAME:dependencie.dependencies.DEPENDENCIE_NAME,
                        DEPENDECIE_TYPE:dependencie.dependencies.TYPE_DEPENDENCIE
                    })
                })
                object[0].DEPENDECIES = arrayAux
                let arrayAuxRoles =[]
                person.user_roles.map((rol)=>{
                    arrayAuxRoles.push({
                        ID_ROL:rol.roles.ID_ROL,
                        NAME_ROL:rol.roles.NAME_ROL
                    })
                })
                object[0].ROLES = arrayAuxRoles
                console.log(object)
                jwt.sign({object},object[0].NAME_ROL,(error,token)=>{
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

module.exports = {
    loginUser
}
