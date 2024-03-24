import React, { useState, useEffect } from 'react';
import { getDatabase, ref as databaseRef, push, onValue } from 'firebase/database';
import { toast } from 'react-toastify';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [allproducts, setallProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [billingSuccess, setBillingSuccess] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handlePrint = () => {
    const printContent = document.getElementById('print');
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
  };

  const db = getDatabase();

  useEffect(() => {
    const productsRef = databaseRef(db, 'CafeApplication/products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        setProducts(productsArray);
        setallProducts(productsArray);
      } else {
        setProducts([]);
        setallProducts([]);
      }
    });
  }, [db]);

  const handleProductSearch = () => {
    const filteredProducts = allproducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleAddToBill = (product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);

    if (existingProduct) {
      const updatedProducts = selectedProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts((prevProducts) => [...prevProducts, { ...product, quantity: 1 }]);
    }

    setTotalSum((prevTotal) => prevTotal + parseFloat(product.price));
  };

  const handleSaveBilling = async () => {
    const billingRef = databaseRef(db, 'CafeApplication/billings');
    const newBilling = {
      products: selectedProducts,
      totalSum,
      customerName,
      customerNumber,
      timestamp: new Date().toISOString(),
    };
    await push(billingRef, newBilling);

    setBillingSuccess(true);
    setSearchQuery('');
    setProducts([]);
    setSelectedProducts([]);
    setTotalSum(0);
    setCustomerName('');
    setCustomerNumber('');

    toast.success('Bill generated successfully.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => {
      setBillingSuccess(false);
    }, 19000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="alert alert-secondary" role="alert">
        Billing Management
      </div>
      <div className="container mt-5" style={{ marginBottom: "33%" }}>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="searchQuery">Search Product:</label>
              <input
                type="text"
                className="form-control"
                id="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleProductSearch}>
              Search
            </button>
            <ul className="list-group mt-3">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {product.name} - ₹ {product.price}
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => handleAddToBill(product)}
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6" id="print">
            <a className="navbar-brand mr-5" href="#" style={{ fontSize: "30px", fontFamily: "cursive" }}>
              <img src="android-chrome-512x512.png" alt="Two Cups Cafe & Resto Logo" height={40} style={{ marginRight: "10px" }} />
              TWO CUPS CAFE & RESTO
            </a>
            <div className="alert alert-secondary" role="alert">
              <FaCalendarAlt /> {currentDateTime.toLocaleDateString()} <FaClock className='ml-2' /> {currentDateTime.toLocaleTimeString()}
              <br />
              Bill Details
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>₹ {product.price}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => {
                          const quantity = parseInt(e.target.value, 10);
                          const updatedProducts = selectedProducts.map((p) =>
                            p.id === product.id ? { ...p, quantity: quantity } : p
                          );
                          setSelectedProducts(updatedProducts);
                        }}
                      />
                    </td>
                    <td>₹ {(product.price * product.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-3">
            <strong>Total Bill: ₹ {selectedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0).toFixed(2)}</strong>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="customerName">Customer Name:</label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerNumber">Customer Number:</label>
              <input
                type="text"
                className="form-control"
                id="customerNumber"
                value={customerNumber}
                onChange={(e) => setCustomerNumber(e.target.value)}
              />
            </div>

            <button type="button" className="btn btn-success" onClick={handleSaveBilling}>
              Save Billing
            </button>

            <button type="button" className="btn btn-primary ml-2" onClick={() => handlePrint()}>
              Print
            </button>

            {billingSuccess && (
              <div className="alert alert-success mt-3" role="alert">
                Billing saved successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
