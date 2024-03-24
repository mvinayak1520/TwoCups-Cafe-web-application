import React, { useState, useEffect } from 'react';
import { getDatabase, ref as databaseRef, onValue } from 'firebase/database';
import { push } from 'firebase/database';
import { toast, ToastContainer } from 'react-toastify';
import OrderHistory from './OrderHistory';
import Cookies from 'js-cookie';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';

function Menu({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    dineOption: 'Dine In',
    paymentOption: 'Cash',
  });

  const db = getDatabase();

  useEffect(() => {
    // Load products from Firebase Realtime Database
    const productsRef = databaseRef(db, 'CafeApplication/products');
    let currentAccountValue = Cookies.get('currentAccount');
    setCustomerDetails({
      name: '',
      phoneNumber: currentAccountValue,
      address: '',
      dineOption: 'Dine In',
      paymentOption: 'Cash',
    });
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    });
  }, [db]);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
    );
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const handleCheckout = async () => {

    const db = getDatabase();

    const newFeedback = {
      cart,
      customerDetails,
      timestamp: new Date().toISOString(),
      status:"Placed"
    };
   
    
    console.log('Checkout:', { cart, customerDetails });

    await push(databaseRef(db, 'CafeApplication/orders'), newFeedback);

    toast.success('Order Placed!', {
    position: 'top-right',
    autoClose: 3000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
    
    setCart([]);
    setCustomerDetails({
      name: '',
      phoneNumber: '',
      address: '',
      dineOption: 'Dine In',
      paymentOption: 'Cash',
    });
  };

  return (
    <>
    <div style={{ marginBottom: '30%' }}>
    <div className="alert alert-secondary" role="alert">
      <div className="d-flex justify-content-between align-items-center">
        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
          {showCart ? 'Cart' : 'Menu'}
        </span>
        <span
          onClick={() => setShowCart(!showCart)}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          {showCart ? (
            <FaTimes className="fa-2x" />
          ) : (
            <FaShoppingCart className="fa-2x" />
          )}
          {cart.length > 0 && (
            <span
              className="badge badge-danger"
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                transform: 'translate(50%, -50%)',
              }}
            >
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </span>
      </div>
    </div>
    <div className="container mt-5" style={{ marginBottom: '100px' }}>
      <div className="row">
        {showCart
          ? // Render cart items
            cart.map((item) => (
              <div key={item.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <p className="card-text">Price: ₹{item.price}</p>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-warning btn-sm mx-2"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          : // Render menu items
            products.map((product) => (
              <div key={product.id} className="col-md-4 mb-3">
                <div className="card mb-3">
                  <img
                    src={product.imageUrl}
                    height={300}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{fontFamily:"cursive",fontWeight:"bold"}}>{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">₹ {product.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <hr></hr>
              </div>
              
            ))}
      </div>
      {showCart && cart.length > 0 && (
        <div className="mt-4">
          <h4>Customer Details</h4>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              disabled
              className="form-control"
              id="phoneNumber"
              value={customerDetails.phoneNumber}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={customerDetails.address}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, address: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="dineOption">Dine Option:</label>
            <select
              className="form-control"
              id="dineOption"
              value={customerDetails.dineOption}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, dineOption: e.target.value })
              }
            >
              <option value="Dine In">Dine In</option>
              <option value="Dine Out">Takeaway</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="paymentOption">Payment Option:</label>
            <select
              className="form-control"
              id="paymentOption"
              value={customerDetails.paymentOption}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, paymentOption: e.target.value })
              }
            >
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  </div>
    </>
  );
}

export default Menu;
