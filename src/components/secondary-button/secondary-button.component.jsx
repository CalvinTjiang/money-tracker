import React from 'react';

import './secondary-button.styles.css';

export const SecondaryButton = (props) =>{

    let className = "btn btn-secondary-color ";
    // Check for additional className
    if (props.className !== undefined){
        className += props.className;
    }

    // Check for icon properties
    if (props.icon === undefined) {
        return (
            <button className={className} onClick={props.onClick}>
                <a className="btn-text">{props.children}</a>
            </button>
        );
    }

    return (
        <button className={className} onClick={props.onClick} style={props.style}>
            <i className="material-icons icon-secondary-color">{props.icon}</i>
            <a className="btn-text">{props.children}</a>
        </button>
    );
}
