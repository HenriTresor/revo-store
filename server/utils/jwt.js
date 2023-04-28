import jwt from 'jsonwebtoken'


export default async function createToken(id) {
    try {
        return jwt.sign(
            { id: id },
            process.env.ACCESS_SECRET_TOKEN,
            {
                expiresIn: '1w'
            }
        )
    } catch (error) {
        console.log('error creating token', error.message);
    }
}