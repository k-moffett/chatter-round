import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';
const moment = require('moment');
const hash = require('hash.js');

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            dateOfBirth: '',
            password: '',
            passwordMatch: '',
            formErrors: '',
            userNameValid: false,
            emailVaild: false,
            dateOfBirthValid: false,
            passwordValid: false,
            passwordMatchValid: false,
            formValid: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => { this.validateField(name) });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.fieldValidationErrors;
        let userNameValid = this.state.userNameValid;
        let emailValid = this.state.emailValid;
        let dateOfBirthValid = this.state.dateOfBirthValid;
        let passwordValid = this.state.passwordValid; 
        let passwordMatchValid = this.state.passwordMatchValid; 
      
        switch(fieldName) {
          case 'userName':
            if (this.state.userName.toString().length > 4) {
                console.log('Username is long enough.');
                console.log(this.state.userName);
                userNameValid = true;
            } else {
                console.log('Usernames must have a length greater than 4 characters.');
                fieldValidationErrors = 'Usernames must have a length greater than 4 characters.';
            }
          break;
          case 'email':
            const emailVal = /^(?=.*[@])(?=.*[/.])/;
            if (emailVal.test(this.state.email.toString()) === true) {
                console.log('email valid');
                emailValid = true;
            } else {
                console.log('You must enter a valid email.');
                fieldValidationErrors = 'You must enter a valid email.';
            }
          break;
          case 'dateOfBirth':
            let today = moment(moment().format('YYYY-MM-DD'));
            let dob = moment(this.state.dateOfBirth.toString());
            let dateDiff = today.diff(dob, 'years', true);
            if (dateDiff === "" | dateDiff === NaN | dateDiff < 13) {
                fieldValidationErrors = `Looks like you are't old enough, or you have entered an invalid date.`;
            } else if (dateDiff > 13) {
                console.log('You are old enough!');
                dateOfBirthValid = true;
            } else {
                console.log('You must enter a valid date of birth.');
                fieldValidationErrors = 'You must enter a valid date of birth.'
            }
            break;           
          case 'password':
            const passVal = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if (passVal.test(this.state.password.toString()) === true) {
                console.log('password true');
                passwordValid = true;
            } else {
                console.log('Your password must be between 6 and 16 characters long and include one of each of the following: lowercase character, uppercase character, special character, and number.');
                fieldValidationErrors = 'Your password must be between 6 and 16 characters long and include one of each of the following: lowercase character, uppercase character, special character, and number.';
            }
            break;
           case "passwordMatch":
            if (this.state.password === this.state.passwordMatch) {
                console.log('Passwords Match');
                passwordMatchValid = true;
            } else {
                console.log('Your passwords do not match.');
                fieldValidationErrors = 'Your passwords do not match.';
            }
            break;
          default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            userNameValid: userNameValid,
            emailValid: emailValid,
            dateOfBirthValid: dateOfBirthValid,
            passwordValid: passwordValid,
            passwordMatchValid: passwordMatchValid
            }, this.validateForm);
    };

    validateForm() {
        if (this.state.userNameValid && this.state.emailValid && this.state.dateOfBirthValid && this.state.passwordValid && this.state.passwordMatchValid) {
            this.setState({formValid: true});
        }
      }

    handleSignUp(e) {
        e.preventDefault();
        fetch('/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.userName,
                email: this.state.email,
                dateOfBirth: this.state.dateOfBirth,
                password: hash.sha256().update(this.state.password).digest('hex'),
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('responseJson: ', responseJson[0]);
                // if (responseJson != true) {
                //     this.props.history.push('/home')
                // }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return(
            <Row>
              <Col>
              <h1>Sign Up!</h1>
                <Form>
                  <FormGroup>
                    <Label for="userName">Username</Label>
                    <Input type="text" name="userName" value={this.state.userName} onChange={this.handleUserInput} placeholder="enter a username" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" value={this.state.email} onChange={this.handleUserInput} placeholder="enter your email" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="dateOfBirth">Date of Birth</Label>
                    <Input type="date" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleUserInput} placeholder="enter date of birth" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="text" name="password" value={this.state.password} onChange={this.handleUserInput} placeholder="enter a password" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="passwordMatch">Verify Password</Label>
                    <Input type="password" name="passwordMatch" value={this.state.passwordMatch} onChange={this.handleUserInput} placeholder="verify your password" />
                  </FormGroup>
                  <Button disabled={!this.state.formValid} onClick={(e) => {this.handleSignUp(e)}}>Sign Up</Button>
                </Form>
              </Col>
            </Row>
        );
    };
};