import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';


class Loginscreen extends Component {


  constructor(props) {

      super(props);

      this.state={
          username:'',
          password:'',
          loginscreen:[],
          loginmessage:'',
          buttonLabel:'Register',
          isLogin:true
    }
  }


  /* Set login component as default component to be displayed on first user visit
  We are passing loginscreen context as’ ‘parentContext’ prop and App.js context as ‘appContext’ prop. */
  componentWillMount() {

      var loginscreen=[];
      loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
      var loginmessage = "Not registered yet, Register Now";

      this.setState({
          loginscreen:loginscreen,
          loginmessage:loginmessage
      })
  }


  /* We need to switch component when user clicks on register button which is executed by handleClick 
  We are switching between login and registration component based on value of isLogin flag which was 
  set to true initially in constructor method. */
  handleClick(event) {

      // console.log("event",event);
      var loginmessage;

      if(this.state.isLogin) {

          var loginscreen=[];
          loginscreen.push(<Register parentContext={this}/>);
          loginmessage = "Already registered.Go to Login";

          this.setState({
              loginscreen:loginscreen,
              loginmessage:loginmessage,
              buttonLabel:"Login",
              isLogin:false
          })   
      }

      else {

          var loginscreen=[];
          loginscreen.push(<Login parentContext={this}/>);
          loginmessage = "Not Registered yet.Go to registration";

          this.setState({

              loginscreen:loginscreen,
              loginmessage:loginmessage,
              buttonLabel:"Register",
              sLogin:true
          })
      }
  }


  render() {

      return (

        <div className="loginscreen">
            {this.state.loginscreen}
            <div>

              {this.state.loginmessage}
              <MuiThemeProvider>
                  <div>
                      <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                  </div>
              </MuiThemeProvider>

            </div>
        </div>

      );
  }

}


const style = {
    margin: 15,
};

export default Loginscreen;


