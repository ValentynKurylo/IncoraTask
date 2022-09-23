const db = require('../DataBases/dataBase');

const passwordHelper = require('../Helpers/passwordHelper')
const authHelper = require('../Helpers/authHelper')

module.exports = {

    getUsers: async (req, res)=>{
        const users = await db.query(`SELECT * from user`)
        res.json(users[0])
    },

    createUser: async(req, res)=>{
        try {
            let body = req.body
            let password = await passwordHelper.hash(body.password)
            const data = await db.query(`INSERT into user(first_name, last_name, email, phone, password)
                                         values ("${body.first_name}", "${body.last_name}", "${body.email}",
                                                 "${body.phone}", "${password}")`)
            res.json("User was added")
        }catch (e){
            console.log(e)
        }
    },

    auth: async (req, res)=>{
        let data = req.body
        let user = await db.query(`SELECT *
                                               FROM user
                                               WHERE user.email = "${data.email}"`)
        if(!user[0][0]){
            res.json("Wrong email or password")
            throw new Error("Wrong email or password")
        }
        await passwordHelper.compare(user[0][0].password, data.password)
        let tokenPair = authHelper.generateTokenPair()
        res.json(tokenPair)
    },

    getUserById: async(req, res)=>{
        let id = req.params.id
        let user = await db.query(`SELECT * from user WHERE user.id = "${id}"`)
        res.json(user[0][0])
    },

    putUserById: async (req, res)=>{
        let id = req.params.id
        let body = req.body
        let password = passwordHelper.hash(body.password)
        let data = await db.query(`UPDATE user SET user.first_name = "${body.first_name}", user.last_name = "${body.last_name}", user.email = "${body.email}", user.phone = "${body.phone}", user.password = "${password}" WHERE user.id = "${id}"`)
        res.json("User was updated")
    }

}