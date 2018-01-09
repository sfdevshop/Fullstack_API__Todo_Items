import React, { Component } from 'react';

import UserPage from './UserPage';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

var apiBaseUrl = "http://localhost:4000/api/";
//import axios from 'axios';
//import UploadScreen from './UploadScreen';



class Login extends Component {

  constructor(props) {
      super(props);
      var localloginComponent=[];
      localloginComponent.push(
          <MuiThemeProvider>
              <div>
                  <TextField
                      hintText="Enter your Username"
                      floatingLabelText="username"
                      onChange = {(event,newValue) => this.setState({username:newValue})}
                  />
                  <br/>
                  <TextField
                      type="password"
                      hintText="Enter your Password"
                      floatingLabelText="Password"
                      onChange = {(event,newValue) => this.setState({password:newValue})}
                  />
                  <br/>
                  <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
              </div>
           </MuiThemeProvider>
      ) /*END PUSH */
      this.state={
          username:'',
          password:'',
          loginComponent:localloginComponent,
      }
  } /* END CONSTRUCTOR */


  componentWillMount() {
      // console.log("willmount prop values",this.props);
      if(this.props.role != undefined){

          console.log("in student componentWillMount");
          var localloginComponent=[];
          localloginComponent.push(
              <MuiThemeProvider>
                  <div>
                      <TextField
                          hintText="Enter your Username"
                          floatingLabelText="username"
                          onChange = {(event,newValue) => this.setState({username:newValue})}
                      />
                      <br/>
                      <TextField
                          type="password"
                          hintText="Enter your Password"
                          floatingLabelText="Password"
                          onChange = {(event,newValue) => this.setState({password:newValue})}
                      />
                      <br/>
                      <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                  </div>
              </MuiThemeProvider>
          ) /* END PUSH */
          this.setState({loginComponent:localloginComponent})
      } /*END IF PROPS != UNDEFINED */
  } /* END COMPONENT WILL MOUNT */


  /* We are making a post request to backend and expecting different codes for various scenarios 
    We are also switching page from login to upload on successful request */
  handleClick(event) {
      var self = this;
      var payload={
          "userid":this.state.username,
    	    "password":this.state.password
      }
      //axios.post(apiBaseUrl+'login', payload)
      .then(function (response) {
          console.log(response);

          if(response.data.code == 200) {
              console.log("Login successfull");
              var uploadScreen=[];
              uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole}/>)
              self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
           }
           else if(response.data.code == 204){
              console.log("Username password do not match");
              alert(response.data.success)
           }
           else {
              console.log("Username does not exists");
              alert("Username does not exist");
           }
      })
      .catch(function (error) {
          console.log(error);
      });
  } /* END HANDLECLICK */


  handleMenuChange(value) {
      console.log("menuvalue",value);
      var loginRole;

          var localloginComponent=[];
          loginRole='user';
          localloginComponent.push(
              <MuiThemeProvider>
                  <div>
                      <TextField
                          hintText="Enter your Username"
                          floatingLabelText="username"
                          onChange = {(event,newValue) => this.setState({username:newValue})}
                      />
                      <br/>
                      <TextField
                          type="password"
                          hintText="Enter your Password"
                          floatingLabelText="Password"
                          onChange = {(event,newValue) => this.setState({password:newValue})}
                      />
                      <br/>
                      <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                  </div>
              </MuiThemeProvider>
          )

      this.setState({menuValue:value,
          loginComponent:localloginComponent
      })
  } /* END HANDLEMENUCHANGE */


  /* We are storing username and password values in state variables which change on each keystroke in 
    onClick function. We need to send user details to backend on click on submit button which will be 
    executed in handleClick function  */
  render() {
      return (
          <div>
              <MuiThemeProvider>
                  <AppBar title="Login" />
              </MuiThemeProvider>
              {this.state.loginComponent}
          </div>
      );
    } /* END RENDER */
} /* END CLASS */


const style = {
    margin: 15,
};

export default Login;

