const jwt = require ('jsonwebtoken')
const User = require('../model/user')



const auth = async (req,res,next)=>{



    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(!token || typeof token !== 'string') {
            return res.status(401).json({ status: 'error', title: 'JWT Token not provided' })
        }
        const user_data = jwt.verify(token, process.env.JWT_SECRET)
        const email = user_data.email
        const user = await User.findOne({ email: email }).lean()
        if (!user) {
            return res.status(404).json({ status: 'error', title: 'User with this token does not exist' })
        }
        req.token = token
        req.user = user
        next()

    }catch(e){

        res.status(400).json({ status: 'error', title: 'Unexpected error' })
    }

}


module.exports  = auth
