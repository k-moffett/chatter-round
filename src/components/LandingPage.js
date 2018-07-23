import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap';

export default class LandingPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Container>
                <h1>Landing Page</h1>
                <Link to='/home'>
                    <Button color="primary" >To Home</Button>
                </Link>
            </Container>
        )
    }
}