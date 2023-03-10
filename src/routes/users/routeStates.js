const router = require('express').Router()

router.get('/getStates')

router.get('/getActiveStates')

router.post('/createState')

router.put('/updateState')

router.put('/deleteState')

module.exports = router