import React from 'react'
import { DialogData } from "../../context/DialogContext"
import { Typography, TextField, InputLabel } from '@mui/material'
import { AuthData } from '../../context/AuthContext'
const PreferencesDialog = () => {
    const { modalRef } = React.useContext(DialogData)
    const { currentUser } = React.useContext(AuthData)
    const newVendorRef = React.useRef(null)
    return (
        <>
            <dialog ref={modalRef}
                className='modal'
            >
                <Typography>Update your preferences</Typography>
                <div className='container'>
                    <div className='input-container'>
                        <TextField
                            fullWidth
                            value={currentUser?.email}
                        />
                    </div>
                    <div className='input-container'>
                        <TextField
                            fullWidth
                            value={currentUser?.fullNames}
                        />
                    </div>
                    <div className='input-container'>
                        {
                            currentUser?.role !== 'vendor' && (
                                <button
                                    style={{
                                        background: 'none',
                                        color: 'black'
                                    }}
                                    onClick={() => newVendorRef.current?.showModal()}
                                >become a vendor</button>
                            )
                       }
                    </div>
                </div>
                <button onClick={() => modalRef?.current?.close()}>close</button>
                <button>proceed</button>
            </dialog >
            <dialog ref={newVendorRef} className='modal'>
                <Typography>Register as a vendor</Typography>
                <div className="container">
                    <div className="input-container">
                        <InputLabel
                            htmlFor='organisation_name'
                        >Enter the name of your organisation</InputLabel>
                        <TextField
                            id='organisation_name'
                            fullWidth
                            label='organisation name'
                            name='organisation_name'
                        />
                    </div>
                    <div className="input-container">
                        <InputLabel
                            htmlFor='location'
                        >Where are you located ?</InputLabel>
                        <TextField
                            id='location'
                            fullWidth
                            label='your location'
                            name='location'
                        />
                    </div>
                </div>
                <button onClick={() => newVendorRef?.current?.close()}>close</button>
                <button>proceed</button>
            </dialog>
        </>
    )
}

export default PreferencesDialog