/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './UserCart.css'
import { AppData } from '../../context/AppContext'
import { Container, Paper, Grid, Box, Typography, Card, Button } from '@mui/material'
import {
    Add, RemoveCircle
} from '@mui/icons-material'

const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems?.forEach(item => {
        totalPrice = (totalPrice + item?.price)
    })

    return totalPrice
}
const calculalateTotalNumber = (cartItems) => {
    let totalNumber = 0;
    cartItems?.forEach(item => {
        totalNumber = (totalNumber + item?.no)
    })

    return totalNumber
}



const UserCart = () => {
    let { cart, setCart } = useContext(AppData)
    let totalPrice = calculateTotalPrice(cart)
    let totalNumber = calculalateTotalNumber(cart)

    const handleAddItem = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item._id === itemId) {
                return { ...item, no: item.no + 1 }
            } else {
                return item
            }
        })
        setCart(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const handleRemoveItem = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item._id === itemId) {
                return { ...item, no: item.no - 1 }
            } else {
                return item
            }
        }).filter(item => item.no > 0)
        setCart(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    return (
        <Container
            sx={{ mt: 12 }}
            className='home-container'
        >
            <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                    {
                        cart?.map(item => {
                            console.log(item);
                            return (
                                <Paper
                                    elevation={3}
                                    sx={{
                                        mb: 2, p: 2,
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: 'space-between'
                                    }}
                                    key={item?._id}>
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <img

                                            src={item.images && item?.images[0]}
                                        />


                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'start', justifyContent: 'end',
                                                // background:'grey'
                                            }}
                                        >
                                            <Typography sx={{ p: 1 }}>
                                                {item?.title}
                                            </Typography>
                                            <Typography variant='body2'>
                                                ${item?.price}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                                    >
                                        <Button
                                            onClick={() => {
                                                handleAddItem(item._id)
                                            }}
                                        >
                                            <Add />
                                        </Button>
                                        <Typography>
                                            {item?.no}
                                        </Typography>
                                        <Button
                                            onClick={() => {
                                                handleRemoveItem(item._id)
                                            }}
                                        >
                                            <RemoveCircle />
                                        </Button>
                                    </Box>
                                </Paper>
                            )
                        })
                    }
                </Grid>
                <Grid
                    item sm={12}
                    md={4}
                >
                    <Card variant='outlined' sx={{ p: 1 }}>
                        <Typography>
                            Total: ${totalNumber ? totalPrice * totalNumber : totalPrice}
                        </Typography>
                        <Box
                            sx={{ display: 'flex', gap: 2 }}
                        >
                            <Button variant='contained' color='info'>
                                Proceed to checkout
                            </Button>
                            <Button
                                onClick={() => {
                                    localStorage.setItem('cart', JSON.stringify([]))
                                    setCart([])
                                }}
                                variant='outlined' color='warning'>
                                empty cart
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container >
    )
}

export default UserCart