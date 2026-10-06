import React, { useContext } from 'react';
import './CheckoutPage.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assests/cart_cross_icon.png';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [city, setCity] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [upiId, setUpiId] = React.useState('');

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]{0,10}$/; // Update the regular expression to allow up to 10 digits
    if (regex.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleUpiIdChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9A-Za-z.-]{2,256}@[0-9A-Za-z.-]{2,64}$/; // Update the regular expression to match the correct format of a UPI ID
    if (regex.test(value)) {
      setUpiId(value);
    }
  };

  const handlePlaceOrder = async () => {
    if (!phoneNumber || !city || !address || !cartItems || !all_product ) {
      alert('Please fill in all required fields and add products to your cart before placing an order.');
      return;
    }

    try {
      // Prepare the order data
      const orderData = {
        phoneNumber,
        city,
        address,
        cartItems: Object.keys(cartItems).map(key => ({ productId: key, quantity: cartItems[key] })),
        upiId
      };

      // Send a POST request to the server to place the order
      await fetch('/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again later.');
    }
  };

  const renderProducts = () => {
    if (!all_product || !cartItems) {
      return null;
    }

    return Object.keys(cartItems).map((key) => {
      if (cartItems[key] > 0) {
        const product = all_product.find((p) => p.id.toString() === key);
        if (product) {
          return (
            <div key={product.id} className="checkout-product">
              <div className="checkout-product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="checkout-product-info">
                <h3>{product.name}</h3>
                <p>Quantity: {cartItems[key]}</p>
              </div>
              
              <button type="button" onClick={() => removeFromCart(product.id)}>
                <img className='cartitems-remove-icon' src={remove_icon} alt="Remove" />
              </button>
            </div>
          );
        }
      }
      return null;
    });
  };

  return (
    <div className='checkoutpage'>
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-products">
          {renderProducts()}
        </div>
        <div className="checkout-summary">
          <div className="checkout-summary-item">
            <h3>Subtotal</h3>
            <p>${getTotalCartAmount()}</p>
          </div>
          <div className="checkout-summary-item">
            <h3>Shipping Fee</h3>
            <p>Free</p>
          </div>
          <div className="checkout-summary-item">
            <h3>Total</h3>
            <p>${getTotalCartAmount()}</p>
          </div>
          <div className="checkout-form">
            <label htmlFor="phone-number">Phone Number:</label>
            <input type="text" id="phone-number" value={phoneNumber} onChange={handlePhoneNumberChange} />
            <label htmlFor="city">City:</label>
            <input type="text" id="city" value={city} onChange={handleCityChange} />
            <label htmlFor="address">Address:</label>
            <textarea id="address" value={address} onChange={handleAddressChange} />
            <label htmlFor="upiId">UPI ID:</label>
            <input type="text" id="upiId" value={upiId} onChange={handleUpiIdChange} />
          </div>
          <div className="checkout-summary-actions">
            <Link to="/cart" className="checkout-summary-back-to-cart">Back to Cart</Link>
            <button type="submit" className="checkout-summary-place-order" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;