export default function errorResponse(error, code) {
    const err = new Error(error)
    err.statusCode = code
    return err
}