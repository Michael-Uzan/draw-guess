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

module.exports = {
    login,
}