
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoiceDisplay = ({ orderDetails }) => {
  const calculateSubtotal = () => {
    return orderDetails.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * orderDetails.discount) / 100;
    const taxAmount = (subtotal * 10) / 100; // Fixed 10% tax
    return subtotal - discountAmount + taxAmount;
  };

  const generatePDF = () => {
    const input = document.getElementById('invoice');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('food-stall-invoice.pdf');
    });
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="invoice-display">
      <div id="invoice">
        <h2>Food Stall Invoice</h2>
        <p><strong>Invoice Number:</strong> {orderDetails.invoiceNumber}</p>
        <p><strong>Customer Name:</strong> {orderDetails.customerName}</p>
        <p><strong>Date:</strong> {orderDetails.date}</p>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price (per item)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td>₹{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><strong>Subtotal:</strong> ₹{calculateSubtotal().toFixed(2)}</p>
        <p><strong>Discount:</strong> {orderDetails.discount}%</p>
        <p><strong>Tax (10%):</strong> ₹{(calculateSubtotal() * 0.1).toFixed(2)}</p>
        <p><strong>Grand Total:</strong> ₹{calculateTotal().toFixed(2)}</p>
      </div>
      <div className="invoice-actions">
        <button onClick={generatePDF} className="download-button">
          Download Invoice
        </button>
        <button onClick={printInvoice} className="print-button">
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceDisplay;
