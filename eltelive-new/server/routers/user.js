const express = require('express');

const auth  = require('../middleware/auth')
const {getUsers,getUser,getStreamKey, registerUser,loginUser,deleteUser,changePassword,generateKey,deleteKey} = require('../controllers/user')

const router = new express.Router()




// GET functions
router.get('/api/get_user', auth, getUser)
router.get('/api/get_users', auth ,getUsers)
router.get('/api/get_key', auth, getStreamKey)

// POST functions
router.post('/api/register',registerUser)
router.post('/api/login', loginUser)


// DELETE functions
router.delete('/api/delete_user',auth,deleteUser)

// PATCH functions
router.patch('/api/change_password', auth,changePassword)

// PUT functions
router.put('/api/generate_key', auth , generateKey)



router.delete('/api/delete_key',auth, deleteKey)

module.exports = router
