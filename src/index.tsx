import React, { useState, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const App = lazy(() => import('./App'));

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>,
  document.getElementById('root')
);

const ChecboxComponent: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);

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
            <label>Checkbox label</label>
        </div>
    );
};

export default ChecboxComponent;