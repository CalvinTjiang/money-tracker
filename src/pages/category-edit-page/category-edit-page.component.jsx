import React from 'react';

import CategoryCreate from '../../components/category-create/category-create.component';
export const CategoryEditPage = (props) => {
    return (
        <div className="page">
            <CategoryCreate 
                id={props.match.params.id}
            />
        </div>
    );
}