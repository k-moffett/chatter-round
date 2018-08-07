import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap';

export default class Map extends Component{
    constructor(props) {
        super(props)
        this.retrieveGoogleAPI = this.retrieveGoogleAPI.bind(this)
    }

    componentWillMount() {
        this.retrieveGoogleAPI()
    }

    retrieveGoogleAPI() {
        fetch(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
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
            <div id={'map'} />
        )
    }

}