// src/components/CheckoutForm.jsx - Professional checkout form with email integration

"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CheckoutForm({ onClose }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    // Contact
    email: '',
    
    // Delivery
    country: 'Pakistan',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    saveInfo: false,
    
    // Shipping method
    shippingMethod: 'standard',
    
    // Billing
    sameAsShipping: true,
    billingCountry: 'Pakistan',
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingPostalCode: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const sendEmailNotification = async (orderData) => {
    try {
      // Using EmailJS service (you'll need to set this up)
      const templateParams = {
        to_email: 'raza.softwarearchitect@gmail.com', // Replace with your Gmail
        from_email: orderData.email,
        customer_name: `${orderData.firstName} ${orderData.lastName}`,
        customer_email: orderData.email,
        customer_address: `${orderData.address}, ${orderData.city}, ${orderData.country}`,
       order_items: cartItems.map(item => 
  `Article: ${item.article} | ${item.name} | Size: ${item.size} | Qty: ${item.quantity} | $${(item.price * item.quantity).toFixed(2)}`
).join('\n'),
        order_total: cartTotal.toFixed(2),
        shipping_method: orderData.shippingMethod,
        order_date: new Date().toLocaleDateString(),
      };

      // For now, we'll use a simple fetch to a serverless function
      // You can replace this with EmailJS, Nodemailer, or any email service
      const response = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateParams),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      // Still allow order to complete even if email fails
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Send email notification
      await sendEmailNotification(formData);
      
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('Order placed successfully! You will receive a confirmation email shortly.');
      clearCart();
      onClose();
    } catch (error) {
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = cartTotal;
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex">
          {/* Left side - Form */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">LUSTCRAFT</h1>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact */}
              <div>
                <div className="flex justify-between items-center mb-4">
                 
                 
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email or mobile phone number"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Delivery */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Delivery</h2>
                <div className="space-y-4">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="UAE">UAE</option>
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name (optional)"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal code (optional)"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm">Save this information for next time</span>
                  </label>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Shipping method</h2>
                <div className="border border-gray-300 rounded-md p-4">
                  <label className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span>Standard</span>
                    </div>
                    <span className="font-semibold">FREE</span>
                  </label>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Payment</h2>
                <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-gray-600">Your order is free. No payment is required.</p>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Billing address</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border rounded-md">
                    <input
                      type="radio"
                      name="billingAddress"
                      checked={formData.sameAsShipping}
                      onChange={() => setFormData(prev => ({ ...prev, sameAsShipping: true }))}
                      className="mr-3"
                    />
                    <span>Same as shipping address</span>
                  </label>
                  
                  <label className="flex items-center p-3 border rounded-md bg-blue-50 border-blue-300">
                    <input
                      type="radio"
                      name="billingAddress"
                      checked={!formData.sameAsShipping}
                      onChange={() => setFormData(prev => ({ ...prev, sameAsShipping: false }))}
                      className="mr-3"
                    />
                    <span>Use a different billing address</span>
                  </label>
                </div>

                {/* Different billing address form */}
                {!formData.sameAsShipping && (
                  <div className="mt-4 space-y-4 p-4 bg-blue-50 rounded-md">
                    <select
                      name="billingCountry"
                      value={formData.billingCountry}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-3"
                    >
                      <option value="Pakistan">Pakistan</option>
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="billingFirstName"
                        placeholder="First name (optional)"
                        value={formData.billingFirstName}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md px-3 py-3"
                      />
                      <input
                        type="text"
                        name="billingLastName"
                        placeholder="Last name"
                        value={formData.billingLastName}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md px-3 py-3"
                      />
                    </div>

                    <input
                      type="text"
                      name="billingAddress"
                      placeholder="Address"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-3"
                    />

                    <input
                      type="text"
                      name="billingApartment"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={formData.billingApartment}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-3"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="billingCity"
                        placeholder="City"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md px-3 py-3"
                      />
                      <input
                        type="text"
                        name="billingPostalCode"
                        placeholder="Postal code (optional)"
                        value={formData.billingPostalCode}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md px-3 py-3"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Complete Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-md font-semibold text-white transition ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Complete order'}
              </button>

              {/* Privacy Policy */}
              <div className="text-center">
                <a href="#" className="text-blue-600 text-sm underline">Privacy policy</a>
              </div>
            </form>
          </div>

          {/* Right side - Order Summary */}
          <div className="w-80 bg-gray-50 p-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
  <div key={`${item._id}-${item.size}`} className="flex items-center gap-3">
    <div className="relative">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded border"
        />
      )}
      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {item.quantity}
      </span>
    </div>
    <div className="flex-1">
      <p className="font-medium text-sm">{item.article} - {item.name}</p>
      <p className="text-xs text-gray-600">Size: {item.size}</p>
    </div>
    <div className="text-right">
      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  </div>
))}

              {/* {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <div className="relative">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border"
                      />
                    )}
                    <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name || 'Product'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">FREE</p>
                  </div>
                </div>
              ))} */}
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>
                    <span className="text-sm text-gray-500 mr-1">USD</span>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}