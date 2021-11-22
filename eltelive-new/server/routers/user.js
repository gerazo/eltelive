const express = require('express');
const auth  = require('../middleware/auth')
const controller = require('../controllers/user')
const router = new express.Router()




// GET functions
router.get('/api/get_user', auth, controller.getUser)
router.get('/api/get_users', auth ,controller.getUsers)
router.get('/api/get_key', auth, controller.getStreamKey)

// POST functions
router.post('/api/register',controller.registerUser)
router.post('/api/login', controller.loginUser)


// DELETE functions
router.delete('/api/delete_user',auth,controller.deleteUser)

// PATCH functions
router.patch('/api/change_password', auth,controller.changePassword)

// PUT functions
router.put('/api/generate_key', auth ,controller.generateKey)



router.delete('/api/delete_key',auth, controller.deleteKey)

module.exports = router
