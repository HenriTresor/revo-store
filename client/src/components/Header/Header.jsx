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

const Header = () => {
    const { currentUser, isLoggedIn } = useContext(AuthData)
    const { cartItemsNumber } = useContext(AppData)
    return (
        <div
            className='header'
        >
            <div>
                <Typography
                    variant='h5'
                >
                    Brand
                </Typography>
            </div>
            <div>
                <div className='srch-div'>
                    <input
                        type="text"
                        placeholder='search...'
                    />
                    <Button
                        sx={{
                        outline:'none'
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
                    <li>
                        <HomeRounded />
                    </li>

                    <li>
                        <CategoryRounded />
                    </li>

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

                    {
                        isLoggedIn ? (
                            <Button
                                color='inherit'
                            >
                                profile
                            </Button>
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