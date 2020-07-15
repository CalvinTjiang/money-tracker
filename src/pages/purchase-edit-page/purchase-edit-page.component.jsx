import React from 'react';

import PurchaseCreate from '../../components/purchase-create/purchase-create.component';

export const PurchaseEditPage = (props) =>{

    return (
        <div className="page">
            <PurchaseCreate 
                id={props.match.params.id}
            />
        </div>
    );
}