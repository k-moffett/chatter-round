import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import './index.css';
const hash = require('hash.js');

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            sessid: '',
            formErrors: '',
            emailVaild: false,
            passwordValid: false,
            formValid: false
        }
        this.handleUserInput = this.handleUserInput.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => { this.validateField(name) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.fieldValidationErrors 
        let emailValid = this.state.emailValid
        let passwordValid = this.state.passwordValid 
      
        switch(fieldName) {
          case 'email':
            const emailVal = /^(?=.*[@])(?=.*[/.])/
            if (emailVal.test(this.state.email.toString()) === true) {
                console.log('email valid')
                emailValid = true
            } else {
                console.log('You must enter a valid email.')
                fieldValidationErrors = 'You must enter a valid email.'
            }
          break;          
          case 'password':
            const passVal = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            if (passVal.test(this.state.password.toString()) === true) {
                console.log('password true')
                passwordValid = true
            } else {
                console.log('Your password must be between 6 and 16 characters long and include one of each of the following: lowercase character, uppercase character, special character, and number.')
                fieldValidationErrors = 'Your password must be between 6 and 16 characters long and include one of each of the following: lowercase character, uppercase character, special character, and number.'
            }
            break;
          default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            }, this.validateForm);
    }

    validateForm() {
        if (this.state.emailValid && this.state.passwordValid) {
            this.setState({formValid: true});
        }
      }

    handleLogin(e) {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: hash.sha256().update(this.state.password).digest('hex'),
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                switch(responseJson.response) {
                    case 'emailDoesNotExist':
                        console.log('An account with that email address does not exist')
                      break;
                    case 'incorrectPassword':
                        console.log('Your password is incorrect.')
                      break;
                    case 'loginSuccessful':
                        this.props.history.push('/home')
                      break;
                    default:
                        console.log('something went wrong...')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return(
            <Row id={'login-row'} >
              <Col>
              <div id={'login-form'}>
                <Form id={'login-formgroup'} >
                  <FormGroup>
                    <Input className={'loginForms'} type="email" name="email" value={this.state.email} onChange={this.handleUserInput} placeholder="enter your email" />
                  </FormGroup>
                  <FormGroup>
                    <Input className={'loginForms'} type="text" name="password" value={this.state.password} onChange={this.handleUserInput} placeholder="enter your password" />
                  </FormGroup>
                  <Button className={'login-btn'} onClick={(e) => {this.props.updateView('landing')}}>Back</Button>
                  <Button className={'login-btn'} disabled={!this.state.formValid} onClick={(e) => {this.handleLogin(e)}}>Log In</Button>
                </Form>
                </div>
              </Col>
            </Row>
        )
    }
}