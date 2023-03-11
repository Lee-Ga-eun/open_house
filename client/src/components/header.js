// 헤더 = navbar
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Container from 'react-bootstrap/Container';
import {BrowserRouter as Router, Route, Switch, Link} from  'react-router-dom';


function Header(){
    return (
        <>
          <Navbar bg="success" variant="success">
            <Container>
              <Navbar.Brand href="/">Open House</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">저장한 OPEN HOUSE</Nav.Link>
                {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
              </Nav>
            </Container>
          </Navbar>
        </>
    )
}

export default Header;