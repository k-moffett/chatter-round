import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';
const firebase = require('firebase')

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID
  };

firebase.initializeApp(config);

export default class AddChat extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            newChatName: ''
        });
        this.handleUserInput = this.handleUserInput.bind(this)
        this.createChat = this.createChat.bind(this)
        this.cleanup = this.cleanup.bind(this)
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    cleanup() {
        this.props.cleanUpchats()
    }

    createChat(e) {
        e.preventDefault();
        this.cleanup()
        firebase.database().ref(`${this.props.coordinates}/${this.state.newChatName}`).set({
            messages: '',
            });
    }


    render() {
        return(
            <Row>
                <Col>
                <Form>
                  <FormGroup>
                    <Label for="newChatName">Add a new Chat Room</Label>
                    <Input type="text" name="newChatName" value={this.state.newChatName} onChange={this.handleUserInput} placeholder="enter a chat room name" />
                  </FormGroup>
                    <Button onClick={(e) => {this.createChat(e)}}>Add Chat</Button>
                </Form>
                </Col>
            </Row>
        )
    }

}