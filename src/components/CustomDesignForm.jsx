import React, { createRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Typography } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CustomDesignForm = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [dressName, setDressName] = useState("");
  const [number, setNumber] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);


  const getDesignHandler = async (e) => {

    e.preventDefault();

    if(number > 11 || number < 9){
      toast('Number should be of length 10')
      return ;
    }
    if (!file) {
      toast("Plz Upload file");
    }
    try {
      console.log(file);
      const formData = new FormData();
      formData.append("dressName", dressName);
      formData.append("phoneNumber", number);
      formData.append("dressImage", file);
      formData.append("details", details);
      console.log(formData);
      const userDress = await axios.post("/v1/users/user-dress", formData);

      if(!userDress){
        toast("Dress name should be unique")
      }
      
      console.log("This done bro");
      navigate("/");
      toast("Dress Uploaded Successfully you have made it");
      
      
      
    } catch (error) {
      console.log("HELLO");
      toast("Dress name should not be same");
      console.log(error?.message || "User Dress Not Uploaded");
    }
  };

  return (
    <>
      <Header />

      <div className="bg-slate-800 h-[81vh] xl:h-[78vh] flex justify-center items-center flex-col">
        <Typography margin={"2rem 0"} fontSize={"1.2rem"} color={"#808080"}>
          Get Your Own Design
        </Typography>
        <div
          className="bg-[rgb(28 38 55)] shadow-[10px 5px 5px red] h-[40vh] 
          w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[30vw] xl:h-[55vh] flex items-center justify-evenly"
          id="signUpCss"
        >
          <form
            className="flex justify-between items-center flex-col"
            id="form_css"
            onSubmit={getDesignHandler}
          >
            <input
              type="text"
              name="dress_name"
              id="dress_name"
              className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3 w-60"
              placeholder="dress_name"
              onChange={(e) => {
                setDressName(e.target.value);
              }}
            />
            <input
              type="number"
              name="number"
              id="number"
              placeholder="number"
              className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3 w-60"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            <input
              type="text"
              name="details"
              id="details"
              placeholder="details"
              className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3 w-60"
              onChange={(e) => {
                setDetails(e.target.value);
              }}
            />

            <input
              type="file"
              name="image"
              id="image"
              className="bg-slate-800 text-white w-60 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              className="px-[2rem] py-[.3rem] bg- mt-6 border-none bg-[#2f3a4b] rounded-[50px]"
              type="submit"
            >
              Click
            </button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CustomDesignForm;
