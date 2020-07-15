
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Date Picker Component
import { SecondaryButton } from '../secondary-button/secondary-button.component';
import { IconList } from '../icon-list/icon-list.component';


import Form from 'react-bootstrap/Form';

import './purchase-create.styles.css';
import Col from 'react-bootstrap/Col';

const dateFormatter = (d)=>{
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    if (date < 10){
        date = `0${date}`;
    }
    if (month < 10){
        month = `0${month}`;
    }
    return `${year}-${month}-${date}`;
}

class PurchaseCreate extends Component {
    constructor(props){
        super(props);

        this.state = {
            action: "BACK",
            isLoaded: false,
            error: "",

            // Selected Purchase
            _id: this.props.id,
            date: dateFormatter(new Date()),
            isExpense: true,
            category: "",
            store: "",
            amount: 0,
            memo: ""
        };
    }

    componentDidMount() {
        if (this.props.id !== undefined){
            // Fetch Data
            fetch(`http://localhost:8080/db/purchases/${this.props.id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        const {date, isExpense, category, store, amount, memo} = result;
                        this.setState({
                            action: "EDIT",
                            isLoaded: true,
                            date: dateFormatter(new Date(result.date)),
                            isExpense,
                            category,
                            store,
                            amount,
                            memo,
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                      this.setState({
                        isLoaded: true,
                        error
                      });
                    }
                )
        }
        else {
            this.setState({
                action: "CREATE"
            });
        }
    }

    back() {
        switch(this.state.action){
            case "EDIT":
                fetch(`http://localhost:8080/db/purchases/${this.props.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type' :'application/json'
                    },
                    body: JSON.stringify({
                        'date': new Date(this.state.date),
                        'isExpense': this.state.isExpense,
                        'category': this.state.category,
                        'store': this.state.store,
                        'amount': this.state.amount,
                        'memo': this.state.memo
                    })
                }).then((result)=>{
                    this.props.history.goBack();
                })
                break;

            case "CREATE":
                fetch("http://localhost:8080/db/purchases", {
                    method: "POST",
                    headers: {
                        'Content-Type' :'application/json'
                    },
                    body: JSON.stringify({
                        'date': new Date(this.state.date),
                        'isExpense': this.state.isExpense,
                        'category': this.state.category,
                        'store': this.state.store,
                        'amount': this.state.amount,
                        'memo': this.state.memo
                    })
                }).then((result)=>{
                    this.props.history.goBack()
                })
                break;
            
            case "DELETE":
                fetch(`http://localhost:8080/db/purchases/${this.props.id}`, {
                    method: "DELETE",
                }).then((result)=>{
                    this.props.history.goBack()
                })
                break;

            default:
                this.props.history.goBack();
                break;
        }
    }

    render() {
        let buttonRight = "";
        if (this.props.id !== undefined){
            buttonRight = (
                <SecondaryButton className="btn-right" icon="delete" 
                    onClick={()=>{
                        this.setState({action: "DELETE"},()=>{
                            this.back();
                        })
                    }}>
                    Delete
                </SecondaryButton>
            );
        }
        return (
            <div>
                <header> 
                    <SecondaryButton className="btn-left" icon="undo" 
                        onClick={()=>{
                            this.setState({action: "BACK"},()=>{
                                this.back();
                            })
                        }}>
                        Back
                    </SecondaryButton>

                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className={`btn btn-secondary-color ${this.state.isExpense?"btn-active":""}`}
                            onClick={()=>{
                                this.setState({isExpense: true})
                            }}> Expenses
                        </label>

                        <label className={`btn btn-secondary-color ${!this.state.isExpense?"btn-active":""}`}
                            onClick={()=>{
                                this.setState({isExpense: false})
                            }}> Income
                        </label>
                    </div>
                    
                    {buttonRight}
                </header>

                <div id="content">
                    <h2>Category</h2>
                    <IconList 
                        type="Normal"
                        source="http://localhost:8080/db/categories"
                        selected={this.state.category}
                        handleChange={(id)=>{
                            this.setState({category: id})
                        }}
                    />

                    <h2>Store</h2>
                    <IconList 
                        type="Normal"
                        source="http://localhost:8080/db/stores"
                        selected={this.state.store}
                        handleChange={(id)=>{
                            this.setState({store: id})
                        }}
                    />

                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date"value={this.state.date}
                                onChange={(e)=>{
                                    this.setState({date: e.target.value})
                                }}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="number"
                                    placeholder="0.00"
                                    value={this.state.amount}
                                    onChange={(e)=>{
                                        this.setState({amount: parseInt(e.target.value)})
                                }}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Label>Memo</Form.Label>
                            <Form.Control as="textarea" rows="3"
                                placeholder="Memo"
                                value={this.state.memo}
                                onChange={(e)=>{
                                    this.setState({memo: e.target.value})
                            }} />
                        </Form.Group>
                    </Form>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto"
                    }}>
                        <SecondaryButton icon="save" 
                            style={{
                                gridColumn: "2/3"
                            }}
                            onClick={()=>{
                                this.back();
                            }}>
                            Save
                        </SecondaryButton>
                    </div>
                </div>             
            </div>
        );
    }
}

export default withRouter(PurchaseCreate);