import React from 'react'
import './Dialog.css'
import PreferencesDialog from "./PreferencesDialog"
import { DialogData } from "../../context/DialogContext"
import NewProductDialog from './NewProductDialog'
const DialogContainer = () => {
  return (
    <>
      <PreferencesDialog />
      <NewProductDialog />
    </>
  )
}

export default DialogContainer