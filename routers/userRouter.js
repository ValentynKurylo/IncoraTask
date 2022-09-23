const router = require('express').Router()

const userController = require('../Controllers/userController')

const userMiddleware = require('../Middlewares/userMiddleware')
const authMiddleware = require('../Middlewares/authMiddleware')

router.get('/', userController.getUsers)

router.post('/', userMiddleware.checkUserMiddleware, userMiddleware.checkIsEmailExist, userController.createUser)

router.post('/auth/', userController.auth)

router.get('/:id', userController.getUserById)

router.put('/:id', authMiddleware.checkAccessToken, userMiddleware.checkUserMiddleware, userController.putUserById)

module.exports = router