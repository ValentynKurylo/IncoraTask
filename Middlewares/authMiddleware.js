module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get('Authorization')
            if (!token) {
                throw new Error(401, 'No token')
            }
            next()
        } catch (e) {
            next(e)
        }
    }
}