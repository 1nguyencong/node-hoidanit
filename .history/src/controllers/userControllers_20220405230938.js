import userService from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'missing '
        })
    }

    let userData = await userService.handUserleLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'missing required',
            users: []
        })
    }
    let users = await userService.getAllUsers(id)
    console.log(users)
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message)
    return res.status(200).json(message)

}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'thieu tham so id'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    console.log(message)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {

}



module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,

}