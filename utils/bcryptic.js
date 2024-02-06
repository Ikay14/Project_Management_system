const bcryptic = require('bcrypt')

const hashPassword = async (plaintextPassword) => {
    const saltRounds = 10
    return bcryptic.hash(plaintextPassword, saltRounds)
}

const comparePassword = async (userEnteredPassword, hashPasswordFromDatabase) => {
    return bcryptic.compare(userEnteredPassword, hashPasswordFromDatabase)
}

module.exports = {
    comparePassword,
    hashPassword
}

