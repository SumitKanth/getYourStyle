import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import {  useNavigate } from 'react-router-dom'

const AdminCart = () => {
  const [dress, setDress] = useState([]);
  const [price, setPrice] = useState("");
  const [orderInfo, setOrderInfo] = useState("");
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  const cardStyle = {
    "backgroundColor": "#ff00",
  }


  const takeOrder = async(e, dress) => {
    e.preventDefault();
        console.log(price, orderInfo, dress)
        try {
            const updatedUser = await axios.post("/v1/admin/updating-price-stage", {
                dress_id: dress._id,
                price: price,
                phoneNumber: dress.phoneNumber,
                orderInfo: orderInfo
            })

            console.log(updatedUser);
            toast.success('Details Updated Successfully')
            navigate('/admin-cart')
        } catch (error) {
            console.log("Error While Updating User Order: ", error)
        }
  }

  const orderCompleted = async(dress) => {
    try {
        const order = await axios.post("/v1/admin/order-completed", {phoneNumber: dress.phoneNumber, dress_id: dress._id})
    } catch (error) {
        console.log(error)
        toast.error("Plz Click Again")
    }
  }

  useEffect(() => {
    (async () => {
      const dress = await axios.get("/v1/admin/user-order");
      setDress(dress.data.data);
    })();
  }, []);

  return (
    <>
     <Header />

    <div className="bg-slate-800 min-h-[55rem] h-100% flex justify-center items-center flex-wrap py-10 space-y-8 space-x-8">
      <Toaster />

      {dress.map((dress, ind) => {
        return (
          <>
            <Card sx={{ maxWidth: 255, minHeight: 590, maxHeight: 700}} key={ind} style={cardStyle}>
              <CardMedia
                component="img"
                alt={dress.dressName}
                sx={{ height: 300, width: 250 }}
                image={dress.dressImage}
              />
              <CardContent className="bg-slate-800">
                <Typography gutterBottom variant="h5" component="div" color={'#979cd7'}>
                  {dress.dressName}   ₹{dress.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{fontSize: "1.2rem", color: "rgb(164 177 231 / 60%)"}}>
                  {dress.details}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{fontSize: "1.2rem", color: "rgb(164 177 231 / 60%)", marginTop: ".2rem"}}>
                  Number - {dress.phoneNumber}
                </Typography>
              </CardContent>
              <CardActions className="bg-slate-800">
                {!(dress.stage) ? (
                  <div style={{fontSize: "1.2rem", color: "rgb(190 228 201 / 60%)"}}>
                    <form className="space-y-2" onSubmit={(e) => takeOrder(e, dress)}> 
                        <input type="text" name="price" id="price" 
                        className="bg-[rgb(83 79 92)] border-2 border-solid border-[#808080] rounded-md text-black px-2 py-1"
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />

                        <input type="text" name="orderInfo" id="orderInfo" 
                        className="bg-[rgb(83 79 92)] border-2 border-solid border-[#808080] rounded-md px-2 py-1 text-black"
                        placeholder="Enter Diliver Date"
                        value={orderInfo}
                        onChange={(e) => setOrderInfo(e.target.value)}
                        />

                        <button className="px-4 py-1 border-2 border-solid rounded-md" type="submit">Add Info</button>
                    </form>
                  </div>
                ) : (
                    <div className="space-y-4">
                    <p style={{fontSize: "1.1rem", color: "rgb(190 228 201 / 60%)"}}>Order Will Delivered on {dress.orderInfo}</p>
                    <button className="px-1 py-1 border-2 border-solid rounded-md text-white border-blue-700" onClick={() => orderCompleted(dress)}>Order Completed</button>
                    </div>
                )}
              </CardActions>
            </Card>
          </>
        );
      })}
    </div>
    <Footer />
    </>
  );
};

export default AdminCart;
