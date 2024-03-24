import React, { useState, useEffect } from 'react';
import { getDatabase, ref as databaseRef, push, update, remove,onValue } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Loader from './Loader';


const ProductManagement = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productOffer, setProductOffer] = useState('');

  const db = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    // Load products from Firebase Realtime Database
    const productsRef = databaseRef(db, 'CafeApplication/products');
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

const handleAddProduct = async () => {
    debugger
    // Upload image to Firebase Storage
    let id = Math.floor(Math.random() * 999) + 1;
    let path = productImage.name.split(".")[0]+id+"."+productImage.name.split(".")[1]
    const storageReference = storageRef(storage, `CafeApplication/product-images/${path}`);
    await uploadBytes(storageReference, productImage);

    // Get the image URL
    const imageUrl = await getDownloadURL(storageReference);

    // Add product data to Firebase Realtime Database
    const productsReference = databaseRef(db, 'CafeApplication/products');
    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      imageUrl,
      offer: productOffer,
    };
    push(productsReference, newProduct);

    // Clear form fields
    // setProductName('');
    // setProductDescription('');
    // setProductPrice('');
    // setProductImage(null);
  };

  const handleDeleteProduct = (productId) => {
    // Delete product from Firebase Realtime Database
    const productRef = databaseRef(db, `CafeApplication/products/${productId}`);
    remove(productRef);
  };

  const handleUpdateProduct = () => {
    // Update product data in Firebase Realtime Database
    const productRef = databaseRef(db, `CafeApplication/products/${selectedProductId}`);
    const updatedProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      offer: productOffer
    };
    update(productRef, updatedProduct);

    // Clear form fields and reset selectedProductId
    // setProductName('');
    // setProductDescription('');
    // setProductPrice('');
    // setSelectedProductId(null);
  };

  const handleEditProduct = (product) => {
    // Set form fields for editing
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price);
    setSelectedProductId(product.id);
  };

  return (
    <>
    <Loader></Loader>
    <div class="alert alert-secondary" role="alert">
    Product Management
</div>
    <div className="container mt-5" style={{marginBottom:"30%"}}>
      
      <div className="row">
        <div className="col-md-6">
        <div class="alert alert-secondary" role="alert">
        Add Product
    </div>
          <form>
            <div className="form-group">
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">Product Description:</label>
              <textarea
                className="form-control"
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Product Price:</label>
              <input
                type="text"
                className="form-control"
                id="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
    <label htmlFor="productOffer">Product Offer:</label>
    <input
      type="text"
      className="form-control"
      id="productOffer"
      value={productOffer}
      onChange={(e) => setProductOffer(e.target.value)}
    />
  </div>

            <div className="form-group">
              <label htmlFor="productImage">Product Image:</label>
              <input
                type="file"
                className="form-control-file"
                id="productImage"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              {selectedProductId ? (
                <button type="button" className="btn btn-warning" onClick={handleUpdateProduct}>
                  Update Product
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleAddProduct}>
                  Add Product
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="col-md-6">
        <div class="alert alert-secondary" role="alert">
         Product List
    </div>
          
          <ul className="list-group">
            {products.map((product) => (
              <li
                key={product.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {product.name}<br></br>
                Price: {product.price}
                <img src={product.imageUrl} height={100} class="rounded mx-auto d-block" alt="..."></img>
                <div>
                  <button
                    type="button"
                    className="btn btn-danger mr-2"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    </>
  );
};

export default ProductManagement;
