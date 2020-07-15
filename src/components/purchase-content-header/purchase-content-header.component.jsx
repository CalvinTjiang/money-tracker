import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Date Picker Component
import { SecondaryButton } from '../secondary-button/secondary-button.component';
import { MonthPicker } from '../month-picker/month-picker.component';


import './purchase-content-header.styles.css';

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

class PurchaseContentHeader extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            monthPicker: false,
        };
    }

    render() {
        return (
            <div>
                <header>
                    <SecondaryButton 
                        className="btn-left" 
                        onClick={()=>{
                            this.setState((prevState, prevProps)=>{
                                return {monthPicker: !prevState.monthPicker}
                            });
                        }}>
                        {monthList[this.props.month] + " " + this.props.year}
                    </SecondaryButton>

                    <SecondaryButton className="btn-right" icon="add"
                        onClick={()=>{
                            this.props.history.push('create')
                        }}>
                        Add Purchase
                    </SecondaryButton>
                </header>

                <MonthPicker
                    year={this.props.year}
                    month={this.props.month}
                    show={this.state.monthPicker}
                    handleChange={(year, month)=>{
                        this.props.history.push(`list?year=${year}&month=${month}`);
                        }}
                />
            </div>
        );
    }
}


export default withRouter(PurchaseContentHeader);