const router = require('express').Router()
const {getUsers, createUsers, getUserById, updateUsers, deleteUser, getUserByState} = require('../../controllers/controllerUsers') 

router.get('/getUsers', getUsers)

router.get('/getUserByState', getUserByState)

router.get('/getUserById', getUserById)

router.post('/createUser', createUsers)  

router.put('/updateUser',updateUsers)

router.put('/deleteUser', deleteUser)

module.exports = router