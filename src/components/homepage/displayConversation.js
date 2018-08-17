import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';
const moment = require('moment');
const firebase = require('firebase')

export default class DisplayConversation extends Component {
    constructor(props) {
        super(props)

        this.scrollDown = this.scrollDown.bind(this)
    }

    componentDidMount() {
        console.log(this.refs)
        this.scrollDown()
    }

    componentDidUpdate() {
        this.scrollDown()
    }

    scrollDown() {
        this.refs.conversationRef.scrollIntoView({behavior: 'smooth'})
    }

        render() {
            if (this.props.isLoaded === false) {
                return(<div>Loading {this.props.currentChat}...</div>)
            } else {
                return(
                    <ul id={'converstaion'} ref='conversationRef' >
                        {this.props.conversation.map((item, index) => {
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
    }