import React, { useState, useEffect } from 'react';
import { getDatabase, ref as databaseRef, orderByChild, equalTo, onValue } from 'firebase/database';
import Cookies from 'js-cookie';

const OrderHistory = ({ phoneNumber }) => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentAccount, setcurrentAccount] = useState('');

  useEffect(() => {
    const db = getDatabase();
    let currentAccountValue = Cookies.get('currentAccount');
    setcurrentAccount(currentAccountValue)
    const ordersRef = databaseRef(db, 'CafeApplication/orders');

    try {
      
      onValue(ordersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const ordersArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
          setOrders(ordersArray);
          setErrorMessage('');
        } else {
          setOrders([]);
          setErrorMessage('No orders found.');
        }
      });
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      setErrorMessage('Error fetching orders. Please try again.');
    }
  }, []);

  return (
    <>
    <div class="alert alert-secondary" role="alert">
    Order History
</div>
    <div className="container mt-5" style={{marginBottom:"30%"}}>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {orders.length > 0 && (
        <div className="mt-4">
        
          
        {orders
          .filter((order) => order.customerDetails.phoneNumber === currentAccount)
          .map((order) => (
            <div key={order.id} className="card mb-3">
              <div class="alert alert-secondary" role="alert">
                <h4>Order Details</h4>
              </div>
              <div className="card-body">
                <p>Order ID: {order.id}</p>
                <p>Timestamp: {order.timestamp}</p>
                <p>Name: {order.customerDetails.name}</p>
                <p>Phone Number: {order.customerDetails.phoneNumber}</p>
                <p>Address: {order.customerDetails.address}</p>
                <p>Status: {order.status}</p>
        
                <ul>
                  {order.cart.map((item) => (
                    <li key={item.id}>
                      {item.name} - Quantity: {item.quantity} - Price: {item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        
        </div>
      )}
    </div>
    </>
  );
};

export default OrderHistory;
