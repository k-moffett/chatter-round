import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: ''
        }
        this.getSessid = this.getSessid.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.getData = this.getData.bind(this)
    }

    componentWillMount() {
        this.getSessid()
    }

    getSessid() {
        let sessid = document.cookie.split('=')
        if (sessid[0] === 'sessid'){
            this.getUserInfo(sessid[1])
        } else {
            this.props.history.push('/')
        }
    }

    getUserInfo(sessid) {
        fetch('/get_user', {
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
                if (responseJson === 'accountDoesNotExist') {
                    this.props.history.push('/')
                } else {
                  this.setState({
                      userInfo: responseJson
                  })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getData(e) {
        e.preventDefault()
        fetch(`https://crossorigin.me/http://api.eventful.com/json/events/family?app_key=LkRczZ6Mw7zvVqtS`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
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
                <h1>Welcome {this.state.userInfo.userName}</h1>
                <Link to='/'>
                    <Button color="primary" >To Landing</Button>
                </Link>
                <Button color="primary" onClick={(e) => {this.getData(e)}}>To Landing</Button>
            </Container>
        )
    }
}