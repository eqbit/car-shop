import * as React from 'react';
import './styles/index.scss'
import Cars from './containers/cars/cars-container';

export const App: React.FC = () => {
    return (
        <div className="container">
            <Cars/>
        </div>
    );
};
