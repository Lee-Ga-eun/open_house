import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from "./Home.module.css";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {hangjungdong} from "./LocationData";
import { useState } from 'react';

function Home() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const { sido, sigugun, dong } = hangjungdong;
  console.log(sido);

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
            <Form.Select aria-label="Disabled select example" disabled className={styles.locationForm}>
            <option>대한민국</option>
            </Form.Select>

            {/* <Form.Select aria-label="Default select example" className={styles.locationForm}>
            <option>Select location</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select> */}

            {/*  */}

            {/* onChange 이벤트가 발생할 때, 앞으로 변할 e.target.value를 setVal1에 넣어줌으로써 val1값 리렌더링 */}
            <Form.Select className={styles.locationForm} onChange={(e) => setVal1(e.target.value)}>
              <option value="">시/도</option>
              {sido.map((el) => (
                <option key={el.sido} value={el.sido}>
                  {el.codeNm} 
                </option>
              ))}
            </Form.Select>
            {/*  */}

            <Form.Select className={styles.locationForm} onChange={(e) => setVal2(e.target.value)}>
            <option value="">시/군/구</option>
            {sigugun
              .filter((el) => el.sido === val1) // 수행 전에 시도가 선택되어야 있어야함
              .map((el) => (
                <option key={el.sigugun} value={el.sigugun}>
                  {el.codeNm}
                </option>
              ))}
            </Form.Select>

            <Form.Select className={styles.locationForm} onChange={(e) => setVal3(e.target.value)}>
              <option value="">동</option>
              {dong
                .filter((el) => el.sido === val1 && el.sigugun === val2) // 시도 & 시군구 모두 선택되어 있어야 함
                .map((el) => (
                  <option key={el.dong} value={el.dong}>
                    {el.codeNm}
                  </option>
                ))}
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