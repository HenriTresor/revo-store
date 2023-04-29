import React, { useContext, useEffect, useState } from 'react'
import { AuthData } from '../../context/AuthContext'
import './Home.css'
import {
    Container, Box, Typography, Button,
    Select, MenuItem, InputLabel,
    Slider, Stack, Drawer, Card, Grid,
    Rating
} from '@mui/material'

import {
    ChevronLeft,
    ChevronRight,
    FilterList,
    ShoppingCartRounded,
    ViewCarouselRounded
} from '@mui/icons-material'
import useFetch from '../../hooks/useFetch'
import { rootLink } from '../../utils/links'
import { AppData } from '../../context/AppContext'

const Home = () => {

    const { currentUser, isLoggedIn } = useContext(AuthData)
    const { setCartItemsNumber, setCart, cart } = useContext(AppData)
    // const [isDrawerOpen, setIsDrawerOpen] = useState(true)
    const [products, setProducts] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [priceValues, setPriceValues] = useState({
        min: 3,
        max: 10
    })

    const { data, error, isLoading } = useFetch(`${rootLink}/api/v1/products`)

    useEffect(() => {
        // console.log(data);
        setProducts(data?.products)
    }, [data])
    useEffect(() => {
        setNewProducts(products?.map(product => {
            return { ...product, addedToCart: false }
        }))
    }, [products])

    
    const handlePriceChange = (e, newValue) => {
        setPriceValues({ ...priceValues, [e.target.name]: e.target.value })
    }
    return (
        <Container
            className='home-container'
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start'
                }}
            >
                <Box
                    className='body-top'
                >

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center'
                        }}
                    >
                        <Typography>
                            Price range:
                        </Typography>
                        <Box>
                            <Typography>
                                min: ${priceValues.min}
                            </Typography>
                            <Slider
                                valueLabelDisplay='auto'
                                sx={{
                                    width: '100px'
                                }}
                                onChange={(e) => handlePriceChange(e)}
                                value={priceValues.min}
                                name='min'
                                max={parseInt(priceValues.max)}
                            />
                        </Box>
                        <Box>
                            <Typography>
                                max: ${priceValues.max}
                            </Typography>
                            <Slider
                                valueLabelDisplay='auto'
                                sx={{
                                    width: '100px'
                                }}
                                onChange={(e) => handlePriceChange(e)}
                                value={priceValues.max}
                                max='200000'
                                name='max'
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    // background: 'lightgrey',
                    width: '100%',
                    height: 'auto',
                    float: 'right',
                    // position: 'absolute',
                    right: '0',
                    padding: 1,
                    mt: 20
                }}
            >
                <Grid container spacing={1}>
                    {
                        products?.map(product => {
                            console.log(product);
                            return (
                                <Grid
                                    item
                                    xs={12} sm={6} md={4}
                                    key={product?._id}
                                >
                                    <Card
                                        className='product-card'
                                        sx={{
                                            padding: 1
                                        }}
                                        elevation={4}

                                    >
                                        <img
                                            src={product?.images[0]}
                                        />
                                        <Box

                                        >
                                            <Typography>
                                                {product?.title}
                                            </Typography>
                                            <Typography
                                                variant='body3'
                                                sx={{
                                                    marginBottom: 4
                                                }}
                                            >
                                                {` in stock(${product?.stock})`}
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
                                            <Typography className={product?.discountPercentage !== 0 && 'price-txt'}>
                                                cost: ${product?.price}
                                            </Typography>
                                            <Typography
                                                variant='h6'
                                            >
                                                {
                                                    (product?.price - ((product?.price * product?.discountPercentage) / 100)).toFixed(2)
                                                }$
                                            </Typography>
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
                                                value={product?.rating}
                                            />
                                            <Typography>
                                                {product?.rating}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 2
                                            }}
                                        >
                                            <Button
                                                disabled={product?.addedToCart}
                                                onClick={() => {
                                                    setCartItemsNumber(prev => prev + 1)
                                                    localStorage.setItem('cart', JSON.stringify([...JSON.parse(localStorage.getItem('cart')), { ...product, addedToCart: true }]))
                                                    setCart(prev => [...prev, product])
                                                }}
                                                color='info'
                                                variant='contained'
                                                startIcon={<ShoppingCartRounded />}
                                            >
                                                add to cart
                                            </Button>
                                            <Button
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
                        })
                    }

                </Grid>
            </Box>
        </Container>
    )
}

export default Home