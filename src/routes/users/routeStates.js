const router = require('express').Router()

router.get('/getStates')

router.get('/getActiveStates')

router.post('/createState')

router.put('/updateState')

router.patch('/deleteState')

module.exports = router