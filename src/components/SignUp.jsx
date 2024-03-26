import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";


const SignUp = () => {

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  let [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
  const signInPage = () => {
    navigate("/signin");
  };

  axios.defaults.withCredentials = true
  const signUpHandler = async(e) => {
    console.log("IN MAIL")
    e.preventDefault();

    if(!(name && email && number && password)){
      toast.error('Plz fill all details properly');
      return ;
    }

    if(number.length <= 9 || number.length > 10){
      toast.error('Number length Should be 10');
      return ;
    }
    email = email.toLowerCase();
    if(!email.endsWith("@gmail.com")){
      toast.error('Email should be valid');
      return ;
    }

    try {
        console.log(name, number, email, password);
        const fd = new FormData();
        fd.append("name", name)
        fd.append("phoneNumber", number);
        fd.append("email", email);
        fd.append("password", password);
    //   const user = await axios.post(`/api/v1/users/register`, fd)
      const user = await axios.post(`/users/register`, {name,phoneNumber: number, email, password})
    //   const user = await axios.post(`/api/v1/users/register`, {name,phoneNumber: number, email, password})
      console.log(user)
      console.log("IN COMPLETED SECTION")
      navigate('/signin')
      toast.success(`Welcome ${user.data.data.name} plz Login`) 

    } catch (error) {
        console.log("IN ERROR SECTION")
        console.log(error)
      toast.error(`Plz Sign In`)
      navigate('/signup');
      
    }
    
  }

  return (
    <>
      <Header />
      <Toaster />
      <div className="bg-slate-800 h-[81vh] xl:h-[78vh] flex justify-center items-center flex-col">
        <Typography margin={"2rem 0"} fontSize={"1.2rem"} color={"#808080"}>
          Sign Up for get your favourite dress
        </Typography>
        <div
          className="bg-[rgb(28 38 55)] shadow-[10px 5px 5px red] h-[40vh] 
          w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[30vw] xl:h-[55vh] flex items-center justify-evenly"
          id="signUpCss"
        >
          <form className="flex justify-between items-center flex-col" id="form_css" onSubmit={signUpHandler}>
            
            <input type="text" name="name" id="name"
            className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3" 
            placeholder="name"
            onChange={(e) => {setName(e.target.value)}}
            
            />
            <input type="number" name="number" id="number"
            placeholder="number"
            className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3" 
            onChange={(e) => {setNumber(e.target.value)}}
            />
            <input type="email" name="email" id="email" 
            placeholder="email"
            className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3" 
            onChange={(e) => {setEmail(e.target.value)}}
            />
            <input type="password" name="password" id="password" 
            placeholder="password"
            className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3" 
            onChange={(e) => {setPassword(e.target.value)}}
            />

            <button className="px-[2rem] py-[.3rem] bg- mt-6 border-none bg-[#2f3a4b] rounded-[50px]" type="submit"
            >Sign In</button>

            <p className="text-[#808080]" id="not_acc">Already Have A Account? 
            <span className="ml-2 cursor-pointer underline text-[#68689a]" onClick={signInPage}>Sign In</span></p>
          </form>
        </div>
      </div>
      <Footer />
    
    </>
  )
}

export default SignUp