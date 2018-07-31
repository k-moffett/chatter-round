import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            sessid: ''
        }
        this.setSessid = this.setSessid.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    componentWillMount() {
        this.setSessid()
    }

    setSessid() {
        this.setState({sessid: document.cookie})
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleLogin(e) {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        return(
            <Row>
              <Col>
              <h1>Log In!</h1>
                <Form>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" value={this.state.email} onChange={this.handleEmail} placeholder="enter your email" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="text" value={this.state.password} onChange={this.handlePassword} placeholder="enter your password" />
                  </FormGroup>
                  <Button onclick={(e) => {this.handleLogin(e)}}>Log In</Button>
                </Form>
              </Col>
            </Row>
        )
    }
}