const authService 	        = require('../services/auth.service');

exports.login = async (req, res) => {
    console.log(req.tokenData);
    console.log('req.tokenData');
    let token = await authService.generateToken({
        idUser: 1
    });
    return res.status(200).json({status: "true", token: token});
}