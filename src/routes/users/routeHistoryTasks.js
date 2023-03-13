const { getLastPositionTask, assignHistoryTask, getHisTasksByUser, registerHistoryTask, getHistoryTasks } = require('../../controllers/controllerHistoryTasks')

const router = require('express').Router()

router.get('/getHistoryTasks', getHistoryTasks)

router.post('/registerHistoryTask', registerHistoryTask)

router.post('/assignHistoryTask', assignHistoryTask)

router.get('/getHisTasksByUser', getHisTasksByUser)

router.get('/getLastPositionTask', getLastPositionTask)


module.exports = router