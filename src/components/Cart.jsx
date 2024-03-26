import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from '@mui/material'

const Cart = () => {
  const [dress, setDress] = useState([]); 
  axios.defaults.withCredentials = true;

  const cardStyle = {
    "backgroundColor": "#ff00",
  }

  const deleteOrder = async (dress) => {
    console.log(dress._id)
    try {
        console.log("Order Before Deleted");
        const deleted_order = await axios.post("/api/v1/users/order-delete", {dress_id: dress._id})
        console.log("Order After Deleted");
        console.log(deleted_order);
        toast.success("Order Canceled Successfully")
    } catch (error) {
        console.log(error);
    }
  }

useEffect(() => {
  (async () => {
    try {
      const userDress = await axios.get("/api/v1/users/user-dress-for-cart");
      console.log(dress)
      setDress(userDress.data.data);
      console.log(dress)
      console.log(userDress)

    } catch (error) {
      toast.error("Plz Refresh Page");
      console.log(error);
    }
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
            <Card sx={{ maxWidth: 255, height: 550, maxHeight: 700}} key={ind} style={cardStyle}>
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
                <Typography variant="body2" color="text.secondary" style={{fontSize: "1rem", color: "rgb(164 177 231 / 60%)"}}>
                  {dress.details}
                </Typography>
              </CardContent>
              <CardActions className="bg-slate-800">
                {!(dress.stage) ? (
                  <p style={{fontSize: "1.2rem", color: "rgb(190 228 201 / 60%)"}}>
                    Order Pending  <CircularProgress size={"1rem"} className="mx-2"/>
                  </p>
                ) : (
                  <p style={{fontSize: "1.1rem", color: "rgb(190 228 201 / 60%)"}}> Order will Delivered on {dress.orderInfo} 😊</p>
                )}
              </CardActions>
              <Button size="small" variant="outlined" onClick={() => deleteOrder(dress)}>Cancel Order</Button>
            </Card>
          </>
        );
      })}
    </div>
    <Footer />
  </>
);
};

export default Cart;

