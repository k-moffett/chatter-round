import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';

export default class DisplayAllChats extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let isLoaded = this.props.isLoaded
        let allChats = this.props.allChats

        if (isLoaded === false) {
            return(<div>Finding chatter...</div>)
        } else {
            return(
               <ListGroup ref={'allChats'}>
                  {allChats.map((item, index) => {
                    return(<ListGroupItem tag="button" action key={index}>{item}</ListGroupItem>)
                    }).bind(this)
                  }
              </ListGroup>
            )
        } 
    }
}