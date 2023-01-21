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
import {BrowserRouter as Router, Route, Switch, Link} from  'react-router-dom';
import Header from './header';
import Card from 'react-bootstrap/Card';


function Home() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [sidoForNext, setSidoForNext]=useState("");
  const [siGuGunForLink, setSiGuGunForLink]=useState("");
  const [dongForLink, setDongForLink]=useState("");
  const [housesData, setHousesData] =useState([]);
  const [val4, setVal4]=useState("");

  const { sido, sigugun, dong } = hangjungdong;

  const onClick=()=>{
    const checking = sidoForNext==="" ? alert("지역을 선택해주세요") : "";
  };

  const onChange=(e)=>{

    // 시도 
    const sidoName = e.target.id=="sido" ? sido.find(i=> i.sido==e.target.value ? i.codeNm : "").codeNm : "";
    console.log(sidoName);
    const sidoSetChange=()=> sidoName!="" ? setVal1(e.target.value) : "";
    sidoSetChange();
    //setSidoForNext(sidoName);
    const sidoValueChange= e.target.id=="sido" ? setSidoForNext(sidoName) : "";
    
    //시군구
    const sigunGuName = e.target.id=="sigungu" ? sigugun.find(i => i.sido==val1 && i.sigugun==e.target.value ? i.codeNm : "").codeNm  :"";
    console.log("sigunguname",sigunGuName);
    const sigunguValue = e.target.id=="sigungu" ? setSiGuGunForLink(sigunGuName): ""; // 렌더링되면서 결국 마지막 setDongForLink만 적용되는 문제를 삼항연산자로 해결
    console.log("sigunguforlink",siGuGunForLink);

    const sigunguSetChange=()=> sigunGuName!="" ? setVal2(e.target.value) : "";
    sigunguSetChange();


    //동
    const dongName = e.target.id=="dong" ? dong.find(i => (i.sido===val1) && (i.sigugun === val2) && (i.dong===e.target.value) ? i.codeNm : "").codeNm : "";
    console.log("dongName",dongName);
    setDongForLink(dongName);
    console.log("dongForLink",dongForLink);

    const dongSetChange = () => dongForLink!=="" ? setVal3(e.target.value) : "";
    dongSetChange();



    // console.log("e.target.value",e.target.value);
    // // 업데이트된 val1값은 11.
    // // {sido:'11' , codeNm:"서울특별시"}에서 서울특별시를 빼오고 싶다
    // // Object 이름은 sido
    // const findName= sido.map(i => [i.sido, i.codeNm]);
    // console.log("findName", findName);
    // console.log(findName);
    // console.log(sido);
    // //const onlyName= sido.map(i=> i.codeNm ? i.sido==e.target.value : "");
    // const onlyName= sido.find(i=> i.sido==e.target.value ? i.codeNm : "");
    // console.log(onlyName.codeNm);

    // console.log("onlyName",onlyName);

    // setSidoForNext(onlyName.codeNm);
    // //console.log("e.target.name",e.target.name);

  };

  return (
    <>
    <Header/>
      

    <div style={{backgroundColor:'rgb(214, 214, 214)'}}> {/* 전체 바디 */}
      <div className={styles.img}>
        <div className={styles.content}>
            {/* formbox 넣기 */}
            <Form.Select aria-label="Disabled select example" disabled className={styles.locationForm}>
            <option>대한민국</option>
            </Form.Select>
            {/*  */}

            {/* onChange 이벤트가 발생할 때, 앞으로 변할 e.target.value를 setVal1에 넣어줌으로써 val1값 리렌더링 */}
            {/* <Form.Select className={styles.locationForm} onChange={(e) => setVal1(e.target.value)}> */}
            <Form.Select id='sido' className={styles.locationForm} onChange={onChange}>
              <option value="">시/도</option>
              {sido.map((el) => (
                <option key={el.sido} value={el.sido}>
                  {el.codeNm} 
                </option>
              ))}
            </Form.Select>
            {/*  */}
            {/* {console.log("val1",val1)} */}

            {/* <Form.Select className={styles.locationForm} onChange={(e) => setVal2(e.target.value)}> */}
            <Form.Select className={styles.locationForm} onChange={onChange} id="sigungu">
            <option value="">시/군/구</option>
            {sigugun
              .filter((el) => el.sido === val1) // 수행 전에 시도가 선택되어야 있어야함
              .map((el) => (
                <option key={el.sigugun} value={el.sigugun} >
                  {el.codeNm}
                </option>
              ))}
            </Form.Select>

            {/* <Form.Select className={styles.locationForm} onChange={(e) => setVal3(e.target.value)}> */}
            <Form.Select className={styles.locationForm} onChange={onChange} id="dong">

              <option value="">동</option>
              {dong
                .filter((el) => el.sido === val1 && el.sigugun === val2) // 시도 & 시군구 모두 선택되어 있어야 함
                .map((el) => (
                  <option key={el.dong} value={el.dong}>
                    {el.codeNm}
                    
                  </option>
                ))}
      </Form.Select>
      {console.log(val3)}

      {/* 버튼을 누르면 페이지를 이동할 수 있도록 구현한다 */}
        {/* <Link to="/test" state={{sido:{...locationProps}}}> */}
        <Link to="/houses" state={{sido:sidoForNext, sigungu:siGuGunForLink , dong:dongForLink}}>
          <Button className={styles.submit} variant="dark" value={val4} onClick={onClick}>GO</Button>  
        </Link>    

        </div>
        <div className={styles.imgcover}></div>
      </div>   
      <br />

{/* 카드 하단 */}
      <div className={styles.cardAlign}>
        <Card className={styles.card} style={{backgroundColor:'tomato'}}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="light">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card className={styles.card} style={{backgroundColor:'tomato'}}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="light">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card className={styles.card} style={{backgroundColor:'tomato'}}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="light">Go somewhere</Button>
        </Card.Body>
      </Card>
      </div>
    
    </div>
    </>
  );
}

export default Home;