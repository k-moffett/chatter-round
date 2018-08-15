import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './index.css';

export default class Landing extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
        <Container id={'main-landing'} >

            <Row>
                <Col>
                <div  id={'welcome'}>
                    <p>Welcome to Chatter Round!</p>
                    <p> A location based chat application used to annonomously connect users near each other's current location. Click one of the links below to get started.</p>
                </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <Button className={'main-landing-btn'} onClick={(e) => {this.props.updateView('signup')}}>Sign Up</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                <Button className={'main-landing-btn'} onClick={(e) => {this.props.updateView('login')}}>Log In</Button>
                </Col>
            </Row>
        </Container>
        )
    }
}