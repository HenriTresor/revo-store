import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import Loading from './components/Loading.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AuthData } from './context/AuthContext.jsx'
import Header from './components/Header/Header.jsx'
import UserCart from './pages/UserCart/UserCart.jsx'
import ProductsByCategory from './pages/ProductsByCategory/ProductsByCategory.jsx'
import DialogContext from './context/DialogContext.jsx'
import DialogContainer from './components/Dialogs/DialogContainer.jsx'
// import PreferencesDialog from './components/Dialogs/PreferencesDialog/PreferencesDialog.jsx'
const Profile = lazy(() => import('./pages/Profile'))
const VendorDashboard = lazy(() => import('./pages/VendorDashboard'))
const Signup = lazy(() => import('./pages/Signup'))
const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home/Home'))
const SingleProduct = lazy(() => import('./pages/SingleProduct.jsx/SingleProduct.jsx'))


function App() {

  const navigate = useNavigate()
  const { isLoggedIn } = useContext(AuthData)
  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     navigate('/')
  //   }
  // }, [isLoggedIn])
  return (

    <>
      <DialogContext>
        <Header />
        <DialogContainer />
      </DialogContext>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/vendor-dashboard' element={<VendorDashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/products/:id' element={<SingleProduct />} />
          <Route path='/my-cart' element={<UserCart />} />
          <Route path='/products/category' element={<ProductsByCategory />} />
          <Route path='/' exact element={<Home />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
