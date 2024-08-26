import React from 'react';
import CheckboxComponent from './Checkbox';
import { ChargeItem } from './PaymentsTable';


interface PaymentProps {
    payment: ChargeItem;
    isChecked: boolean;
    setIsChecked: (newValue: boolean) => void;
}

const TableRowComponent = ({ payment, isChecked, setIsChecked }: PaymentProps) => {
    const shouldRenderCheckbox = payment.status === "Completed" && payment.paymentType !== "Apple";

    return (
        <tr>
            <td className="checkbox">
                {shouldRenderCheckbox ? (
                    <CheckboxComponent 
                        isChecked={isChecked} 
                        setIsChecked={setIsChecked} 
                    />
                ) : null
            }
            </td>
            <td>{payment.billedOn.toLocaleDateString()} {payment.billedOn.toLocaleTimeString()}</td>
            <td>{payment.id}</td>
            <td>{payment.userId}</td>
            <td>{payment.status}</td>
            <td>{payment.paymentType}</td>
            <td>{payment.productType}</td>
        </tr>
    );
};

export default TableRowComponent;
