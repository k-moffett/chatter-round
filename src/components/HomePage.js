import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { AddChat, DisplayAllChats } from './homepage/index'

const firebase = require('firebase')
const crypto = require('crypto');

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: '',
            coordinates: '',
            isLoaded: false,
            allChats: []
        }
        this.getSessid = this.getSessid.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.getCoords = this.getCoords.bind(this)
        this.convertPosition = this.convertPosition.bind(this)
        this.getChats = this.getChats.bind(this)
        this.cleanUpDisplayedChats = this.cleanUpDisplayedChats.bind(this)
    }

    componentWillMount() {
        this.getSessid()
        this.getCoords()
    }

    getSessid() {
        let sessid = document.cookie.split('=')
        if (sessid[0] === 'sessid'){
            this.getUserInfo(sessid[1])
        } else {
            this.props.history.push('/')
        }
    }

    getCoords() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.convertPosition);
        } else { 
            alert("Geolocation is not supported by this browser.")
        }
    }

    convertPosition(position) {
        let latitude = position.coords.latitude.toString()
        let longitude = position.coords.longitude.toString()
        let coords = [latitude, longitude]
        let finalCoords = []
            coords.map((item) => {
            let decimal = item.indexOf('.')+3
            finalCoords.push(item.slice(0, decimal))
            })
        let hashCoords = crypto.createHash('sha256').update(`${finalCoords.toString()}`).digest('hex')
        this.setState({
          coordinates: hashCoords
        }, this.getChats(hashCoords))
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

    getChats(hashCoords) {
        let allKeys = []

        const setChats = () => {
            this.setState({
                allChats: allKeys,
                isLoaded: true
            })}

        firebase.database().ref(hashCoords).on('value', function(dataSnapshot) {
            dataSnapshot.forEach((childNode) => {
              let key = childNode.key
              allKeys.push(key)
            }) 
            setChats(allKeys)
          })
    }

    displayChats() {
        const {isLoaded, allChats} = this.state
        if (!isLoaded) {
            return(<div>Finding chatter...</div>)
        } else {
            return(
               <ListGroup key={'all-chats'}>
                  {allChats.map((item, index) => {
                    return(<ListGroupItem tag="button" action key={index}>{item}</ListGroupItem>)
                    })
                  }
              </ListGroup>
            )
        }   
    }

    cleanUpDisplayedChats() {
        let hashCoords = this.state.coordinates
        this.setState({
            isLoaded: false
        }, this.getChats(hashCoords))
    }

    render() {
        return(
            <Container className={'homePage'}>
            <Row>
                <Col>
                <h1>Welcome {this.state.userInfo.userName}</h1>
                </Col>
            </Row>

            <AddChat coordinates={this.state.coordinates} cleanUpDisplayedChats={this.cleanUpDisplayedChats} />

            <Row>
                <Col id={'all-chats'}>
                    {this.displayChats()}
                    {/* <DisplayAllChats isLoaded={this.state.isLoaded} allChats={this.state.allChats} /> */}
                </Col>
            </Row>

            <Row>
                <Col>
                <Link to='/'>
                    <Button color="primary" >To Landing</Button>
                </Link>
                </Col>
            </Row>
            </Container>
        )
    }
}