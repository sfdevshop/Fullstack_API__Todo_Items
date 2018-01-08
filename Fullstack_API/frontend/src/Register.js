
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';


class Register extends Component {

    constructor(props) {

        super(props);

        this.state={
            first_name:'',
            last_name:'',
            email:'',
            password:''
        }
    }


    /* On receiving code 200 from backend, we are reverting user back to login page for login 
    or you can redirect them to index page if you wish. 
    We sent context of Loginscreen.js page as parentContext prop which allows us to 
    manipulate state variables of loginscreen from child. */
    handleClick(event) {

        var apiBaseUrl = "http://localhost:4000/api/";
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);

        //To be done:check for empty values before hitting submit
        var self = this;

        var payload={
            "first_name": this.state.first_name,
            "last_name":this.state.last_name,
            "email":this.state.email,
            "password":this.state.password
        }

        axios.post(apiBaseUrl+'/register', payload)

        .then(function (response) {

            console.log(response);

            if(response.data.code == 200) {

                //  console.log("registration successfull");
                var loginscreen=[];
                loginscreen.push(<Login parentContext={this}/>);
                var loginmessage = "Not Registered yet.Go to registration";

                self.props.parentContext.setState({loginscreen:loginscreen,
                    loginmessage:loginmessage,
                    buttonLabel:"Register",
                    isLogin:true
                });
            }

        })
        .catch(function (error) {
            console.log(error);
        });

    }


  /* We are taking firstname,lastname,email and password from user and storing them in relevant 
  state variables. We need to send these details to backend on click of submit button which is 
  executed by handleClick function */
  render() {

      return (

          <div>
              <MuiThemeProvider>

              <div>
                <AppBar title="Register" />

                  <TextField
                     hintText="Enter your First Name"
                     floatingLabelText="First Name"
                     onChange = {(event,newValue) => 
                     this.setState({first_name:newValue})}
                  />
                  <br/>

                  <TextField
                    hintText="Enter your Last Name"
                    floatingLabelText="Last Name"
                    onChange = {(event,newValue) => this.setState({last_name:newValue})}
                  />
                  <br/>

                  <TextField
                    hintText="Enter your Email"
                    type="email"
                    floatingLabelText="Email"
                    onChange = {(event,newValue) => this.setState({email:newValue})}
                  />
                  <br/>

                 <TextField
                    type = "password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange = {(event,newValue) => this.setState({password:newValue})}
                  />
                 <br/>

              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>

            </MuiThemeProvider>
        </div>

      );
  }

}

const style = {
    margin: 15,
};

export default Register;


