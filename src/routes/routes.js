const {Router} = require("express")
const router = Router()
const verificationUser = Router()
const jwt = require('jsonwebtoken')
const {loginUser} = require("../controller/controllerAuthentication")


router.post('/login', loginUser)

router.use('/api',require('./users/'))


verificationUser.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if(!token){
        res.sendStatus().send({
            error: 'Es necesario un token de autenticacion'
        })
        return
    }
    const aux = token.split(" ")
    if(aux[0] === 'Bearer'){
        token = aux[1]
    }
    if(token){
        jwt.verify(token, 'Usuario', (error, token) => {
            if(error){
                return res.json({
                    message: 'El token no es valido'
                })
            }else{
                req.token = token
                next()
            }
        })
    }
})