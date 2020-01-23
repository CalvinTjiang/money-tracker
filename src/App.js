import React, { Component } from 'react';

import './App.css';
import './index.css';

import { SecondaryButton } from './component/secondary-button/secondary-button.component';
import { PurchaseContent } from './component/purchase-content/purchase-content.component';

class App extends Component{
  constructor(){
    super();
    this.state = {
      content: "purchase" 
    };
  }

  render() {
    return(
      <div>
        <nav id="left-nav">
          <i id="main-icon" className="material-icons icon-secondary-color">polymer</i>

          <SecondaryButton icon="attach_money">Purchases</SecondaryButton>

          <SecondaryButton icon="people">Users</SecondaryButton>

          <SecondaryButton icon="store">Stores</SecondaryButton>

          <SecondaryButton icon="category">Categories</SecondaryButton>
          <i className="material-icons icon-secondary-color icon-bottom">settings_applications</i>
        </nav>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      </div>
    );
  }
}

export default App;
