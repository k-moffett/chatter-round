import React, { Component } from 'react';
import { Login, SignUp } from './landingPage/index'
import { Container, Row, Col, Button } from 'reactstrap';

export default class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.getSessionCookie = this.getSessionCookie.bind(this)
    }

    componentWillMount() {
        this .getUserSession()
    }

    getUserSession() {
        let sessid = document.cookie.split('=')[1]
        console.log('SESSID: ',sessid)
    }

    render() {
        return(
            <Container>
              <Row>
                <Col>
                <h1>Chatter Round</h1>
                </Col>
              </Row>
              <SignUp history={this.props.history} />
              <Login history={this.props.history} />
            </Container>
        )
    }
}