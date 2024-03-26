import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import hamburger from "../assets/hamburger.png"
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const [userAuth, setUserAuth] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const [hamNav, setHamNav] = useState(true);
    const navigate = useNavigate()
    const adminAuth = localStorage.getItem(import.meta.env.VITE_ADMIN_LOC_NAME);

    const hamburgerNav = () => {
        
        axios.defaults.withCredentials = true;

        const header = document.getElementsByClassName("header")[0];
        const ul = document.getElementById("ul");
        if(hamNav){
            header.style.height = "22rem";  
            header.style.position = "relative"
             
            ul.style.display = "flex";
            ul.style.position = "absolute";
            ul.style.bottom = 0;
            ul.style.flexDirection = "column"
            ul.style.top = "5rem"
            ul.style.left = "0"

            setHamNav(false)
        }
        else{

            header.style.height = "6rem";
            ul.style.display = "none";
            setHamNav(true)
        }
    }

    
   
    useEffect(() => {
        (
            async() => {
                try {
                    const isUserAuth = await axios.get(`/api/v1/users/user-auth`);
                    console.log(isUserAuth)
                    if(isUserAuth.data.success){
                        setUserAuth(true)
                    }
                    const userDress = await axios.get("/api/v1/users//user-dress-for-cart");
                    
                    setCartCount(userDress.data.data.length);
                } catch (error) {
                    console.log(error?.message || "USER NOT AUTH")
                }
            }
        )();
        
    }, [])

    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <div className="logo">
                        <img src={logo} alt="log0_img" />
                    </div>
                    
                   {
                    (userAuth) ? (
                        <ul id="ul">
                        <li className="pr-3 pl-3"><Link to="/">Home</Link></li>
                        <li className="pr-3 pl-3"><Link to="/dress">Design</Link></li>
                        <li className="pr-3 pl-3" ><Link to="/custom-design-form">CustomerDesignForm</Link></li>

                       {adminAuth === import.meta.env.VITE_ADMIN_LOC_VAL ? 
                       <li className="pr-3 pl-3" ><Link to="/admin-cart">Admin Cart</Link></li>
                   
                    :
                   <></>
                }


                        <li className="pr-3 pl-3"><Link to="/prev-order">PrevOrder</Link></li>
                        <li className="pr-3 pl-3"><Link to="/cart" className="cart_link">
                            <span className="cart_cnt">{cartCount}</span>
                            <ShoppingCartOutlinedIcon fontSize="large" className="h-28" />
                            </Link></li>
                    </ul>
                    ) : (
                        <ul id="ul">
                        <li className="pr-3 pl-3"><Link to="/">Home</Link></li>
                        <li className="pr-3 pl-3"><Link to="/dress">Design</Link></li>
                        {/* <li className="pr-3 pl-3" >CustomerDesign</li> */}

                        {adminAuth === import.meta.env.VITE_ADMIN_LOC_VAL ? 
                        <>
                        <li className="pr-3 pl-3" ><Link to="/admin-cart">Admin Cart</Link></li>
                        <li className="pr-3 pl-3" ><Link to="/add-design">Add Design</Link></li>
                        </>
                   
                    :
                   <></>
                }


                        <li className="pr-3 pl-3"><Link to="/signin">SignIn</Link></li>
                        <li className="pr-3 pl-3"><Link to="/cart" className="cart_link">
                            <span className="cart_cnt">{cartCount}</span>
                            <ShoppingCartOutlinedIcon fontSize="large" className="h-28" />
                            </Link></li>
                    </ul>
                    )
                   }

                    
                    <img className="ham-burger" onClick={hamburgerNav} src={hamburger} alt="hamburger_img" />
                </nav>
            </header>
        </>
    )
}

export default Header