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
        this.handleUserInput = this.handleUserInput.bind(this)
        this.displayConversation = this.displayConversation.bind(this)
    }

    componentDidMount() {
        this.displayConversation()
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    displayConversation() {
        let { coordinates, currentChat } = this.props.state

        firebase.database().ref(`${coordinates}/${currentChat}`).on('value', function(dataSnapshot) {
            dataSnapshot.forEach((childNode) => {
                let user = childNode.userName
                let message = childNode.message
                let timeSent = childNode.timeSent
                console.log(user)
                console.log(message)
                console.log(timeSent)
              })
          })
    }

    sendMessage(e) {
        let { coordinates, currentChat, userInfo } = this.props.state

        e.preventDefault()
        firebase.database().ref().child(`${coordinates}/${currentChat}`).push({
            userName: userInfo.userName,
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
                      <Button onClick={(e) => {this.sendMessage(e)}}>Send</Button>
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