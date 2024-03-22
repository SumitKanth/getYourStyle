import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const PrevOrders = () => {
  axios.defaults.withCredentials = true;
  const [dress, setDress] = useState([]);

  const viewFullDress = (dress_img) => {
    console.log(dress_img)
    location.href = dress_img 
  }

  
  const cardStyle = {
    "backgroundColor": "#ff00",
  }

  useEffect(() => {
    (
      async() => {
        try {
          const userDress = await axios.post("/v1/users/particular-custom-dresses");
          console.log(userDress)
          setDress(userDress.data.data.userCustomDress);
        } catch (error) {
          console.log(error)
        }
      }
    )()
  }, [])

  return (
    <>

      <Header />
      <div className="bg-slate-800 min-h-[55rem] h-100% flex justify-center items-center flex-wrap py-10 space-y-8 space-x-8">

        {
          (dress.length ? 
            (
                dress.map((dress, ind) => {
                    return (
                      <Card sx={{ maxWidth: 300, height: 400}} style={cardStyle} key={ind}>
                      <CardMedia
                        component="img"
                        alt={dress.dressName}
                        sx={{ height: 300, width: 250 }}
                        image={dress.dressImage}
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
                    </Card>
                    )
                  })
            )
            :
            <p className='text-white text-5xl '>No Order Yet</p>
            )
        }

    </div>

      <Footer />
    
    </>
  )
}

export default PrevOrders