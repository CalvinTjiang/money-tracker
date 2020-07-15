import React from 'react';

import './total-banner.styles.css';

export const TotalBanner = (props) =>{
    return (
        <div class="total-banner">
            <p>Income</p>
            <p>Expenses</p>
            <p>Total</p>
            <p className="success">
                {props.income}
            </p>
            <p className="warning">
                {props.expenses}
            </p>
            <p className={props.type}>
                {props.total}
            </p>
        </div>
        
    );
}
