const router = require('express').Router()

router.get('/getTasks')

router.get('/getTaskByState')

router.post('/createTask')

router.put('/updateTask')

router.put('/deleteTask')

module.exports = router