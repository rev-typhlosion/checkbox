import React from 'react';
import { PAYMENTS_TABLE, ChargeItem } from './PaymentsTable'
import TableRowComponent from './TableRow';
import PaymentModal from './PaymentModal';

const App: React.FC = () => {
  const [selectedPaymentIds, setSelectedPaymentIds] = React.useState<Set<number>>(new Set());
  const handleCheckboxChange = (paymentId: number) => (isChecked: boolean) => {
    const newIds = new Set(selectedPaymentIds);
    if (isChecked){
      newIds.add(paymentId);
    } else {
      newIds.delete(paymentId);
    } 
    setSelectedPaymentIds(newIds);
    console.log('newIds: ', newIds);
  }
  
  return (
    <div>
      <div className="paymentHeader">
        <h4>Payments table!</h4>
        {selectedPaymentIds.size > 0 && (
                  <PaymentModal
                  selectedPaymentIds={selectedPaymentIds}
                  payments={PAYMENTS_TABLE}
              />
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Bulk Refund</th>
            <th scope="col">Billed on</th>
            <th scope="col">Payment ID</th>
            <th scope="col">User ID</th>
            <th scope="col">Status</th>
            <th scope="col">Payment Type</th>
            <th scope="col">Product Type</th>
          </tr>
        </thead>
        <tbody>
          {PAYMENTS_TABLE.map((payment: ChargeItem) => (
            <TableRowComponent
              key={payment.id}
              payment={payment} 
              isChecked={selectedPaymentIds.has(payment.id)} 
              setIsChecked={handleCheckboxChange(payment.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

/*
import React from 'react';
import CheckboxComponent from './Checkbox'

import { PAYMENTS_TABLE, ChargeItem } from './PaymentsTable'

const App: React.FC = () => {
  return (
    <div>
      <h1>Checkboxes!</h1>
      <table>
      <tr>
        <th scope="col">Bulk Refund</th>
        <th scope="col">Payment ID</th>
        <th scope="col">User ID</th>
        <th scope="col">Status</th>
        <th scope="col">Payment Type</th>
        <th scope="col">Product Type</th>
      </tr>
        {PAYMENTS_TABLE.map((payment: ChargeItem) => (
          <tr>
            <td className="checkbox">
              <CheckboxComponent></CheckboxComponent>
            </td>
            <td>{payment.id}</td>
            <td>{payment.userId}</td>
            <td>{payment.status}</td>
            <td>{payment.paymentType}</td>
            <td>{payment.productType}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default App;
*/