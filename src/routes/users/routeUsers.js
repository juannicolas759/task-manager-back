const router = require('express').Router()
const {getUsers, createUsers, getUserById, updateUsers, deleteUser, getUserByState, getUserTasks, getUserTasksByState, getManager} = require('../../controllers/controllerUsers') 

router.get('/getUsers', getUsers)

router.get('/getUserByState', getUserByState)

router.get('/getUserById', getUserById)

router.post('/createUser', createUsers)  

router.put('/updateUser',updateUsers)

router.put('/deleteUser', deleteUser)

router.get('/getUserTasks', getUserTasks)

router.get('/getUserTasksByState', getUserTasksByState)

router.get('/getManager', getManager)

module.exports = router