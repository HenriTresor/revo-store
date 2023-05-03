import React, { useContext, useState } from 'react'
import { DialogData } from '../../context/DialogContext'
import {
    TextField,
    Typography, Grid, Snackbar, Alert, InputLabel
} from '@mui/material'
import { rootLink } from '../../utils/links'
import { AuthData } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const reducer = (state, action) => {
    switch (action.type) {
        case 'IS_SAVING':
            return { ...state, isLoading: true }
        case 'SAVED':
            return { ...state, isLoading: false, error: null, data: action.payload }
        case 'ERROR':
            return { ...state, isLoading: false, error: { status: true, message: action.payload } }
        default:
            return state
    }
}
const NewProductDialog = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthData)
    const [inputValues, setInputValues] = useState({
        title: '',
        description: '',
        stock: '',
        category: '',
        price: '',
        brand: '',
        image: '',

    })
    const [{ isLoading, error, data }, dispatch] = React.useReducer(reducer, {
        isLoading: false,
        error: { status: false, message: null },
        data: null
    })
    const { newProductModalRef } = React.useContext(DialogData)
    const handleChange = (e) => {
        setInputValues(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${rootLink}api/v1/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...inputValues, vendor: currentUser?._id })
            })
            const data = await res.json()
            if (!data.status) return dispatch({ type: 'ERROR', payload: data?.message })

            dispatch({ type: 'SAVED', payload: data.message })
            navigate(`/products/${data?.product?._id}`)
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message })
        }
    }
    return (
        <>
            <dialog
                className='modal'
                ref={newProductModalRef}>
                <Typography>
                    Add new product
                </Typography>
                <div>
                    {
                        data || error?.status && (
                            <Alert severity={data ? 'success' : 'error'}>
                                {data || error?.message}
                            </Alert>
                        )
                    }
                </div>
                <div className="container">
                    <div className="input-container">
                        <TextField
                            fullWidth
                            label='product title'
                            placeholder='title'
                            name='title'
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            fullWidth
                            label='product description'
                            placeholder='this is a multline input field'
                            onChange={(e) => handleChange(e)}
                            name='description'
                            multiline
                        />
                        <InputLabel htmlFor='image'>Upload the image to dropbox or drive or any other hosting platform and get the link</InputLabel>
                        <TextField
                            fullWidth
                            id='image'
                            label='link of the product image'
                            // placeholder='
                            onChange={(e) => handleChange(e)}
                            name='image'
                            multiline
                        />
                        <Grid container spacing={3}>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    label='how many in stock ?'
                                    onChange={(e) => handleChange(e)}
                                    name='stock'
                                    // multiline
                                    placeholder='stock'
                                    type='number'
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    label='what is the price ?'
                                    name='price'
                                    onChange={(e) => handleChange(e)}
                                    // multiline
                                    placeholder='in dollars'
                                    type='number'
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    label='what category does the product belong to ?'
                                    onChange={(e) => handleChange(e)}
                                    name='category'
                                    // multiline
                                    placeholder='category'
                                    type='text'
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    label=' which brand is the product?'
                                    name='brand'
                                    // multiline
                                    onChange={(e) => handleChange(e)}
                                    placeholder='brand'
                                    type='text'
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <button onClick={() => newProductModalRef.current?.close()}>cancel</button>
                    <button onClick={handleSubmit}>confirm</button>
                </div>
            </dialog>
        </>
    )
}

export default NewProductDialog