import React, { Component } from 'react';
import { Landing, Login, SignUp } from './landingPage/index'
import { Container, Row, Col, Button } from 'reactstrap';
import './landingPage/index.css';

export default class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: 'landing'
        }
        this.getSessid = this.getSessid.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.handleView = this.handleView.bind(this)
        this.updateView = this.updateView.bind(this)
    }

    componentWillMount() {
        this.getSessid()
    }

    getSessid() {
        let sessid = document.cookie.split('=')
        if (sessid[0] === 'sessid'){
            this.getUserInfo(sessid[1])
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
                switch(responseJson.response) {
                    case 'accountDoesNotExist':
                        console.log('Account does not exist.')
                      break;
                    case 'accountDoesExist':
                        this.props.history.push('/home')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    updateView(view) {
        this.setState({
            view: view
        })
    }

    handleView() {
        let view = this.state.view
        let component
        switch(view) {
            case 'signup':
            component = <SignUp updateView={this.updateView} history={this.props.history} />
               break;
            case 'login':
            component = <Login updateView={this.updateView} history={this.props.history} />
              break;
            case 'landing':
            component = <Landing updateView={this.updateView} />
              break;
            default:
            component = <Landing updateView={this.updateView} />
        }
        return component
    }

    render() {
        return(
            <Container id={'landing-page'} >
              <Row>
                <Col>
                  <div id={'title'} >
                    <h1 id={'Chatter-Round'} >Chatter Round</h1>
                  </div>
                </Col>
              </Row>
              {this.handleView()}
              {/* <SignUp history={this.props.history} />
              <Login history={this.props.history} /> */}
            </Container>
        )
    }
}