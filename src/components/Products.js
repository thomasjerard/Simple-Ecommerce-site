import React, { useEffect, useState } from 'react';
import { db } from '../config/config';
// import '..css/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = db.collection('Products');
        const snapshot = await productsRef.get();
        const fetchedProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (productId) => {
    // Implement your logic to add the product to the cart
    console.log('Product added to cart:', productId);
  };

  return (
    <div className="product-container">
      {products.length === 0 && <p>No products are available</p>}
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <div className='product-image'>
            <img src={product.ProductImg} alt="Product" />
          </div>
          <h3>{product.ProductName}</h3>
          <p>Price: {product.ProductPrice}</p>
          <button onClick={() => addToCart(product.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;