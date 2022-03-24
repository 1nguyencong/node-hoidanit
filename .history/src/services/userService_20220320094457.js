import db from "../models/index"
import bcrypt from 'bcryptjs';


let handUserleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    where: {email: email}
                })
                if (user) {                
                let check = await bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0,
                    userData.errMessage = 'ok',
                    userData.user = user;
                } else {
                    userData.errCode = 3,
                    userData.errMessage = 'ok',
                }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }
                resolve()
            } else {
                userData.errCode = 1;
                userData.errMessage = `your's Email isn't exist in your system`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)   
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handUserleLogin: handUserleLogin,
}