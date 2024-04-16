import './App.css';
import Navbar from './components/Navbar';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import BackgroundC from './components/background';
import Footer from './components/Footer';
import AdminHome from './components/AdminHome';
import ProductManagement from './components/ProductManagement';
import Billing from './components/Billings';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CustomerHome from './components/CustomerHome';
import Menu from './components/Menu';
import GiveFeedback from './components/CustomerFeedback';
import OrderHistory from './components/OrderHistory';
import FeedbackViewer from './components/FeedbackViewer ';
import AllOrder from './components/AllOrder';
import Aboutus from './components/Aboutus';
import Contactus from './components/ContactUs';
import CustomerOffers from './components/CustomerOffers';

function App() {

  const backgroundImageStyle = {
    backgroundImage: `url('tea.png')`,  
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity: 0.8,
  };

  const [loggedStatus, setLoggedStatus] = useState(true);
  const [isAdmin,setisAdmin] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    let cookieValue = Cookies.get('userstatus');
    if(cookieValue){
      setLoggedStatus(true)
    }else{
      setLoggedStatus(false)
    }
    let currentAccountValue = Cookies.get('currentAccount');
    if(currentAccountValue === "9975777709"){
      setisAdmin(true)
    }else{
      setisAdmin(false)
    }
   console.log("isAdmin",isAdmin)
   console.log("currentAccount",currentAccount)
   console.log("loggedStatus",loggedStatus)
  },[currentAccount,loggedStatus]);
  
  return (

    <Router>
    <Navbar isAdmin={isAdmin} setisAdmin={setisAdmin} setLoggedStatus={setLoggedStatus} loggedStatus={loggedStatus} setCurrentAccount={setCurrentAccount} currentAccount={currentAccount}/>
    <Routes>
      {loggedStatus ? (
        <>
        {isAdmin ? <>
        <Route exact path="/" element={ <AdminHome></AdminHome>} />
        <Route exact path="/admin-products" element={ <ProductManagement></ProductManagement>} />
        <Route exact path="/admin-billings" element={<Billing></Billing>} />
        <Route exact path="/customer-offers" element={<CustomerOffers></CustomerOffers>} />
        <Route exact path="/offers" element={<CustomerOffers></CustomerOffers>} />
        <Route exact path="/admin-feedback-view" element={<FeedbackViewer></FeedbackViewer>} />
        <Route exact path="/admin-orders" element={<AllOrder></AllOrder>} />
        <Route path="/about" element={<Aboutus></Aboutus>} />
        <Route path="/contact" element={<Contactus></Contactus>} />
        </>:
        <>
        <Route exact path="/" element={<CustomerHome></CustomerHome>} />
        <Route exact path="/customer-menu" element={<Menu></Menu>} />
        <Route exact path="/customer-offers" element={<CustomerOffers></CustomerOffers>} />
        <Route exact path="/customer-feedback" element={<GiveFeedback></GiveFeedback>} />
        <Route exact path="/offers" element={<CustomerOffers></CustomerOffers>} />
        <Route exact path="/customer-order-history" element={<OrderHistory phoneNumber = {currentAccount}></OrderHistory>} />
        <Route path="/about" element={<Aboutus></Aboutus>} />
        <Route path="/contact" element={<Contactus></Contactus>} />
        </>}
        <Route exact path="/" element={<BackgroundC></BackgroundC>} />
        </>
      ) : (
        <>
          <Route exact path="/" element={<BackgroundC></BackgroundC>} />
          <Route path="*" element={<BackgroundC></BackgroundC>} />
          <Route path="/about" element={<Aboutus></Aboutus>} />
          <Route exact path="/offers" element={<CustomerOffers></CustomerOffers>} />
          <Route path="/contact" element={<Contactus></Contactus>} />
        </>
      )}
    </Routes>
    <Footer></Footer>
    <ToastContainer />
  </Router>
  
  );
}

export default App;
