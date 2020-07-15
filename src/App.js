import React, { Component } from 'react';
import { withRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import './index.css';

import { SecondaryButton } from './components/secondary-button/secondary-button.component';
import { PurchasePage } from './pages/purchase-page/purchase-page.component';
import { CategoryPage } from './pages/category-page/category-page.component';
import { StorePage } from './pages/store-page/store-page.component';

class App extends Component{
    constructor(props){
        super(props);
        const today = new Date();
        this.year = today.getFullYear();
        this.month = today.getMonth();
    }
    
    render(){
        return (
            <div>
                <nav id="left-nav">
                    <i id="main-icon" className="material-icons icon-secondary-color">polymer</i>

                    <SecondaryButton icon="attach_money"
                        onClick={()=>{
                            this.props.history.push(`/purchase/list?year=${this.year}&month=${this.month}`);
                        }}>
                    Purchases
                    </SecondaryButton>

                    <SecondaryButton icon="store"
                        onClick={()=>{
                            this.props.history.push("/store/list");
                        }}>
                    Stores
                    </SecondaryButton>

                    <SecondaryButton icon="category" 
                        onClick={()=>{
                            this.props.history.push("/category/list");
                        }}>
                    Categories
                    </SecondaryButton>

                    <i className="material-icons icon-secondary-color icon-bottom"
                        onClick={()=>{
                            this.props.history.push("/setting");
                        }}>
                    settings_applications
                    </i>
                </nav>
                <Switch>
                    <Route path='/purchase' component={PurchasePage}/>
                    <Route path='/category' component={CategoryPage}/>
                    <Route path='/store' component={StorePage}/>
                    {/* 
                    <Route path='/setting' component={SettingPage}/>
                    <Route path='/' component={}/> */}
                </Switch>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            </div>
        );
    };
}

export default withRouter(App);