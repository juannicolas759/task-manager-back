const router = require('express').Router()
const {getUsers, createUsers, getUserById} = require('../../controllers/controllerUsers') 

router.get('/getUsers', getUsers)

router.get('/getUserByState', )

router.get('/getUserById', getUserById)

router.post('/createUser', createUsers)  

router.put('/updateUser')

router.put('/deleteUser')

module.exports = router