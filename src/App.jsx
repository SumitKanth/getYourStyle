import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Dress from './components/Dress';
import CustomerDress from './components/CustomerDress';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Cart from './components/Cart';
import PrevOrders from './components/PrevOrders';
import CustomDesignForm from './components/CustomDesignForm';
import PageNotFound from './components/PageNotFound';
import "./app.css";
import axios from 'axios';

const App = () => {

  const [isAuth, setIsAuth] = useState(false);

useEffect(() => {
  (
    async () => {
      try {
        const isUserAuth = await axios.get('/users/user-auth');

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
          <Route path="/custom-design-form" element={<CustomDesignForm />} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </HashRouter>
    </>
  )
}

export default App