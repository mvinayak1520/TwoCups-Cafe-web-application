import React,{useState,useEffect} from "react";
import { register } from "../firebaseConfig";
import { toast, ToastContainer } from 'react-toastify';
import { getDatabase, ref, set, get } from "firebase/database";
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaInfoCircle, FaPhone,FaHome,FaPercent  } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import { FaClock, FaCalendarAlt } from 'react-icons/fa';

function Navbar(props) {

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('user');

  const logout =()=>{
    props.setLoggedStatus(false)
    props.setCurrentAccount("")
    props.setisAdmin(false)
    Cookies.remove('userstatus');
    Cookies.remove('currentAccount');
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleRegister = () => {
    // Perform validation here before processing the registration
    if (
      phoneNumber.length !== 10 
    ) {
      setErrorMessage('Phone Number must be 10 digit.');
      toast.error('Phone Number must be 10 digit.')
      return;
    }

    if (
  
      username.trim() === ''
    ) {
      setErrorMessage('Username must not be empty.');
      toast.error('Username must not be empty.')
      return;
    }


    if (
      
      password.length < 6 
    ) {
      setErrorMessage('Password must be at least 6 characters long.');
      toast.error('Password must be at least 6 characters long.')
      return;
    }

   register(phoneNumber, username, email,password,userType);
   setPhoneNumber("")
   setPassword("")
   setUsername("")
   setEmail("")
   setUserType("user")
   setErrorMessage("")

   toast.success('Thank you for registration.', {
    position: 'top-right',
    autoClose: 3000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  };


  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (/^\d+$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    if (phoneNumber.length !== 10) {
      setErrorMessage(
        'Phone number must be 10 digits long.'
      );
      return;
    }
    if (password.length < 6) {
      setErrorMessage(
        'Password must be at least 6 characters long.'
      );
      return;
    }

    //

      const db = getDatabase();
      const userRef = ref(db, "CafeApplication/users/" + phoneNumber);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();

      if (!userData) {
        alert("Login Failed ");
        props.setCurrentlogged(true);
      }
      else{
        if(userData.phoneNumber===phoneNumber && userData.password===password){
          props.setCurrentAccount(phoneNumber);
          if(phoneNumber === "9975777709"){
            props.setisAdmin(true)
          }else{
            props.setisAdmin(false)
          }
          props.setLoggedStatus(true);
          setPhoneNumber("")
          Cookies.set('userstatus', true);
          Cookies.set('currentAccount', phoneNumber);  
          setPassword("")
          toast.success('Login success.', {
            position: 'top-right',
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        else{
          toast.error('Login Failed.', {
            position: 'top-right',
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          props.setLoggedStatus(false);
         
        }
      }

    //

  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const selectedProducts = []; // Replace this with your actual array of selected products
  const totalSum = selectedProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#051922" }}>
    <a className="navbar-brand mr-5" href="#" style={{ fontSize: "30px", fontFamily: "avaler-kursive" }}>
    <img src="android-chrome-512x512.png" alt="Two Cups Cafe & Resto Logo" height={40} style={{ marginRight: "10px" }} />
  Two<span style={{color:"rgb(150, 107, 58)"}}>Cups</span>  <span style={{fontSize:"16px"}}>Cafe and Restro</span> 
</a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarScroll"
      aria-controls="navbarScroll"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul
        className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll"
        style={{ maxHeight: "100px" }}
      >
       
        
      </ul>
      <>

      <Link className="mr-4 m-1" to="/" style={{fontSize:"16px" ,color:"white"}}>
      Home <FaHome />
    </Link>

      <Link className="mr-4 m-1" to="/about" style={{fontSize:"16px" ,color:"white"}}>
      About Us <FaInfoCircle />
    </Link>

 
    <Link className="m-1 mr-4" to="/contact" style={{fontSize:"16px" ,color:"white"}}>
      Contact Us <FaPhone />
    </Link>

    <Link className="m-1 mr-4" to="/offers" style={{fontSize:"16px" ,color:"white"}}>
      Offers   <FaPercent />
    </Link>

      </>
      {props.loggedStatus ? (
        <>

      
         
       
          <button
            className="btn btn-outline-danger m-1"
            onClick={logout}
          >
            Logout <FaSignOutAlt />
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-outline-success m-1"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Login <FaSignInAlt />
          </button>
          <button className="btn btn-outline-success m-1" data-toggle="modal" data-target="#exampleModal2">
            Register <FaUserPlus />
          </button>
        </>
      )}
    </div>
  </nav>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          className="form-control"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
    </form>
    {errorMessage && (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    )}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handleLogin}>Login</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">Register</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <form>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
    
      </form>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleRegister}>Register</button>
    </div>
  </div>
</div>
</div>

    </>
  );
}

export default Navbar;
