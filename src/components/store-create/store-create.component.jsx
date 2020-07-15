import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SecondaryButton } from '../secondary-button/secondary-button.component';
import { IconList } from '../icon-list/icon-list.component';

import Form from 'react-bootstrap/Form';
class StoreCreate extends Component {
    constructor(props){
        super(props);

        this.state = {
            action: "BACK",
            isLoaded: false,
            error: "",

            // Selected Category
            _id: this.props.id,
            icon: "",
            name: "",
            memo: ""
        };
    }

    componentDidMount() {
        if (this.props.id !== undefined){
            // Fetch Data
            fetch(`http://localhost:8080/db/stores/${this.props.id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            action: "EDIT",
                            icon: result.icon,
                            name: result.name,
                            memo: result.memo
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

    back(){
        switch(this.state.action){
            case "EDIT":
                fetch(`http://localhost:8080/db/stores/${this.props.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type' :'application/json'
                    },
                    body: JSON.stringify({
                        'name': this.state.name,
                        'icon': this.state.icon,
                        'memo': this.state.memo
                    })
                }).then((result)=>{
                    this.props.history.goBack();
                })
                break;

            case "CREATE":
                fetch("http://localhost:8080/db/stores", {
                    method: "POST",
                    headers: {
                        'Content-Type' :'application/json'
                    },
                    body: JSON.stringify({
                        'name': this.state.name,
                        'icon': this.state.icon,
                        'memo': this.state.memo
                    })
                }).then((result)=>{
                    this.props.history.goBack()
                })
                break;
            
            case "DELETE":
                fetch(`http://localhost:8080/db/stores/${this.props.id}`, {
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
                    {buttonRight}
                    
                </header>

                <div id="content">

                    <IconList 
                        type="Material-Icon"
                        selected={this.state.icon}
                        handleChange={(iconName)=>{
                            this.setState({icon: iconName})
                    }}/>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={(e)=>{
                                    this.setState({name: e.target.value})
                            }}/>
                        </Form.Group>
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
                        <SecondaryButton icon="save" style={{
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

export default withRouter(StoreCreate);