import React, { Component } from 'react';

import './icon-list.styles.css';

export class IconList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            iconList: [],
            isLoaded: false,
            error: ''
        }
    }

    componentDidMount(){
        if (this.props.type !== "Material-Icon"){
            fetch(this.props.source)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({iconList : result});
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
            const icons = require("./icons.json")
            this.setState({iconList : icons});
            
        }
    }
    render () {
        if (this.props.type === "Material-Icon"){
            return (
                this.state.iconList.map((icon)=>{
                    return(
                        <div className="wow">
                            <h2>{icon.category}</h2>
                            <div class="item-list item-list-crowd">
                            {icon.icons.map((name)=>{
                                return (
                                    <span 
                                        class={`item ${name === this.props.selected ? "item-selected": ""}`}
                                        key={name}
                                        onClick={()=>{
                                            this.props.handleChange(name)
                                        }}>
                                        <i class="material-icons icon-secondary-color size-big">{name}</i>
                                    </span>
                                );
                            })}
                            </div>
                        </div>
                    );
                })
            );
        }
        else{
            return (
                <div class="item-list">
                    {this.state.iconList.map((data)=>{
                        return (
                            <span 
                                class={`item ${data._id === this.props.selected ? "item-selected": ""}`}
                                key={data._id}
                                onClick={()=>{
                                    this.props.handleChange(data._id)
                                }}>
                                <i class="material-icons icon-secondary-color ">{data.icon}</i>
                                <p>{data.name}</p>
                            </span>
                        );
                    })}
                </div>
            );
        }
        
    }
}
