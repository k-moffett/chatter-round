import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class Chat extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
            <Link to='/home'>
                <Button color="primary" >Leave Chat</Button>
            </Link>
            </div>
        )
    }
    
}