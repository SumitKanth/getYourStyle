import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const signIn = () => {

    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const signUpPage = () => {
    navigate("/signup");
  };

  const signInHandler = async(e) => {
    e.preventDefault();
    if(number.length < 9 || number.length > 11){
        toast('Number Should Be of length 10')
        return 
    }
    if(!(number && password)){
        toast('All fields required')
        return 
    }

    try {
        const user = await axios.post(`/users/login`, {phoneNumber: number, password});
        console.log(user)
        toast(`Welcome ${user.data.data.createdUser.name}`);
        navigate('/dress');

    } catch (error) {
        toast('Invalid Details SignIn Again')
        navigate('/signin')
    }

  }

  return (
    <>
      <Header />
      <div className="bg-slate-800 h-[81vh] flex justify-center items-center flex-col">
        <Typography margin={"2rem 0"} fontSize={"1.2rem"} color={"#808080"}>
          Sign In for get your favourite dress
        </Typography>
        <div
          className="bg-[rgb(28 38 55)] shadow-[10px 5px 5px red] h-[40vh] 
          w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[30vw] xl:h-[55vh] flex items-center justify-evenly"
          id="signInCss"
        >
          <form className="flex justify-between items-center flex-col" id="form_css" onSubmit={signInHandler}>
          <input type="number" name="number" id="number" 
            placeholder="number"
            className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3" 
            onChange={(e) => {setNumber(e.target.value)}}
            />
            <input type="password" name="password" id="password" 
            placeholder="password"
            className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3" 
            onChange={(e) => {setPassword(e.target.value)}}
            />

            <button className="px-[2rem] py-[.3rem] bg- mt-6 border-none bg-[#2f3a4b] rounded-[50px]" type="submit"
            >Sign In</button>

            <p className="text-[#808080]" id="not_acc">Not have a account? 
            <span className="ml-2 cursor-pointer underline text-[#68689a]" onClick={signUpPage}>Sign Up</span></p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default signIn;
