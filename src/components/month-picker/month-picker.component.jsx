import React from 'react';

import { SecondaryButton } from '../secondary-button/secondary-button.component';
import './month-picker.styles.css';

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

export const MonthPicker = (props) =>{
    let style = {
        display: "none"
    }
    if (props.show) {
        style.display = "grid";
    }

    return (
        <div class="month-picker" style={style}>
            <i 
                className="material-icons icon-secondary-color btn-icon" 
                style={{margin:"auto"}}
                onClick={()=>{
                    props.handleChange(props.year - 1, props.month)
                }}>
                keyboard_arrow_left
            </i>
            
            <div class="year-picker">{props.year}</div>

            <i 
                className="material-icons icon-secondary-color btn-icon" 
                style={{margin:"auto"}}
                onClick={()=>{
                    props.handleChange(props.year + 1, props.month)
                }}>
                keyboard_arrow_right
            </i>
            
            {monthList.map((month, index)=>{
                return (
                <SecondaryButton 
                    key={index}
                    onClick={()=>{
                        props.handleChange(props.year, index)
                    }}>
                    {month}
                </SecondaryButton>
                );
            })}
        </div>
    );
}
