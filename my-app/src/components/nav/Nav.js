import './nav.scss';
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { Nav, Container } from 'react-bootstrap';

class Navigation extends Component {
    render() {
        return (
            <Container className="p-0">
                <Nav>
                    <Nav.Item>
                        <NavLink exact to="/" className="nav-link">Home</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/Privacy/" className="nav-link">Privacy</NavLink>
                    </Nav.Item>
                </Nav>
            </Container>
        );
    }
}

export default Navigation;