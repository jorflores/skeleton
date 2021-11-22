const jwt = require('jsonwebtoken')


function verifyToken(req,res,next) {

    const token = req.cookies.token || '' 

    console.log(token)

    if (!token) {
        return res.redirect('/login')
    }
    // Validar el token 
    else {

        jwt.verify(token, process.env.SECRET, function(err, data){

            if (err){
                console.log(err)
                return res.redirect('/login')
            }
            else {
            
                req.userId = data.id
                console.log(data)
                next()
            }

        })

    }

}

module.exports = verifyToken