import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';

export default class AddChat extends Component {
    constructor(props) {
        super(this.props)
        this.state({
            newChatName: ''
        })
        this.handleUserInput = this.handleUserInput.bind(this)
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => { this.validateField(name) });
    };


    render() {
        return(
            <Row>
                <Col>
                <Form>
                  <FormGroup>
                    <Label for="newChatName">Add a new Chat Room</Label>
                    <Input type="text" name="newChatName" value={this.state.AddChat} onChange={this.handleUserInput} placeholder="enter a username" />
                  </FormGroup>
                </Form>
                </Col>
            </Row>
        )
    }

}