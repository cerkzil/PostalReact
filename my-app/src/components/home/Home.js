import './home.scss'
import { Container, Alert } from 'react-bootstrap';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken, faSmile, faInfo, faExclamation } from '@fortawesome/free-solid-svg-icons';

class Main extends Component {
  render() {
    return (
      <Container className="p-2">
        {(this.props.status == "success")
          ? <div>
            <div className="results">
              <h3>City: {this.props.city}</h3>
              <h3>Address: {this.props.address}</h3>
              <h3>Postal Code: {this.props.code}</h3>
            </div>
            <Alert variant="success">Postal code found! <FontAwesomeIcon icon={faSmile} /></Alert></div>
          : null
        }
        {(this.props.status == "default")
          ? <Alert variant="info">You should try searching for a postal code! <FontAwesomeIcon icon={faInfo} /></Alert>
          : null
        }
        {(this.props.status == "empty")
          ? <Alert variant="warning">Please fill out all the fields! <FontAwesomeIcon icon={faExclamation} /></Alert>
          : null
        }
        {(this.props.status == "error")
          ? <Alert variant="danger">Something went wrong... <FontAwesomeIcon icon={faHeartBroken} /></Alert>
          : null
        }
      </Container>
    )
  }
}

export default Main;