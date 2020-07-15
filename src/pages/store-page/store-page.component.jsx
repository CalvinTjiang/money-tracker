import React from 'react';
import { Route, Switch} from 'react-router-dom';

import { StoreContentPage } from '../store-content-page/store-content-page.component';
import { StoreCreatePage } from '../store-create-page/store-create-page.component';
import { StoreEditPage } from '../store-edit-page/store-edit-page.component';
import { NotFoundPage } from '../not-found-page/not-found-page.component';

export const StorePage = (props) => {
    const path = props.match.path;
    return (
        <Switch>
            <Route path={`${path}/create`} component={StoreCreatePage}/>
            <Route path={`${path}/edit/:id`} component={StoreEditPage}/>
            <Route path={`${path}/list`} component={StoreContentPage}/>
            <Route component={NotFoundPage} />
        </Switch>
    );
}