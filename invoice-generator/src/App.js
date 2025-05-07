import React, { useState } from 'react';
import InvoiceForm from './InvoiceForm';
import InvoiceDisplay from './InvoiceDisplay';
import './App.css';

const App = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  const handleGenerate = (details) => {
    setOrderDetails(details);
  };

  return (
    <div className="container">
      <h1>Food Stall Invoice Generator</h1>
      <InvoiceForm onGenerate={handleGenerate} />
      {orderDetails && <InvoiceDisplay orderDetails={orderDetails} />}
      <footer className="footer">
        <p>Contact us: +91 1234567890 | foodstall@example.com</p>
      </footer>
    </div>
  );
};

export default App;