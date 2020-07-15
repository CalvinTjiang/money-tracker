import React from 'react';
import { withRouter } from 'react-router-dom';

import { SecondaryButton } from '../secondary-button/secondary-button.component';
import { IconList } from '../icon-list/icon-list.component';

const StoreContent = (props) => {
    let selectCategory = (id) => {
        props.history.push(`edit/${id}`);
    }
        
    return (
        <div>
            <header>
                <SecondaryButton className="btn-right" icon="add"
                    onClick={()=>{
                        props.history.push('create')
                    }}>
                    Add Store
                </SecondaryButton>
            </header>
            <div id="content">
                <IconList 
                    type="Normal"
                    source="http://localhost:8080/db/stores"
                    handleChange={selectCategory}
                />
            </div>
        </div>
    );
}

export default withRouter(StoreContent);