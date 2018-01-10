import React, { Component } from 'react';

import LoginScreen from './Loginscreen';
import UserPage from './UserPage';
import './App.css';

/* Material-UI is used for designing ui of the app */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

/* Dropzone is used for local file selection */
import Dropzone from 'react-dropzone';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

/* superagent is used to handle post/get requests to server */
import axios from 'axios';
var request = require('superagent');



class ProfileScreen extends Component {


  	constructor(props){

    	super(props);
	  	console.log(props);
    
    	this.state={
			user:this.props.user,
			userid:this.props.user.id,
			username:this.props.user.username,
			password: this.props.user.password,
    	}
  	}

 
	/*isValidEmailAddress(emailAddress) {
	    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	    return pattern.test(emailAddress);
	};*/


	/*handleClick(event) {

		// console.log("values in register handler",role);
		var self = this;
		if(this.state.first_name.length>0 && this.state.last_name.length>0 && this.state.username.length>0 && this.state.email.length>0 && this.state.password.length>0) {

		    var payload={
		        "username": this.state.username,
		        "password":this.state.password
		    }

			axios.post('/api/users/'+this.state.userid, payload)

			.then(function (response) {

				console.log(response);

				if(response.data.code == 200) {
					alert("Edit profile successfully!");
				}
				else{
				    console.log("Did not edit profile successfully ",response.data.code);
				}
			})

			.catch(function (error) {
				console.log(error);
			});
		}
	}*/


  handleClickPwd(event) {

	    // console.log("values in register handler",role);
	    var self = this;

	    //To be done:check for empty values before hitting submit
	    if( this.state.password.length>0) {

		      	var payload={
		      		"password":this.state.password
		      	}
		      	axios.post('/api/users/pwd/'+this.state.userid, payload)

		     	.then(function (response) {
		       		console.log(response);

		       	if(response.data.code == 200){
				   	alert("Edit password successfully!");
				   	self.setState({password:""});
		       	}
		       	else{
		         	console.log("Password Not successfully changed ",response.data.code);
		       }
		     })
		     .catch(function (error) {
		       console.log(error);
		     });
	    }

	    else{
	      	alert("Did not enter password change");
	    }
  	}


	/* Used to toggle drawer state */
	toggleDrawer(event){
	  	// console.log("drawer click");
	  	this.setState({draweropen: !this.state.draweropen})
	}

	/* Used to end user session and redirect the user back to login page */
	handleLogout(event){
	  	// console.log("logout event fired",this.props);
	  	var loginPage =[];
	  	loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
	  	this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
	}


	render() {
	    return (
		    <div className="App">
		        <div className="container">

				    <center><h3>Edit Password</h3></center>
					<MuiThemeProvider>
						<div>          
						   	<TextField
								hintText={"Enter your Password"}
								floatingLabelText={"password"}
								floatingLabelText="password"
								type="password"
								onChange = {(event,newValue) => this.setState({password:newValue})}
							/>
						   	<br/>
						   	<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClickPwd(event)}/>
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

	const style1 = {
  		margin: 0,
	};

export default ProfileScreen;

