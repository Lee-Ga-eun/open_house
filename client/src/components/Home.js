import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from "./Home.module.css";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function Home() {
  return (
    <>
      <Navbar bg="success" variant="success">
        <Container>
          <Navbar.Brand href="#home">Open House</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      
      
      <div className={styles.img}>
        <div className={styles.content}>
            {/* formbox 넣기 */}
            <Form.Select aria-label="Default select example">
            <option>Select location</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>

            </Form.Select>
            <Button className={styles.submit} variant="dark">GO</Button>
            

        </div>
        <div className={styles.imgcover}></div>
      </div>   
      <br />

    </>
  );
}

export default Home;