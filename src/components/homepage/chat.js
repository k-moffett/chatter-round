import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class Chat extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.state)
    }

    render() {
        return(
            <div>
              <Button onClick={(e) => {this.props.exitChat()}} color="primary" >Leave Chat</Button>
            </div>
        )
    }
    
}