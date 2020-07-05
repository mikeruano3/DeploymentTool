const authService 	        = require('../../services/auth.service');
require('dotenv').config();

/***
 * TODO: Cambiar a base de datos  
 */
exports.signin = async (req, res) => {
    const idUser = 1
    const username = process.env.ROOTUSER
    const password = process.env.ROOTPASS
    if(req.body.username == username && req.body.password == password){
        let token = await authService.generateToken({
            idUser: idUser
        });
        return res.status(200).json(
            {status: "true", message: "OK", data: {
                accessToken: token,
                idUser: idUser,
                username: username,
                roles: []
            }}
        );
    }
    return res.status(200).json({status: "false", message: "Invalid username or passwod", data: ""});
}