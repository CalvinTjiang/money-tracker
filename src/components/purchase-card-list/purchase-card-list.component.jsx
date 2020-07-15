import React from 'react';

import './purchase-card-list.styles.css';

export const PurchaseCardList = (props) =>{

    let icon = (
        <i class="material-icons icon-secondary-color ">
            {props.icon}
        </i>
    );

    if (props.type === "Category") {
        icon = (
            <p class="list-date">
                {props.icon}
            </p>
        );
    }

    return (
        <li class="list-group-item list-item"
            onClick={props.onClick}
        >
            {icon}
            <p class="list-text">
                {props.name}
            </p>
            <p> 
                {props.memo}
            </p>
            <p class={props.isExpense?"list-expenses":"list-income"}>
                {props.amount}
            </p>
        </li>  
    );
}
