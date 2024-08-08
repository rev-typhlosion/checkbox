import React from 'react';
import CheckboxComponent from './Checkbox';
import { ChargeItem } from './PaymentsTable';


interface PaymentProps {
    payment: ChargeItem;
    isChecked: boolean;
    setIsChecked: (newValue: boolean) => void;
}

const TableRowComponent: React.FC<PaymentProps> = ({ payment, isChecked, setIsChecked }) => {
    return (
        <tr>
            <td className="checkbox">
                <CheckboxComponent isChecked={isChecked} setIsChecked={setIsChecked}/>
            </td>
            <td>{payment.id}</td>
            <td>{payment.userId}</td>
            <td>{payment.status}</td>
            <td>{payment.paymentType}</td>
            <td>{payment.productType}</td>
        </tr>
    );
};

export default TableRowComponent;
