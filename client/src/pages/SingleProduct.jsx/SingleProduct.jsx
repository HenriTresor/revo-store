/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import './SingleProduct.css'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { rootLink } from '../../utils/links'
import Loading from '../../components/Loading'
import {

} from '@mui/icons-material'
import { AppData } from '../../context/AppContext'
import {
    Card, Button, Typography, Grid, Box, Rating
} from '@mui/material'
import {

    ShoppingCartRounded,
    ViewCarouselRounded
} from '@mui/icons-material'
import ProductCard from '../../components/ProductCard'
import { AuthData } from '../../context/AuthContext'

const SingleProduct = () => {
    const { setCartItemsNumber, setCart, cart } = useContext(AppData)
    const { isLoggedIn } = useContext(AuthData)
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [similarProducts, setSimilarProducts] = useState([])
    const { data, isLoading, error } = useFetch(`${rootLink}api/v1/products/${id}`)
    console.log(data);
    useEffect(() => {
        setProduct(data?.product)
    }, [data])
    const { data: second_data } = useFetch(`${rootLink}api/v1/products/search?category=${product?.category}`)

    useEffect(() => {
        console.log(second_data);
        setSimilarProducts(second_data?.products)
    }, [second_data])


    return (
        <div
            style={{ display: 'grid', placeContent: 'center' }}
            className='home-container'
        >

            {
                !isLoading && !error.isError && product ? (
                    <Grid
                        container
                        spacing={2}
                        sx={{mt:6}}
                    >
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                variant='outlined'
                                sx={{ p: 4 }}
                            >

                                <Grid container spacing={2}>
                                    <Grid item sm={12}>
                                        <img src={product && product?.image} />

                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                variant='outlined'
                                sx={{ p: 4, mt: 0 }}
                            >
                                <Typography
                                    variant='h5'
                                >
                                    {product?.title}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    sx={{ p: 1 }}
                                >
                                    category: {product?.category}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    {product && product?.description}
                                </Typography>
                                <Typography
                                    variant='body3'
                                    sx={{
                                        marginBottom: 4
                                    }}
                                >
                                    {` in stock(${product?.stock})`}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        mt: 2,
                                        mb: 2,
                                        gap: 2
                                    }}
                                >
                                    <Typography className={product?.discountPercentage  && 'price-txt'}>
                                        cost: ${product?.price}
                                    </Typography>
                                    {
                                        product?.discountPercentage && (
                                            <Typography
                                                variant='h6'
                                            >
                                                {
                                                    (product?.price - ((product?.price * product?.discountPercentage) / 100)).toFixed(2)
                                                }$
                                            </Typography>
                                        )
                                   }
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        mb: 2
                                    }}
                                >
                                    {
                                        product && (<Rating
                                            aria-readonly

                                            precision={0.5}
                                            value={product?.rating?.rate}
                                        />)
                                    }
                                    <Typography>
                                        {product?.rating?.rate}
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
                                        disabled={cart?.find(cartItem => cartItem?._id === product?._id) || !isLoggedIn}
                                        onClick={() => {
                                            setCartItemsNumber(prev => prev + 1)
                                            localStorage.setItem('cart', JSON.stringify([...JSON.parse(localStorage.getItem('cart')), { ...product, addedToCart: true, no: 1 }]))
                                            setCart(prev => [...prev, { ...product, addedToCart: true, no: 1 }])

                                        }}
                                        color='info'
                                        variant='contained'
                                        startIcon={<ShoppingCartRounded />}
                                    >
                                        {cart?.find(cartItem => cartItem?._id === product?._id) ? 'added to cart' : ' add to cart'}
                                    </Button>

                                </Box>
                            </Card>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography
                                variant="h5"
                                sx={{ mb: 4, mt: 4 }}
                            >
                                Similar products
                            </Typography>
                            <Grid container spacing={2}>
                                {

                                    similarProducts?.map(similarProduct => {
                                        if (similarProduct?._id === product?._id) return null
                                        return (
                                            <ProductCard {...similarProduct} key={similarProduct?._id} />
                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                ) : error.isError ? (
                    <h1>error occured</h1>
                ) : (
                    <Loading />
                )
            }

        </div>
    )
}

export default SingleProduct