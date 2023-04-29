import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url, token) => {

    const [data, setData] = useState(null)
    const [error, setError] = useState({
        isError: false,
        errMsg: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token ? token : null}`
            }
        }).then((res) => {
            setData(res.data)
        }).catch((err) => {
            setError({ isError: true, errMsg: err.message })
        })
    }, [url])
    return {
        data,
        isLoading,
        error
    }
}

export default useFetch