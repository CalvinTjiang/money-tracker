import React from 'react';

import StoreCreate from '../../components/store-create/store-create.component';
export const StoreEditPage = (props) => {
    return (
        <div className="page">
            <StoreCreate 
                id={props.match.params.id}
            />
        </div>
    );
}