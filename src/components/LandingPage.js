import React, { Component } from 'react';
import { Login, SignUp } from './landingPage/index'
import { Container, Row, Col, Button } from 'reactstrap';

export default class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.getSessid = this.getSessid.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
    }

    componentWillMount() {
        this .getSessid()
    }

    getSessid() {
        let sessid = document.cookie.split('=')
        console.log('SESSID: ',sessid)
        if (sessid[0] === 'sessid='){
            console.log(sessid[1])
        }
    }

    getUserInfo(sessid) {
        fetch('/user_session', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessid: sessid
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
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