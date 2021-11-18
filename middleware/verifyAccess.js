const jwt = require('jsonwebtoken')


function verifyToken(req,res,next) {

    const token = req.cookies.token || '' 

    console.log(token)

    if (!token) {
        return res.redirect('/login')
    }
    // Validar el token 
    else {

    }

}

module.exports = verifyToken