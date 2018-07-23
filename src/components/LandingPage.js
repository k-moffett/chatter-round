import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

export default class LandingPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Container>
                <h1>Landing Page</h1>
                <Button color="primary" onclick={(e) => {this.props.history.push('/home')}} >Go to home page.</Button>{' '}
            </Container>
        )
    }
}