import React, { useState, useEffect } from 'react';
import { getDatabase, ref as databaseRef, onValue, update } from 'firebase/database';
import Loader from './Loader';

const AllOrder = () => {


  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const db = getDatabase();
    const ordersRef = databaseRef(db, 'CafeApplication/orders');

    try {
      // Fetch all orders
      onValue(ordersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const ordersArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
          setOrders(ordersArray);
          console.log(ordersArray);
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

  const handleStatusChange = (orderId, newStatus) => {
    const db = getDatabase();
    const orderRef = databaseRef(db, `CafeApplication/orders/${orderId}`);

    // Update the status in Firebase
    update(orderRef, { status: newStatus });
  };

  return (
    <>
      <Loader></Loader>
      <div className="alert alert-secondary" role="alert">
        Orders
      </div>
      <div className="container mt-5" style={{ marginBottom: '30%' }}>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        {orders.length > 0 && (
          <div className="mt-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Timestamp</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cart Details</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.timestamp}</td>
                    <td>{order.customerDetails.name}</td>
                    <td>{order.customerDetails.phoneNumber}</td>
                    <td>{order.customerDetails.address}</td>
                    <td>{order.status}</td>
                    <td>
                      <ul>
                        {order.cart.map((item) => (
                          <li key={item.id}>
                            {item.name} - {item.quantity} x ₹ {item.price}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <select
                        className="form-control"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Cooking</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </>
  );
};

export default AllOrder;
