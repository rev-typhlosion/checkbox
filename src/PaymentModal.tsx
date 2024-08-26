import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDebounce } from 'use-debounce';

interface Payment {
  id: number;
  billedOn: Date;
  productType: string;
}

interface PaymentModalProps {
  selectedPaymentIds: Set<number>;
  payments: Payment[];
}

interface ModalTableProps {
  payments: Payment[];
}

interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // change later
}

interface FormProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const FormField: React.FC<FormProps> = ({ label, value, onChange }) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    console.log(newValue);
  };

  return (
    <form>
      <div className="form-group">
        <label>{label}</label>
        <input 
          type="text"
          className="form-control"
          value={value}
          onChange={handleInputChange} // Single input handler
          placeholder="Ticket number, reason..."
        />
      </div>
    </form>
  );
};

const ModalTable: React.FC<ModalTableProps> = ({ payments }) => (
  <div className="modal-table-container">
    <table className="modal-table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Payment ID</th>
          <th scope="col">Product Type</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr key={payment.id} className="payment-item">
            <td>{payment.billedOn.toLocaleDateString()} {payment.billedOn.toLocaleTimeString()}</td>
            <td>{payment.id}</td>
            <td>{payment.productType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Dropdown: React.FC<DropdownProps> = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    console.log(value);
  
  };

  return (
    <div>
      <label htmlFor="dropdown">{label}</label>
      <select
        className="form-select"
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        style={{ color: selectedOption === '' ? 'grey' : 'black' }}
      >
        <option value="" disabled hidden>
          Select...
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const reasonOptions = [
  { value: 'fraudulent', label: 'Fraudulent' },
  { value: 'unauthorized', label: 'Unauthorized Transaction' },
  { value: 'remorse', label: 'Buyer\'s Remorse' },
  { value: 'wrongPurchase', label: 'Wrong Purchase' },
  { value: 'confusion', label: 'User Confusion' },
  { value: 'tos', label: 'ToS Violation' },
  { value: 'forgot', label: 'Forgot to Cancel' },
  { value: 'trial', label: 'Unwanted Trial Renewal' },
];

const PaymentModal: React.FC<PaymentModalProps> = ({ selectedPaymentIds, payments }) => {
  const [show, setShow] = useState(false);
  const [formValue, setFormValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectedPaymentIdsArray = Array.from(selectedPaymentIds);
  const selectedPayments = payments.filter(payment =>
    selectedPaymentIdsArray.includes(payment.id)
  );

  const handleFormChange = (value: string) => {
    setFormValue(value);
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Checkbox Refund
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Checkbox Refund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal-p">These are the charges that will be refunded:</p>
          <ModalTable payments={selectedPayments} />
          <Dropdown 
            label="Reason" 
            options={reasonOptions} 
            onChange={handleDropdownChange}
          /> <br />
          <FormField 
            label="Additional Info" 
            value={formValue} 
            onChange={handleFormChange} 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close without refunding
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Refund
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentModal;
