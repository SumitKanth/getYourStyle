import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";


const AddDesign = () => {

  const [dressName, setDressName] = useState("")
  const [price, setPrice] = useState(0)
  const [details, setDetails] = useState("")
  const [file, setFile] = useState(null)

  const navigate = useNavigate();

  axios.defaults.withCredentials = true
  const dressUploadHandler = async(e) => {
    e.preventDefault();

    if(!(dressName && price && details && file)){
      toast.error('Plz fill all details properly');
      return ;
    }

    try {
      const formData = new FormData();
      formData.append("dressName", dressName);
      formData.append("image", file);
      formData.append("price", price);
      formData.append("details", details)
      const dress = await axios.post(`/v1/admin/dress-upload`,formData)
      console.log(dress)
      toast.success(`Dress Uploaded SuccessFully`)
      navigate('/dress')

    } catch (error) {
      toast.error(`Dress Not Uploaded`)
      navigate('/add-design');
    }
    
  }

  return (
    <>
      <Header />
      <Toaster />
      <div className="bg-slate-800 h-[81vh] xl:h-[78vh] flex justify-center items-center flex-col">
        <Typography margin={"2rem 0"} fontSize={"1.2rem"} color={"#808080"}>
          Upload Your Dress
        </Typography>
        <div
          className="bg-[rgb(28 38 55)] shadow-[10px 5px 5px red] h-[40vh] 
          w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[30vw] xl:h-[55vh] flex items-center justify-evenly"
          id="signUpCss"
        >
          <form className="flex justify-between items-center flex-col" id="form_css" onSubmit={dressUploadHandler}>
            
            <input type="text" name="dressName" id="dressName"
            className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3" 
            placeholder="dressName"
            onChange={(e) => {setDressName(e.target.value)}}
            
            />
            <input type="price" name="price" id="price"
            placeholder="price"
            className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3" 
            onChange={(e) => {setPrice(e.target.value)}}
            />

<input type="details" name="details" id="details"
            placeholder="details"
            className="bg-slate-800 text-white border-2 border-black px-4 py-2 rounded-lg mx-2 my-3" 
            onChange={(e) => {setDetails(e.target.value)}}
            />
            <input
              type="file"
              name="image"
              id="image"
              className="bg-slate-800 text-white w-60 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button className="px-[2rem] py-[.3rem] bg- mt-6 border-none bg-[#2f3a4b] rounded-[50px]" type="submit"
            >Add</button>
          </form>
        </div>
      </div>
      <Footer />
    
    </>
  )
}

export default AddDesign