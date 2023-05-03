import React, { useState } from 'react'
export const DialogData = React.createContext(null)


const DialogContext = ({ children }) => {
    const modalRef = React.useRef(null)
    const newProductModalRef = React.useRef()
    const values = {
      newProductModalRef,
        modalRef
  }
    return (
        <DialogData.Provider value={values}>{children}</DialogData.Provider>
    )
}

export default DialogContext