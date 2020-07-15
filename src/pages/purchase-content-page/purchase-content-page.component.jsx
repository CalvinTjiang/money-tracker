import React from 'react';
import queryString from 'query-string';

import PurchaseContent from '../../components/purchase-content/purchase-content.component';
import PurchaseContentHeader from '../../components/purchase-content-header/purchase-content-header.component';

export const PurchaseContentPage = (props) => {
    const query = queryString.parse(props.location.search);
    
    try {
        query.year = parseInt(query.year);
        query.month = parseInt(query.month);
        if (query.month > 11 || isNaN(query.month)){
            throw "Wrong Month";
        }
        if (query.year < 0 || isNaN(query.year)){
            throw "Wrong Year";
        }
    } catch (error) {
        const today = new Date();
        props.history.push(`show?year=${today.getFullYear()}&month=${today.getMonth()}`);
    }

    return (
        <div className="page">
            <PurchaseContentHeader 
                year={query.year} 
                month={query.month}
            />
            <PurchaseContent 
                year={query.year} 
                month={query.month}
            />
        </div>
    );
}