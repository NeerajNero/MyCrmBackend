import jwt from 'jsonwebtoken'

export const auth = async(req,res,next) => {
    try{
        const {token} = req.cookies
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json("unauthorized access")
        }
        const {user} = decoded
        req.user = user
        next()
    }catch(error){
        console.log("error occured while authentication", error.message)
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}