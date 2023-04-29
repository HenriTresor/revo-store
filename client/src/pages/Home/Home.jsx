import React, { useContext, useEffect, useState } from 'react'
import { AuthData } from '../../context/AuthContext'
import './Home.css'
import {
    Container, Box, Typography, Button,
    Select, MenuItem, InputLabel,
    Slider, Stack, Drawer, Card, Grid
} from '@mui/material'

import {
    ChevronLeft,
    ChevronRight,
    FilterList
} from '@mui/icons-material'
import useFetch from '../../hooks/useFetch'
import { rootLink } from '../../utils/links'

const Home = () => {
    const { currentUser, isLoggedIn } = useContext(AuthData)
    // const [isDrawerOpen, setIsDrawerOpen] = useState(true)
    const [products, setProducts] = useState([])
    const [priceValues, setPriceValues] = useState({
        min: 3,
        max: 10
    })

    const { data, error, isLoading } = useFetch(`${rootLink}/api/v1/products`)

    useEffect(() => {
        // console.log(data);
        setProducts(data?.products)
    },[data])
    const handlePriceChange = (e) => {
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
                <Drawer
                    variant='persistent'
                    open
                    // open={isDrawerOpen}
                    sx={{
                        height: '100%',
                        zIndex: '-1',
                        width: '100%',


                    }}
                >
                    f
                    <Box
                        sx={{
                            p: 1,
                            mt: 14
                            // width:"100%"
                        }}
                    >

                        <Box>
                            <Typography
                                sx={{ display: 'flex', gap: 3, mb: 5 }}
                            >
                                <FilterList />
                                Filters
                            </Typography>

                        </Box>
                        <Box>
                            <Typography>
                                Price range
                            </Typography>
                            <Typography>
                                ${priceValues?.min} -  ${priceValues?.max}
                            </Typography>
                            <Stack direction={'row'}
                                sx={{
                                    display: 'flex',
                                    gap: 3, padding: 0, height: '100px'
                                }}
                            >
                                <Slider
                                    orientation='vertical'
                                    name='min'
                                    size='small'

                                    max={priceValues?.max}
                                    onChange={(e) => handlePriceChange(e)}
                                    value={priceValues?.min}
                                    valueLabelDisplay='auto'
                                ></Slider>
                                <Slider
                                    orientation='vertical'
                                    name='max'
                                    size='small'
                                    // min={priceValues.min}
                                    value={priceValues?.max}
                                    max='100000'
                                    onChange={(e) => handlePriceChange(e)}
                                    valueLabelDisplay='auto'
                                >

                                </Slider>
                            </Stack>
                        </Box>
                    </Box>
                </Drawer>
               
            </Box>
            <Box
                sx={{
                    // background: 'lightgrey',
                    width: '80%',
                    height: 'auto',
                    float: 'right',
                    position: 'absolute',
                    right: '0',
                    padding:1
                }}
            >
                <Grid container spacing={1}>
                     {
                    products?.map(product => {
                        return (
                            <Grid
                                item
                                sm={4}
                                key={product?._id}
                            >
                                <Card
                                    className='product-card'
                                    sx={{
                                        padding:1
                                    }}
                                    variant='outlined'
                                    
                                >
                                    <img
                                    src={product?.images[0]}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 1,
                                            mb:4
                                    }}
                                    >
                                        <Typography>
                                            {product?.title}
                                        </Typography>
                                        <Typography
                                        variant='body3'
                                        >
                                            {` in stock(${product?.stock})`}
                                        </Typography>
                                   </Box>
                                    <Typography>
                                        {product?.description?.slice(0,20)} ...
                                    </Typography>
                                    <Box
                                        sx={{
                                        display:'flex'
                                    }}
                                    >
                                        <Typography>
                                            cost: ${product?.price}
                                        </Typography>
                                        <Typography>
                                            discount {product?.discountPercentage}%
                                        </Typography>
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