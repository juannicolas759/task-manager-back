const { getStates, getActiveStates, createState, updateState, deleteState, getStateById } = require('../../controllers/controllerStates')

const router = require('express').Router()

router.get('/getStates', getStates)

router.get('/getActiveStates', getActiveStates)

router.get('/getStatesById', getStateById)

router.post('/createState', createState)

router.put('/updateState', updateState)

router.patch('/deleteState', deleteState)

module.exports = router