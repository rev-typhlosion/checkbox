import React from 'react';

interface CheckboxProps {
    isChecked: boolean;
    setIsChecked: (newValue: boolean) => void;
}

const ChecboxComponent: React.FC<CheckboxProps> = ({ isChecked, setIsChecked }) => {


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            />
            <label></label>
        </div>
    );
};

export default ChecboxComponent;

/*
import React from 'react';

const ChecboxComponent: React.FC = () => {
    const [isChecked, setIsChecked] = React.useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div>
            <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            />
            <label></label>
        </div>
    );
};

export default ChecboxComponent;
*/