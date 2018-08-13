import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';
const moment = require('moment');
const firebase = require('firebase')

export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: '',
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        let { currentChat, userInfo } = this.props.state
        console.log(currentChat)
        console.log(userInfo)
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => { this.validateField(name)});
    }

    sendMessage(e) {
        e.preventDefault()
        firebase.database().ref().child(`${this.props.coordinates}/${this.props.currentChat}`).push({
            userName: '',
            timeSent: [moment().format('YYYY-MM-DD'), moment().format("HH:mm")],
            message: this.state.userInput
        });

    }

    render() {
        return(
            <Container>

                <Row className={'userChatDisplay'}>
                </Row>

                <Row className={'userInput'}>
                </Row>

                    <Col xs='2'>
                      <Button onClick={(e) => {this.sendMessage(e)}}>Log In</Button>
                    </Col>

                    <Col xs='10'>
                    <Form>
                        <FormGroup>
                            <Input type="text" name="userInput" value={this.state.userInput} onChange={this.handleUserInput} placeholder="say something..." />
                        </FormGroup>
                    </Form>
                    </Col>



                <Row>
                  <Button onClick={(e) => {this.props.exitChat()}} color="primary" >Leave Chat</Button>
                </Row>
            </Container>
        )
    }
    
}