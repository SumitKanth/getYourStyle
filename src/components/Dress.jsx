import * as React from 'react';
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from './Header'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

const Dress = () => {
  
  axios.defaults.withCredentials = true;
  const [dresses, setDresses] = useState([]);
  const navigate = useNavigate

  const cardStyle = {
    "backgroundColor": "#ff00",
  }

  const addToCart = async(dress) => {
    try {
      const user = await axios.get("/api/v1/users/user-auth");
      if(!user || !user.data.success){
        return toast.error('Plz SignIn Or SignUp first')
      }

      const userDressFromDressSection = await axios.post("/api/v1/users/user-dress-from-dress-section", {
        dressName: dress.name,
        phoneNumber: user.data.data.user.phoneNumber,
        dressImage: dress.image,
        price: dress.price,
        details: dress.details
      })

      if(!userDressFromDressSection){
        return toast.error("Plz Check To Cart Is Dress Uploaded, If not try Again")
      }

      toast.success("Dress Uploaded 😊 check your cart")
    } catch (error) {
      console.log(error);
    }
  }

  const viewFullDress = (dress_img) => {
    console.log(dress_img)
    location.href = dress_img 
  }

  useEffect(() => {
    (
      async () => {
        try {
          const allDresss = await axios.get(`/admin/all-dress`); 
          setDresses(allDresss.data.data)
          console.log("All Dress: ", allDresss.data.data)
          console.log("Dresses: ", dresses)
        } catch (error) {
          console.log(error)
        }
      }
    )()
  }, [])

  return (
    <>
      <Header />  
    <Toaster />
      <div className="bg-slate-800 h-[100%] min-h-[60rem]">
        <div className="text-white py-3 px-4 flex flex-col border-b">
          <h1 className='text-center my-6 text-[#808080] text-xl'>Go To particular Section</h1>
          <div className='flex justify-between items-center underline md:justify-center md:space-x-36'>
            <Link to='/lehenga'>Lehenga</Link>
            <Link to='/kurtaPejama'>Kutra Pejama</Link>
            <Link to='/blouse '>Blouse</Link>
          </div>
        </div>

        <div className="flex justify-around">
          <div className="flex justify-around items-center flex-wrap bg-slate-800 w-[70%] my-4">

        {
          dresses.map((dress, ind) => {
            return (
              <Card sx={{ maxWidth: 300, height: 450}} style={cardStyle} key={ind}>
              <CardMedia
                component="img"
                alt={dress.image}
                sx={{ height: 300, width: 250 }}
                image={dress.image}
                onClick={() => viewFullDress(dress.image)}
              />
             <CardContent className="bg-slate-800">
                <Typography gutterBottom variant="h5" component="div" color={'#979cd7'}>
                  {dress.dressName}   ₹{dress.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{fontSize: "1rem", color: "rgb(164 177 231 / 60%)"}}>
                  {dress.details}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => addToCart(dress)}>Add Cart</Button>
              </CardActions>
            </Card>
            )
          })
        }

    </div>
        </div>
      </div>
      <Footer />

  
    </>
  )
}

export default Dress