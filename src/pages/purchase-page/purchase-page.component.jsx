import React from 'react';
import { Route, Switch} from 'react-router-dom';

import { PurchaseCreatePage } from '../purchase-create-page/purchase-create-page.component';
import { PurchaseContentPage } from '../purchase-content-page/purchase-content-page.component';
import { PurchaseEditPage } from '../purchase-edit-page/purchase-edit-page.component';
import { NotFoundPage } from '../not-found-page/not-found-page.component';

export const PurchasePage = (props) => {
    const path = props.match.path;
    return (
        <Switch>
            <Route path={`${path}/create`} component={PurchaseCreatePage}/>
            <Route path={`${path}/edit/:id`} component={PurchaseEditPage}/>
            <Route path={`${path}/list`} component={PurchaseContentPage}/>
            <Route component={NotFoundPage} />
        </Switch>
    );
}