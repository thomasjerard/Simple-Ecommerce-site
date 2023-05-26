import React, { useState } from 'react';
import { storage, db } from '../config/config'; // Import the necessary Firebase configurations
import {useNavigate} from 'react-router-dom'; 


const AddProducts = () => {
  const navigate = useNavigate(); // Instantiate the useHistory hook
  const [ProductName, setProductName] = useState('');
  const [ProductPrice, setProductPrice] = useState(0);
  const [ProductImg, setProductImg] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Upload product image to Firebase Storage
      const storageRef = storage.ref();
      const fileRef = storageRef.child(ProductImg.name);
      const uploadTask = fileRef.put(ProductImg);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
           // Get the download URL of the uploaded image
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            // Save the product details and image URL to Firestore
            db.collection('Products').add({
              ProductName: ProductName,
              ProductPrice: ProductPrice,
              ProductImg: downloadURL,
            });

            // Clear the form fields after submitting
            setProductName('');
            setProductPrice('');
            setProductImg(null);
            setUploadProgress(0);
            setIsSuccess(true); // Set isSuccess to true upon successful completion

          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setProductImg(event.target.files[0]);
    }
  };

  if(isSuccess) {
    navigate('/home')
  }

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="ProductName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ProductName"
            value={ProductName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ProductPrice" className="form-label">
            ProductPrice
          </label>
          <input
            type="number"
            className="form-control"
            id="ProductPrice"
            value={ProductPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ProductImg" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            id="ProductImg"
            onChange={handleFileChange}
            required
          />
        </div>
        {uploadProgress > 0 && (
          <div className="mb-3">
            <progress value={uploadProgress} max="100" />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
