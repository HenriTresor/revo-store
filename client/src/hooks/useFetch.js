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
            setIsLoading(false)
            setData(res.data)
            setError({ isError: false, errMsg: "" })
        }).catch((err) => {
            setIsLoading(false)
            setError({ isError: true, errMsg: err.message })
        })
    }, [url, token])
    return {
        data,
        isLoading,
        error
    }
}

export default useFetch