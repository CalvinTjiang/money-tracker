import React from 'react';

import './purchase-card-header.styles.css';

export const PurchaseCardHeader = (props) =>{

    let icon = (
        <p class="list-header-date">
            {props.icon}
        </p>
    );

    if (props.type === "Category") {
        icon = (
            <i class="material-icons icon-secondary-color list-header-icon">
                {props.icon}
            </i>
        );
    }

    return (
        <li class="list-group-item list-header">
            {icon}
            <p class="list-header-month">
                {props.name}
            </p>
            <p class="list-income">
                {props.income}
            </p>
            <p class="list-expenses">
                {props.expenses}
            </p>
        </li>
    );
}
