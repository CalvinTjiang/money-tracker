import React from 'react';
import { PurchaseCardList } from '../purchase-card-list/purchase-card-list.component';
import { PurchaseCardHeader } from '../purchase-card-header/purchase-card-header.component';
import './purchase-card.styles.css';

// List of month names
const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// List of day names
const dayList = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export const PurchaseCard = (props) =>{
    let formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD'
    });
    if (props.groupBy === "Date") {
        // Group by date
        if (props.emphasisOn === "Category") {
            // Emphasis on Category
            return (
                props.purchaseDB.map(data=>{
                    return (
                    <ul class="list-group">
                        <PurchaseCardHeader 
                            icon={data.date.day}
                            name={`${monthList[data.date.month]} ${data.date.year}`}
                            income={formatter.format(data.income)}
                            expenses={formatter.format(data.expenses)}
                            type={props.groupBy}
                        />
                        {data.purchases.map(purchase=>{
                            return (
                            <PurchaseCardList 
                                icon={purchase.category.icon}
                                name={purchase.category.name}
                                memo={`${purchase.store.name} - ${purchase.memo}`}
                                isExpense={purchase.isExpense}
                                amount={formatter.format(purchase.amount)}
                                type={props.groupBy}
                                onClick={()=>{
                                    props.handleChange(purchase._id)
                                }}
                            />
                            );
                        })}
                    </ul>
                    );
                })
            );
        }
        // Emphasis on Store
        return (
            props.purchaseDB.map(data=>{
                return (
                <ul class="list-group">
                    <PurchaseCardHeader 
                        icon={data.date.day}
                        name={`${monthList[data.date.month]} ${data.date.year}`}
                        income={formatter.format(data.income)}
                        expenses={formatter.format(data.expenses)}
                        type={props.groupBy}
                    />
                    {data.purchases.map(purchase=>{
                        return (
                        <PurchaseCardList 
                            icon={purchase.store.icon}
                            name={purchase.store.name}
                            memo={`${purchase.category.name} - ${purchase.memo}`}
                            isExpense={purchase.isExpense}
                            amount={formatter.format(purchase.amount)}
                            type={props.groupBy}
                            onClick={()=>{
                                props.handleChange(purchase._id)
                            }}
                        />
                        );
                    })}
                </ul>
                );
            })
        );
        
    }
    // Group by category
    return (
        props.purchaseDB.map(data=>{
            return(
            <ul class="list-group">
                <PurchaseCardHeader 
                    icon={data.category.icon}
                    name={data.category.name}
                    income={formatter.format(data.income)}
                    expenses={formatter.format(data.expenses)}
                    type={props.groupBy}
                />
                {data.purchases.map(purchase=>{
                    let date = new Date(purchase.date);
                    return (
                    <PurchaseCardList 
                        icon={date.getDate()}
                        name={dayList[date.getDay()]}
                        memo={`${purchase.store.name} - ${purchase.memo}`}
                        isExpense={purchase.isExpense}
                        amount={formatter.format(purchase.amount)}
                        type={props.groupBy}
                        onClick={()=>{
                            props.handleChange(purchase._id)
                        }}
                    />  
                    );
                })}
            </ul>
            );
        })
    );
}
