const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(userId) {
    logger.debug(`auth.service - login with user Id: ${userId}`)

    const user = await userService.getById(userId)
    if (!user) return Promise.reject('Invalid user Id')

    // delete user.password
    return user
}

async function signup(username, password, fullname, initials) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) return Promise.reject('fullname, username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, fullname, initials })
}

module.exports = {
    signup,
    login,
}