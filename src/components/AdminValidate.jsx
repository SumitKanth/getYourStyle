// import React, {useState, useEffect} from 'react'
// import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
// import {app} from './firebase.config'
// import toast, {Toaster} from 'react-hot-toast'

// const AdminValidate = () => {

//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [otp, setOtp] = useState('');
//     const [confirmationResult, setComfirmationResult] = useState(null);
//     const [otpSent, setOtpSent] = useState(false);

//     const auth = getAuth(app);

//     useEffect(() => {
//         window.RecaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//             'size': 'normal',
//             'callback': (response) => {

//             },
//             'expired-callback': () => {

//             }
//         }, []);
//     })

//     const handleSendOtp = async () => {
//         try {
//             const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
//             const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.RecaptchaVerifier);
//             setComfirmationResult(confirmation);
//             setOtpSent(true);
//             setPhoneNumber('');
//             toast.success('OTP has been sent')

//         } catch (error) {
//             console.log(error)
//             toast.error(error?.message || "Error While Sending OTP");
//         }
//     }


//     const handleOTPSubmit = async () => {
//         try {
//             await confirmationResult.confirm(otp);
//             setOtp('');
//             toast.success('User Confirmed Successfully');
//         } catch (error) {
//             toast.error('User not successfully confirnmed');
//             console.log(error?.message || "Error while opt submit")
//         }
//     }

//     return (
//         <>
//             <Toaster />

//             {
//                 !otpSent ? (
//                     <div id="recaptcha-container"></div>
//                 ) :
//                 (null)
//             }

//             <input type="tel" name="" id="" value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}} 
//             placeholder='Enter Phone Number With Country Code'
//             className="border border-gray-500 p-2 rounded-md"
//             />

//             <input type="text" name="" id="" value={otp} onChange={(e) => {setOtp(e.target.value)}}
//             placeholder='Enter Otp'
//             className="border border-gray-500 p-2 rounded-md"
//             />

//             <button onClick={otpSent ? handleOTPSubmit : handleSendOtp} 
//             className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white p-2 rounded`}
//             style={{backgroundColor: otpSent ? 'green' : 'blue'}}
//             >
//                 {otpSent ? 'Submit OTP' : 'Send OTP'}
//             </button>
//         </>
//     )
// }

// export default AdminValidate;


import React,{useState} from 'react'
import {getAuth, RecaptchaVerifier,signInWithPhoneNumber  } from 'firebase/auth';
import toast, {Toaster} from 'react-hot-toast'
import PhoneInput from 'react-phone-input-2'
import { app } from './firebase.config';
const AdminValidate = () => {
    const [Otp,setOtp]=useState();
    const [Phone,setPhone]=useState();
    // Gentrating Capture

    const auth = getAuth(app)

    const gencap =()=>{
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recapCont', {
            'size': 'visible',
            'callback': (response) => {
            }
          });
    }
    // Otp Submission
    const subotp=(event)=>{
        event.preventDefault();
        console.log(Otp)
        let confirmationResult= window.confirmationResult;
        confirmationResult.confirm(Otp).then((result) => {
         setOtp();
         Sucss();
       }).catch((error) => {
        toast.error(error?.message);
       });
       }


    
    const Captcha =(event)=>{
        event.preventDefault();
        gencap();
        let appVerifier =  window.recaptchaVerifier;
        signInWithPhoneNumber(auth, Phone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          toast.success('Otp Send..');
        }).catch((error) => {
            setPhone();
            toast.error(error.message);
        });
    }
  return (
   <>
   <div className="Loginuser">
    <Toaster />
    <form onSubmit={subotp} method="post" className="containerUserLogin">
    <PhoneInput  defaultCountry="IN" value={Phone} onChange={setPhone} placeholder='Enter the Phone No.' required/>
       
      
       <button onClick={Captcha}>Submit</button>
       <div id="recapCont"></div>
       <div id="Otpdiv">
       <input type="text" value={Otp} onChange={(e)=>{
        setOtp(e.target.value);
       }} placeholder='Enter the Otp 'required/>
       <button>Submit Otp</button>
       </div>
    </form>
   </div>
   
   </>
  )
}

export default AdminValidate