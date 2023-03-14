const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../../controllers/controllerTask')

const router = require('express').Router()

router.get('/getTasks', getTasks)

router.get('/getTaskById/:id', getTaskById)

router.post('/createTask', createTask)

router.put('/updateTask', updateTask)

router.delete('/deleteTask/:id', deleteTask)

module.exports = router