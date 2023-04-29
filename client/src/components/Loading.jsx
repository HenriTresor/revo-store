import {
    Box,
    CircularProgress
} from '@mui/material'

export default function Loading() {
    return (
        <Box
            sx={{
            position:'absolute',
            width:'100%',
            height:'100%',
            display:'grid',
            placeItems:'center'
        }}
        >
        <CircularProgress  
        color='inherit'
        />
        </Box>
    )
}