import React from 'react';
import { Route, Switch} from 'react-router-dom';

import { CategoryContentPage } from '../category-content-page/category-content-page.component';
import { CategoryCreatePage } from '../category-create-page/category-create-page.component';
import { CategoryEditPage } from '../category-edit-page/category-edit-page.component';
import { NotFoundPage } from '../not-found-page/not-found-page.component';

export const CategoryPage = (props) => {
    const path = props.match.path;
    return (
        <Switch>
            <Route path={`${path}/create`} component={CategoryCreatePage}/>
            <Route path={`${path}/edit/:id`} component={CategoryEditPage}/>
            <Route path={`${path}/list`} component={CategoryContentPage}/>
            <Route component={NotFoundPage} />
        </Switch>
    );
}