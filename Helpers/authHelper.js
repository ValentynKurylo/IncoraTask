const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const {config} = require("dotenv");

const verifyPromise = promisify(jwt.verify)

module.exports = {
    generateTokenPair: ()=>{
        const accessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET , {expiresIn: '15m'})
        const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET , {expiresIn: '30d'})

        return{
            accessToken,
            refreshToken
        }
    },

}