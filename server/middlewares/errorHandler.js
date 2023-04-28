export default function errorHandler(err, req, res, next) {
    if (err) {
        let status = err.statusCode
        let message = err.message
        return res.status(status).json({ status: false, message })
    }
}