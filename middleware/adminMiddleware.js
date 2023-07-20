module.exports = async function auth(req, res, next) {
    try {
        if (req.user.role === true) {
            next();
        } else {
            return res.status(404).json({
                message: "only Admin can do it"
            })
        }
    } catch (error) {
        return res.json({
            message: "Something is wrong"
        })
    }
}