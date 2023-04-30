/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './ProductsByCategory.css'
import { Link, useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { rootLink } from '../../utils/links'
import { Container, Grid, Typography } from '@mui/material'
import ProductCard from '../../components/ProductCard'
import Loading from '../../components/Loading'

const ProductsByCategory = () => {

    const { search } = useLocation()
    const params = new URLSearchParams(search)
    const category = params.get('category')

    const { data, isLoading, error } = useFetch(`${rootLink}/api/v1/products/search?category=${category
        }`)
    const [products, setProducts] = useState([])
    useEffect(() => {
        setProducts(data?.products)
    }, [data])
    return (
        <Container
            className='home-container'
        >
            <Typography
            sx={{mb:4}}
            >
                Products by category: {category}
            </Typography>   
            <Grid container spacing={2}>
                {
                    isLoading && <Loading />
                }
                {
                    error.isError && <h1>an error occured</h1>
                }
                {
                    products?.map(product => {
                        return (
                            <ProductCard {...product} key={ product?._id} />
                        )
                    })
                }
          </Grid>
        </Container>
    )
}

export default ProductsByCategory