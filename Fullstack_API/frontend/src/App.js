import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

import './App.css';
import Loginscreen from './LoginScreen';
//import UserPage from './UserPage';


class App extends Component {


    constructor(props) {

        super(props);

        this.state={
            loginPage:[]
        }
    }

    /* We have set loginscreen as default page in componentWillMount method 
    and passed context of app as ‘parentContext’ prop to loginscreen. 
    This same props was passed down to login component as appContext prop 
    which we used to change state variables of App.js from login */
    componentWillMount() {

        var loginPage =[];
        loginPage.push(<Loginscreen appContext={this}/>);

        this.setState({
            loginPage:loginPage
        })
    }

    render() {

      return (
          <div className="App">
              {this.state.loginPage}
          </div>
      );
    }

}

const style = {
  margin: 15,
};

export default App;

