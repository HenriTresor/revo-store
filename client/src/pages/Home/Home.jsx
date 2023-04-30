/* eslint-disable no-unused-vars */
import  { useContext, useEffect, useState } from 'react'
import { AuthData } from '../../context/AuthContext'
import './Home.css'
import {
    Container, Box, Typography,
    Slider, Grid,
} from '@mui/material'

import {
   
} from '@mui/icons-material'
import useFetch from '../../hooks/useFetch'
import { rootLink } from '../../utils/links'
import { AppData } from '../../context/AppContext'
import ProductCard from '../../components/ProductCard'
import Loading from '../../components/Loading'

const Home = () => {

    // const { currentUser, isLoggedIn } = useContext(AuthData)
    // const { setCartItemsNumber, setCart, cart } = useContext(AppData)
    // const [isDrawerOpen, setIsDrawerOpen] = useState(true)
    const [products, setProducts] = useState([])
    // const [newProducts, setNewProducts] = useState([])
    const [priceValues, setPriceValues] = useState({
        min: 3,
        max: 10
    })

    const { data, error, isLoading } = useFetch(`${rootLink}/api/v1/products`)

    useEffect(() => {
        // console.log(data);
        setProducts(data?.products)
    }, [data])
    // useEffect(() => {
    //     setNewProducts(products?.map(product => {
    //         return { ...product, addedToCart: false }
    //     }))
    // }, [products])

    
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
                        isLoading ? (
                        <Loading />
                        ) : (
                        products?.map(product => {
                            // console.log(product);
                            return (
                              <ProductCard {...product} key={product?._id}/>
                            )
                        })
                        )
                    }

                </Grid>
            </Box>
        </Container>
    )
}

export default Home