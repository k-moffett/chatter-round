import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import DisplayConverstion from './displayConversation'
const moment = require('moment');
const firebase = require('firebase')

export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: '',
            conversation: [],
            isLoaded: false
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.handleUserInput = this.handleUserInput.bind(this)
        this.getConversation = this.getConversation.bind(this)
    }

    componentDidMount() {
        this.getConversation()
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    getConversation() {
        let { coordinates, currentChat } = this.props.state
        let conversation = []

        const setConversation = (conversation) => {
            this.setState({
                conversation: conversation,
                isLoaded: true
            })}

        firebase.database().ref(`${coordinates}/${currentChat}`).on('value', function(dataSnapshot) {
            conversation = []

            dataSnapshot.forEach((childNode) => {
                let message = {
                    user: childNode.val().userName,
                    message: childNode.val().message,
                    timeSent: childNode.val().timeSent
                }
                conversation.push(message)
              })
              setConversation(conversation)
          })
    }

    displayConversation() {
        let { isLoaded, conversation } = this.state
        
        if (isLoaded === false) {
            return(<div>Loading {this.props.currentChat}...</div>)
        } else {
            return(
                <ul id={'converstaion'} >
                    {conversation.map((item, index) => {
                        if (item.user === undefined) {
                        } else if (item.user === this.props.userName) {
                            return(
                                <li id={'this-users-chat-message'} >  
                                    {item.message} :{item.user}
                                </li>
                            )
                        } else {
                            return(
                            <li id={'other-users-chat-message'} >  
                                {item.user}: {item.message}
                            </li>
                            )}
                        })
                    }
                </ul>
            )
        }
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
            <Container id={'main-chat-container'}>

                <Row>
                  <Button id={'exit-chat'} onClick={(e) => {this.props.exitChat()}} color="primary" >Leave Chat</Button>
                </Row>

                <Row>
                    <p id={'chat-title'} >{this.props.state.currentChat}</p>
                </Row>

                <Row id={'userChatDisplay'} >
                    {/* {this.displayConversation()} */}
                    <DisplayConverstion isLoaded={this.state.isLoaded} conversation={this.state.conversation} />
                </Row>

                <Row id={'userInput'}>

                    <Col>
                        <Form>
                            <FormGroup>
                                <Input id={'chat-form'} type="text" name="userInput" value={this.state.userInput} onChange={this.handleUserInput} placeholder="say something..." />
                            </FormGroup>
                                <Button id={'send-btn'} onClick={(e) => {this.sendMessage(e)}}>Send</Button>
                        </Form>
        
                    </Col>

                </Row>


            </Container>
        )
    }
    
}