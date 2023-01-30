import { Link } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Header from "./header";
import {hangjungdong} from "./LocationData";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios, { Axios } from "axios";


function Upload(){

    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");
    const [sidoForNext, setSidoForNext]=useState("");
    const [siGuGunForLink, setSiGuGunForLink]=useState("");
    const [dongForLink, setDongForLink]=useState("");
    // const [housesData, setHousesData] =useState([]);
    // const [val4, setVal4]=useState("");
  
    const { sido, sigugun, dong } = hangjungdong;

    const [saveContent, setSaveContent] = useState({
        name:'',
        title:'',
    });

    const onChange=(e)=>{

        // 시도 
        const sidoName = e.target.id=="sido" ? sido.find(i=> i.sido==e.target.value ? i.codeNm : "").codeNm : "";
        console.log(sidoName);
        const sidoSetChange=()=> sidoName!="" ? setVal1(e.target.value) : "";
        sidoSetChange();
        const sidoValueChange= e.target.id=="sido" ? setSidoForNext(sidoName) : "";
        const a= sidoName!=="" ? setSaveContent({...saveContent, name:sidoName}): "";
        console.log(saveContent);
        
        //시군구
        const sigunGuName = e.target.id=="sigungu" ? sigugun.find(i => i.sido==val1 && i.sigugun==e.target.value ? i.codeNm : "").codeNm  :"";
        console.log("sigunguname",sigunGuName);
        const sigunguValue = e.target.id=="sigungu" ? setSiGuGunForLink(sigunGuName): ""; // 렌더링되면서 결국 마지막 setDongForLink만 적용되는 문제를 삼항연산자로 해결
        console.log("sigunguforlink",siGuGunForLink);
    
        const sigunguSetChange=()=> sigunGuName!="" ? setVal2(e.target.value) : "";
        sigunguSetChange();
    
    
        //동
        const dongName = e.target.id=="dong" ? dong.find(i => (i.sido===val1) && (i.sigugun === val2) && (i.dong===e.target.value) ? i.codeNm : "").codeNm : "";
        setDongForLink(dongName);
        const dongSetChange = () => dongForLink!=="" ? setVal3(e.target.value) : "";
        dongSetChange();
      };

      const uploadPost=()=>{
        axios.post("http://localhost:5001/api/houses/upload",{
            name:saveContent.name, 
        }).then(()=>{
            alert('등록 완료!');
        })
      };

    return(
        <>
        <Header/>
        {/* 폼 작성 */}
    <div style={{margin:'10%'}}>

    {/* 제목 */}
    <InputGroup>
        {/* <InputGroup.Text>With textarea</InputGroup.Text> */}
        <Form.Control as="textarea" aria-label="With textarea" placeholder="제목을 작성하세요!"/>
      </InputGroup>
        <br></br>
    {/* 지역 선택 */}
    <Form.Select id='sido' onChange={onChange}>
              <option value="">시/도</option>
              {sido.map((el) => (
                <option key={el.sido} value={el.sido}>
                  {el.codeNm} 
                </option>
              ))}
            </Form.Select>
    <Form.Select id="sigungu" onChange={onChange}>
            <option value="">시/군/구</option>
            {sigugun
              .filter((el) => el.sido === val1) // 수행 전에 시도가 선택되어야 있어야함
              .map((el) => (
                <option key={el.sigugun} value={el.sigugun} >
                  {el.codeNm}
                </option>
              ))}
    </Form.Select>
    <Form.Select id="dong" onChange={onChange}>
              <option value="">동</option>
              {dong
                .filter((el) => el.sido === val1 && el.sigugun === val2) // 시도 & 시군구 모두 선택되어 있어야 함
                .map((el) => (
                  <option key={el.dong} value={el.dong}>
                    {el.codeNm}
                  </option>
                ))}
    </Form.Select>
      {/* 지역 선택 끝 */}
      <br></br>
      {/* 글 등록 */}
      <InputGroup>
        {/* <InputGroup.Text>With textarea</InputGroup.Text> */}
        <Form.Control as="textarea" aria-label="With textarea" placeholder="글을 작성하세요!" 
            onChange={(e)=>{console.log(e.target.value);}} />
      </InputGroup>
      <br></br>
      {/* 사진 업로드 */}
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>사진 등록</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
    
      <InputGroup>
        <InputGroup.Text>db 저장 테스트하기</InputGroup.Text> 
        <Form.Control as="textarea" aria-label="With textarea" placeholder="제목을 작성하세요!" 
            onChange={(e)=>
                {console.log(e.target.value);
                setSaveContent(e.target.value);}
            }/>
      </InputGroup>

      {/* 버튼으로 등록 --> db에 넣기 --> 작성한 것 확인하는 페이지로 이동 - */}
      <Button onClick={uploadPost} variant="danger" style={{backgroundColor:'tomato', borderColor:'white'}}>등록</Button>{' '}


    </div>

        </>

    )
}


export default Upload;

