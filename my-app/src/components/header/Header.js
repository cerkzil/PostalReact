import './header.scss';
import { Form, Button, Container } from 'react-bootstrap/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cities: []
    }
  }
  async componentDidMount() {
    let res = await fetch("https://api.meteo.lt/v1/places");
    this.setState({
      cities: await res.json()
    })
  }

  handleEnter = event => {
    if (event.keyCode === 13) {
      this.props.handleSubmit(event);
      event.preventDefault();
    }
  };

  render() {
    return (
      <header>
        <Container className="p-2">
          <Form>
            <Form.Group controlId="cityForm">
              <Form.Label>City</Form.Label>
              <Form.Control as="select"
                value={this.props.city}
                name="city"
                onChange={this.props.handleChange}>
                <option value='' defaultValue>Pick a City...</option>
                {this.state.cities.flatMap((item, index) =>
                  (item.countryCode === "LT") ? <option key={index} value={item.code}>{item.name}</option> : null)}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="addressForm">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text"
                value={this.props.address}
                name="address"
                onKeyDown={this.handleEnter}
                onChange={this.props.handleChange}
                placeholder="Enter Address..." />
            </Form.Group>
            <Button variant="outline-primary"
              onClick={this.props.handleSubmit}
            >Find Postal Code <FontAwesomeIcon icon={faSearch} /></Button>
          </Form>
        </Container>
      </header>
    );
  }
}

export default Header;