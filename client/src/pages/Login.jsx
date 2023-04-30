import React, { useEffect, useState } from 'react'

import {
  Box, Container,
  Typography, Button,
  TextField, InputLabel,
  Switch,
  Grid,
  Snackbar, Alert
} from "@mui/material"
import { Link } from 'react-router-dom'
import {
  Google,
  Facebook
} from '@mui/icons-material'
import { rootLink } from '../utils/links'
// import { useState } from "react"

const Login = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState(null)
  const handleChange = (e) => {
    setInputValues(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    console.log(inputValues);
  }, [inputValues])
  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`${rootLink}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...inputValues })
      })

      const data = await res.json()
      if (!data.status) {
        setIsError(true)
        setSnackBarMsg(data.message)
        setIsLoading(false)
        return
      }
      localStorage.setItem('token', data?.token)
      location.assign('/')
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      setSnackBarMsg(error.message)
    }
  }
  return (
    <Container
      sx={{
        display: 'grid',
        placeContent: 'center',
        minHeight: '100dvh'
      }}
    >

      <Snackbar
        sx={{ width: '100%' }}
        open={snackBarMsg}
        message={snackBarMsg}
        autoHideDuration={6000}
        onClose={() => setSnackBarMsg(null)}
      >
        <Alert sx={{ width: '50%' }} severity={isError && 'error'}>
          <Typography>
            {snackBarMsg}
          </Typography>

        </Alert>
      </Snackbar>
      <Box
        sx={{
          padding: 1,
          background: 'white',
          width: '65dvw',
          boxShadow: '0px 0px 30px rgb(0,0,0,0.2)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant="h5"
            component="h1"
          >
           Sign in
          </Typography
          >
          <Box>
            <Button
              disabled
            >
              <Google />
            </Button>
            <Button
              disabled
            >
              <Facebook />

            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 0,
            padding: 3
          }}
        >
              <Box
                sx={{ mt: 3 }}
              >
                <InputLabel
                  htmlFor="email"
                >
                  Input your email
                </InputLabel>
                <TextField
                  fullWidth
                  sx={{ mt: 2 }}
                  label="email"
                  name="email"
                  value={inputValues.email}
                  id="email"
                  variant="filled"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </Box>


          <Box
            sx={{ mt: 3 }}
          >
            <InputLabel
              htmlFor="password"
            >
              input your password
            </InputLabel>
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              onChange={(e) => handleChange(e)}
              label="password"
              value={inputValues.password}
              name="password"
              id="password"
              type='password'
              required
            />
          </Box>
          <Box
            sx={{
              mt: 3, display: 'flex',
              alignItems: 'center', gap: 1, justifyContent: 'space-between'
            }}
          >
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              color='primary'
              variant='contained'
            >
              sign in
            </Button>
            <Typography>
             Don&apos;t have an account yet ? <Link to='/signup'>Create one</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Login