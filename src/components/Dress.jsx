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
import { Link } from 'react-router-dom'
import axios from 'axios'

const Dress = () => {
  
  const [dresses, setDresses] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    (
      async () => {
        try {
          const allDresss = await axios.get(`/v1/admin/all-dress`); 
          console.log(allDresss.data.data)
          console.log(allDresss.data.data[0])
          setDresses(allDresss.data.data)
          console.log(dresses)
        } catch (error) {
          console.log(error)
        }
      }
    )()
  }, [])

  return (
    <>

      <Header />  

      <div className="bg-slate-800 h-[100%]">
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
              <Card sx={{ maxWidth: 300, height: 450}} className='mx-4 my-4 bg-[#cc659f]'>
              <CardMedia
                sx={{ height: 300 }}
                image={dress.image}
                title={dress.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dress.name} <span> ₹{dress.price}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dress.details}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Add To Cart</Button>
              </CardActions>
            </Card>
            )
          })
        }


{/*  
    <Card sx={{ maxWidth: 300, height: 400}} className='mx-4 my-4'>
      <CardMedia
        sx={{ height: 200 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 300, height: 400}} className='mx-4 my-4'>
      <CardMedia
        sx={{ height: 200 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 300, height: 400}} className='mx-4 my-4'>
      <CardMedia
        sx={{ height: 200 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>


    <Card sx={{ maxWidth: 300, height: 400}} className='mx-4 my-4'>
      <CardMedia
        sx={{ height: 200 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 300, height: 400}} className='mx-4 my-4'>
      <CardMedia
        sx={{ height: 200 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 300, height: 400}} className='mx-4 my-4'>
      <CardMedia
        sx={{ height: 200 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 300, height: 400}} className='mx-4 my-4'>
      <CardMedia
        sx={{ height: 200 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 300, height: 400}} className='mx-4 my-4'>
      <CardMedia
        sx={{ height: 200 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 300, height: 400}} className='mx-4 my-4'>
      <CardMedia
        sx={{ height: 200 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>

    */}
    </div>
        </div>
      <Footer />
      </div>

  
    </>
  )
}

export default Dress
