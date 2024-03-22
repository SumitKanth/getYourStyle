import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, TextField } from '@mui/material'
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";


const AdminValidate = () => {

 const [name, setName] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();

 const adminValidateHandler = () => {
    const val = import.meta.env.VITE_ADMIN_LOC_VAL
    if(name !== import.meta.env.VITE_ADMIN_NAME || password !== import.meta.env.VITE_ADMIN_PASS){
        toast.error("WORNG DETAILS WE CAPTURED YOU")
    }
    else {
        toast.success("LOGIN SUCCESSFULLY")
        localStorage.setItem(import.meta.env.VITE_ADMIN_LOC_NAME, val)
        navigate("/admin-cart")
    }
 }

  return (
    <>
      <Header />
      <Toaster />
    <div className="min-h-[55rem] h-100% flex justify-center items-center md:flex-col sm:flex-row flex-col
    space-y-10 sm:h-[70rem] md:h-[60rem] lg:h-[75rem]
    ">
      <TextField id="outlined" label="name" variant="outlined" value={name} onChange={((e) => setName(e.target.value))}
      />

      <TextField id="outlined-basic" label="password" variant="outlined" type="password"
      value={password} onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={adminValidateHandler} variant="outlined">Submit</Button>
      </div>
      <Footer />    
    </>
  )
}

export default AdminValidate