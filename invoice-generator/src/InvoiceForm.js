import React, { useState } from 'react';

const foodItems = [
  { name: 'Samosa', price: 25 },
  { name: 'Vadapav', price: 20 },
  { name: 'Dhokala', price: 35 },
  { name: 'Kachori', price: 18 },
  { name: 'Pohe', price: 15 },
];

const InvoiceForm = ({ onGenerate }) => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    date: '',
    items: [],
    discount: 0,
  });

  const calculateSubtotal = () => {
    return orderDetails.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * orderDetails.discount) / 100;
    const taxAmount = (subtotal * 10) / 100; // Fixed 10% tax
    return subtotal - discountAmount + taxAmount;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const addItem = () => {
    setOrderDetails({
      ...orderDetails,
      items: [...orderDetails.items, { name: '', quantity: 1, price: 0 }],
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...orderDetails.items];
    if (name === 'name') {
      const selectedItem = foodItems.find((item) => item.name === value);
      newItems[index].name = value;
      newItems[index].price = selectedItem.price;
    } else {
      newItems[index][name] = value;
    }
    setOrderDetails({ ...orderDetails, items: newItems });
  };

  const removeItem = (index) => {
    const newItems = orderDetails.items.filter((_, i) => i !== index);
    setOrderDetails({ ...orderDetails, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ ...orderDetails, invoiceNumber: `INV-${Date.now()}` });
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <label>
        Customer Name:
        <input
          type="text"
          name="customerName"
          value={orderDetails.customerName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={orderDetails.date}
          onChange={handleChange}
          required
        />
      </label>
      {orderDetails.items.map((item, index) => (
        <div key={index} className="item-row">
          <label>
            Item:
            <select
              name="name"
              value={item.name}
              onChange={(e) => handleItemChange(index, e)}
              required
            >
              <option value="">Select an item</option>
              {foodItems.map((food, i) => (
                <option key={i} value={food.name}>
                  {food.name} (₹{food.price})
                </option>
              ))}
            </select>
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              min="1"
              required
            />
          </label>
          <button type="button" onClick={() => removeItem(index)} className="remove-item-button">
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem} className="add-item-button">
        Add Item
      </button>
      <label>
        Discount (%):
        <input
          type="number"
          name="discount"
          value={orderDetails.discount}
          onChange={handleChange}
          min="0"
        />
      </label>
      <div className="total-display">
        <strong>Subtotal:</strong> ₹{calculateSubtotal().toFixed(2)}
        <br />
        <strong>Tax (10%):</strong> ₹{(calculateSubtotal() * 0.1).toFixed(2)}
        <br />
        <strong>Total:</strong> ₹{calculateTotal().toFixed(2)}
      </div>
      <button type="submit" className="generate-button">
        Generate Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;