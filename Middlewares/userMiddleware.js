const db = require('../DataBases/dataBase')
const userValidator = require('../Validations/userValidation')

module.exports = {
    checkUserMiddleware: (req, res, next) => {
        try {
            const {error} = userValidator.createUser.validate(req.body)
            if (error) {
                throw new Error(error.details[0].message)
            }
            next()
        } catch (e) {
            next(e)
        }
    },

    checkIsEmailExist: async (req, res, next) => {
        try {
            let b = await db.query(`SELECT * from user
                                      WHERE user.email = "${req.body.email}"`)

            if (b[0][0]) {
                throw new Error('User with this email is already exist')
            }
            next()
        } catch (e) {
            next(e)
        }
    }

}