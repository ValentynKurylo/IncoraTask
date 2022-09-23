const Joi = require("joi")

module.exports = {
    createUser: Joi.object().keys({
        first_name: Joi.string().required().min(2).max(50),
        last_name: Joi.string().required().min(2).max(50),
        email: Joi.string().email(),
        phone: Joi.string().min(9).max(15).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
        password: Joi.string().min(4).max(64).required(),
    })
}