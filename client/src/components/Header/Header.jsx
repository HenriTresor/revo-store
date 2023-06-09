import React, { useContext } from 'react'
import {
    HomeRounded,
    ShoppingCartRounded,
    CategoryRounded,
    Search
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {
    Box, List,
    Stack, Avatar,
    Typography, Button,
    ListItem, ListItemAvatar, ListItemButton,
    ListItemText, Badge
} from '@mui/material'
import { AuthData } from '../../context/AuthContext'
import './Header.css'
import { AppData } from '../../context/AppContext'
import { DialogData } from '../../context/DialogContext'

const Header = () => {
    const { modalRef, newProductModalRef } = useContext(DialogData)
    const { currentUser, isLoggedIn, setIsLoggedIn, setCurrentUser } = useContext(AuthData)
    const { cartItemsNumber } = useContext(AppData)
    return (
        <div
            className='header'
        >
            <div>
                <Link to='/'>
                    <Typography
                        variant='h5'
                    >
                        REVO
                    </Typography>
                </Link>
            </div>
            <div>
                <div className='srch-div'>
                    <input
                        type="text"
                        placeholder='search...'
                    />
                    <Button
                        sx={{
                            outline: 'none'
                        }}
                    >
                        <Search />
                    </Button>
                </div>
            </div>
            <div>
                <Stack
                    direction='row'
                    spacing={2}
                >
                    <Link to='/'>
                        <li>
                            <HomeRounded />
                        </li>
                    </Link>

                    <li id='category-li'>
                        <CategoryRounded />
                        <div className="dropdown">
                            <Link to='/products/category/?category=electronics'>
                                <li>electronics</li>
                            </Link>
                            <Link to='/products/category/?category=jewelery'>
                                <li>jewelery</li>
                            </Link>
                            <Link to={`/products/category/?category=men's clothing`}>
                                <li>Men&apos; clothing</li>
                            </Link>
                            <Link to={`/products/category/?category=women's clothing`}>
                                <li>Women&apos;clothing</li>
                            </Link>

                        </div>
                    </li>

                    {
                        isLoggedIn && (
                            <Link to='/my-cart'>
                                <li>
                                    <Badge
                                        // value={3}
                                        badgeContent={cartItemsNumber}
                                        showZero
                                        color='primary'
                                    >
                                        <ShoppingCartRounded />
                                    </Badge>
                                </li>
                            </Link>
                        )
                    }

                    {
                        isLoggedIn ? (
                            <Box className='button-box'>

                                <Button
                                    color='inherit'
                                >
                                    {currentUser?.fullNames?.split(' ')[0]}
                                </Button>
                                <div
                                    className='dropdown'
                                >
                                    {
                                        currentUser?.role === 'vendor' && (
                                            <li
                                            onClick={()=>newProductModalRef.current?.showModal()}
                                            >Add new product</li>
                                        )
                                   }
                                    <li
                                        onClick={() => modalRef.current.showModal()}
                                    >Update your preferences</li>
                                    <li
                                        onClick={() => {
                                            localStorage.clear('token')
                                            setCurrentUser(null)
                                            setIsLoggedIn(false)
                                        }}
                                        style={{ border: '1px solid red', color: 'red' }}>Logout</li>
                                </div>
                            </Box>
                        ) : (
                            <Link to='/login'>
                                <Button>
                                    Login
                                </Button>
                            </Link>
                        )
                    }

                </Stack>
            </div>
        </div>
    )
}

export default Header