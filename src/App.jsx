import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import "./app.css";
import Home from './components/Home';
import Dress from './components/Dress';
import CustomerDress from './components/CustomerDress';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Cart from './components/Cart';
import PrevOrders from './components/PrevOrders';
import CustomDesignForm from './components/CustomDesignForm';
import PageNotFound from './components/PageNotFound';
import axios from 'axios';
import AdminValidate from './components/AdminValidate';
import AdminCart from './components/AdminCart';
import AddDesign from './components/AddDesign';

const App = () => {

  const [isAuth, setIsAuth] = useState(false);

  const adminAuth = localStorage.getItem(import.meta.env.VITE_ADMIN_LOC_NAME);
useEffect(() => {
  (
    async () => {
      try {
        const isUserAuth = await axios.get('/v1/users/user-auth');

        if(isUserAuth.data.success){
          setIsAuth(true)
        }
      } catch (error) {
        setIsAuth(false);
      }
    }
  )()
}, [])


  return (
    <>
      <HashRouter>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/dress" element={<Dress />} />
          <Route path="/customer-dress" element={<CustomerDress />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/cart" element={<Cart />} />
          {
          (isAuth) ? <Route path='/prev-order' element={<PrevOrders />} />
          : <Route path="*" element={<PageNotFound />} />
          }
          {
            (adminAuth === import.meta.env.VITE_ADMIN_LOC_VAL) ? <>
             <Route path='/add-design' element={<AddDesign />}/>
             <Route path="/admin-cart" element={<AdminCart />} />
            </> 
            : <Route path="*" element={<PageNotFound />} />
          }
          <Route path="/custom-design-form" element={<CustomDesignForm />} />
          <Route path="/admin-validate" element={<AdminValidate />} />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </HashRouter>
    </>
  )
}

export default App