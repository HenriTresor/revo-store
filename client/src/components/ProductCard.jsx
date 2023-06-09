import { useContext } from 'react'
import { AppData } from '../context/AppContext'
import {

    ShoppingCartRounded,
    ViewCarouselRounded
} from '@mui/icons-material'
import {
    Box, Typography, Button,
    Card, Grid,
    Rating
} from '@mui/material'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { AuthData } from '../context/AuthContext'

const ProductCard = (props) => {

    const navigate = useNavigate()
    const { setCartItemsNumber, setCart, cart } = useContext(AppData)
    const { isLoggedIn, currentUser } = useContext(AuthData)
    console.log(props);


    return (
        <Grid
            item
            xs={12} sm={6} md={4}
            key={props?._id}
        >
            <Card
                className='product-card'
                sx={{
                    padding: 1
                }}
                elevation={4}

            >
                <img
                    src={props?.images[3] || props?.image}
                />
                <Box

                >
                    <Typography>
                        {props?.title}
                    </Typography>
                    <Typography
                        variant='body3'
                        sx={{
                            marginBottom: 4
                        }}
                    >
                        {` in stock(${props?.stock})`}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        mt: 2,
                        mb: 2,
                        gap: 2
                    }}
                >
                    <Typography className={props?.discountPercentage && 'price-txt'}>
                        cost: ${props?.price}
                    </Typography>
                    {
                        props?.discountPercentage && (
                            <Typography
                                variant='h6'
                            >
                                {
                                    (props?.price - ((props?.price * props?.discountPercentage) / 100)).toFixed(2)
                                }$
                            </Typography>
                        )
                    }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 4
                    }}
                >
                    <Rating
                        aria-readonly
                        readOnly
                        precision={0.5}
                        value={props?.rating?.rate || props?.rating}
                    />
                    <Typography>
                        {props?.rating?.rate || props?.rating}
                    </Typography>
                </Box>
                {
                    !isLoggedIn && (
                        <Box
                            sx={{ p: 1 }}
                        >
                            <Typography
                                color='error'
                            >You need to login to add to cart!</Typography>
                        </Box>
                    )
                }
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2
                    }}
                >

                    <Button
                        disabled={cart?.find(cartItem => cartItem?._id === props?._id) || !isLoggedIn || currentUser?._id === props.vendor?._id}
                        onClick={() => {
                            setCartItemsNumber(prev => prev + 1)
                            localStorage.setItem('cart', JSON.stringify([...JSON.parse(localStorage.getItem('cart')), { ...props, addedToCart: true, no: 1 }]))
                            setCart(prev => [...prev, { ...props, addedToCart: true, no: 1 }])
                            // handleAddItem(props?._id)
                        }}
                        color='info'
                        variant='contained'
                        startIcon={<ShoppingCartRounded />}
                    >
                        {cart?.find(cartItem => cartItem?._id === props?._id) ? 'added to cart' : ' add to cart'}
                    </Button>
                    <Button

                        onClick={() => {
                            scrollTo(0, 0)
                            navigate(`/products/${props._id}`)
                        }}
                        variant='outlined'
                        color='primary'
                        startIcon={<ViewCarouselRounded />}
                    >
                        view
                    </Button>
                </Box>
            </Card>
        </Grid>
    )
}

ProductCard.propTypes = {
    _id: propTypes.string,
    rating: propTypes.number,
    stock: propTypes.number,
    price: propTypes.number,
    discountPercentage: propTypes.number,
    title: propTypes.string,
    images: propTypes.array,
    image: propTypes.string
}

export default ProductCard