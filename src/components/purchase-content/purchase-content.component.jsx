
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Date Picker Component
import { PurchaseCard } from '../purchase-card/purchase-card.component';
import { TotalBanner } from '../total-banner/total-banner.component';

// Dropdown component
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import './purchase-content.styles.css';


class PurchaseContent extends Component {
    constructor(props){
        super(props);
        
        // Currency formatter
        this.formatter = new Intl.NumberFormat('en-US',{
            style: 'currency',
            currency: 'USD'
        });

        this.state = {
            purchaseDB: [],
            monthPicker: false,
            info: {
                income: 0,
                expenses: 0,
                total: 0,
            },
            groupBy: "Date",
            emphasisOn: "Category",
            isLoaded: false,
            error: ""
        };
    }
    
    componentDidMount(){    
        this.fetchData();
    }

    componentDidUpdate(prevProps){
        if (prevProps.month !== this.props.month || prevProps.year !== this.props.year){
            this.fetchData();
        }
    }

    fetchData = ()=>{
        let queryString = `?month=${this.props.month}&year=${this.props.year}&groupBy=${this.state.groupBy}`;
        fetch(`http://localhost:8080/db/purchases${queryString}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    purchaseDB: result,
                    isLoaded: true
                }, ()=>{
                    let info = {
                        income : 0,
                        expenses: 0,
                        total: 0
                    }
                    this.state.purchaseDB.forEach((group)=>{
                        info.income += group.income;
                        info.expenses -= group.expenses
                    })
                    info.total = info.income + info.expenses;
                    this.setState({info});
                });
            },
            (error) => {
                this.setState({
                    purchaseDB: [],
                    isLoaded: true,
                    error
                });
            })
    }

    selectPurchase = (id) => {
        this.props.history.push(`edit/${id}`)
    }

    render() {        
        let groupBy = "";
        if (this.state.groupBy === "Date"){
            groupBy = (
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className={`btn btn-secondary-color ${this.state.emphasisOn === "Category"?"btn-active":""}`}
                    onClick={()=>{
                        this.setState({emphasisOn: "Category"})
                    }}> Category
                </label>

                <label className={`btn btn-secondary-color ${this.state.emphasisOn === "Store"?"btn-active":""}`}
                    onClick={()=>{
                        this.setState({emphasisOn: "Store"})
                    }}> Store
                </label>
            </div>
            );
        }
        return (
            <div id="content">
                <div id="sort-menu">
                    <DropdownButton id="dropdown-basic-button" title={`Group by ${this.state.groupBy}`}>
                        <Dropdown.Item 
                            onClick={()=>{
                                if (this.state.groupBy !== "Date"){
                                    this.setState({
                                        groupBy: "Date",
                                        isLoaded: false
                                    }, ()=>{
                                        this.fetchData();
                                    })
                                }
                            }}>
                            Date
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={()=>{
                                if (this.state.groupBy !== "Category"){
                                    this.setState({
                                        groupBy: "Category",
                                        isLoaded: false
                                    },()=>{
                                        this.fetchData();
                                    })
                                }
                            }}>
                            Category
                        </Dropdown.Item>
                    </DropdownButton>
                    {groupBy}
                </div>
                <TotalBanner
                    income={this.formatter.format(this.state.info.income)}
                    expenses={this.formatter.format(this.state.info.expenses)}
                    type={this.state.info.total>=0?"success":"warning"}
                    total={this.formatter.format(this.state.info.total)}
                />
                {this.state.isLoaded?
                <PurchaseCard
                    groupBy={this.state.groupBy}
                    emphasisOn={this.state.emphasisOn}
                    purchaseDB={this.state.purchaseDB}
                    handleChange={this.selectPurchase}
                />:""}
                
            </div>
        );
    }
}

export default withRouter(PurchaseContent);