import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap';

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.REACT_APP_GOOGLE_KEY
  }); 

export default class Map extends Component {
    constructor(props) {
        super(props)
    }

    initMap() {
        let map;
        map = new googleMapsClient.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
          });
    }

    render() {
        return(
            <div id={'map'}></div>
        )
    }

}