import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import LoginScreen from './Loginscreen';
import UploadPage from './UserPage';

import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


class App extends Component {


    constructor(props) {
        super(props);
        this.state={
            loginPage:[],
            userScreen:[]
        }
    }

    /* We have set loginscreen as default page in componentWillMount method 
    and passed context of app as ‘parentContext’ prop to loginscreen. 
    This same props was passed down to login component as appContext prop 
    which we used to change state variables of App.js from login */
    componentWillMount() {

        var loginPage =[];
        loginPage.push(<LoginScreen appContext={this}/>);

        this.setState({
            loginPage:loginPage
        })

    }

    render() {
        return (
            <div className="App">
                {this.state.loginPage}
                {this.state.userScreen}
            </div>
        );
    }

}

const style = {
    margin: 15,
};


export default App;

