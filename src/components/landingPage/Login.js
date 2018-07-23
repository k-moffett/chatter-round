import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';

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
    }

    componentWillMount() {
        this.setSessid()
    }

    setSessid() {
        console.log(document.cookie)
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return(
            <Col>
              <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" value={this.state.email} onChange={this.handleEmail} placeholder="enter your email" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="text" value={this.state.password} onChange={this.handlePassword} placeholder="enter your password" />
                </FormGroup>
                <Button onclick={(e) => {console.log(this.state)}}></Button>
              </Form>
            </Col>
        )
    }
}