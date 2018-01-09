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
            username:'',
            email:'',
            password:''
        }
    } /* END CONSTRUCTOR */

    componentWillReceiveProps(nextProps){
        console.log("nextProps",nextProps);
    }

    /* Check Email */
    isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    handleClick(event,role) {
        
        // console.log("values in register handler",role);
        var self = this;
        //To be done:check for empty values before hitting submit

        if(this.state.first_name.length>0 && this.state.last_name.length>0 && this.state.username.length>0 && this.state.email.length>0 && this.state.password.length>0){
            var payload={
                "first_name": this.state.first_name,
                "last_name":this.state.last_name,
                "username": this.state.username,
                "email":this.state.email,
                "password":this.state.password
            }
            console.log("First "+this.state.first_name);
            console.log("Last "+this.state.last_name);
            console.log("User "+this.state.username);
            console.log("Email "+this.state.email);
            console.log("Password "+this.state.password);

            axios.post('api/users', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code == 200) {
                    //  console.log("registration successfull");
                    var loginscreen=[];
                    loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
                    var loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({
                        loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Register",
                        isLogin:true
                    });    
               }
               else{
                  console.log("some error ocurred",response.data.code);
               }
           })
           .catch(function (error) {
              console.log("Error in registration: "+error);
           });
        } /* END IF LOGIN NOT MISSING INFO */
        else{
            alert("Input field value is missing");
        }
    } /* END HANDLECLICK */


    render() {
        // console.log("props",this.props);
    
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Register" />

                         <TextField
                           hintText="Enter your First Name"
                           floatingLabelText="First Name"
                           onChange = {(event,newValue) => this.setState({first_name:newValue})}
                           />
                         <br/>
                         <TextField
                           hintText="Enter your Last Name"
                           floatingLabelText="Last Name"
                           onChange = {(event,newValue) => this.setState({last_name:newValue})}
                           />
                         <br/>
                         <TextField
                           hintText="Enter your User Name"
                           floatingLabelText="Username"
                           onChange = {(event,newValue) => this.setState({username:newValue})}
                           />
                         <br/>
                         <TextField
                           hintText="Enter your User Email"
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
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        ); /* END RETURN */
    } /* END RENDER */
} /* END CLASS */


const style = {
    margin: 15,
};

export default Register;

