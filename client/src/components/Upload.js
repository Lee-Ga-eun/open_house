import { Link, useNavigate,useNavigation } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Header from "./header";
import {hangjungdong} from "./LocationData";
import { React, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios, { Axios } from "axios";


function Upload(){
    const navigate=useNavigate();
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");
    const [sidoForNext, setSidoForNext]=useState("");
    const [siGuGunForLink, setSiGuGunForLink]=useState("");
    const [dongForLink, setDongForLink]=useState("");
    const [num,setNum]=useState(""); // 다음 작성결과 확인 페이지 id 파라미터 설정을 위해
    
  
    const { sido, sigugun, dong } = hangjungdong;

    const [saveContent, setSaveContent] = useState({
        // name:'',
        title:'',
        author:'',
        sido:'',
        sigungu:'',
        dong:'',
        content:'',
        //image:'',
        file:null,
        fileName:'',
    });

    const [file,setFile]=useState();
    const [fileName,setFileName]=useState("");
    const [imgFile, setImgFile] = useState(""); // 미리보기 위함

    const onChangeFile=(e)=>{
      setFile(e.target.files[0]);
      console.log(file);
      setFileName(e.target.value);
      console.log("fileName",e.target.value);
      console.log("reader",e.target.files[0])
      const reader= new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      //reader.readAsArrayBuffer(e.target.files[0]);
      reader.onloadend=()=>{
          setImgFile(reader.result);
      };
  }; // 미리보기 기능 

    const onChange=(e)=>{

        // 시도 
        const sidoName = e.target.id=="sido" ? sido.find(i=> i.sido==e.target.value ? i.codeNm : "").codeNm : "";
        console.log(sidoName);
        const sidoSetChange=()=> sidoName!="" ? setVal1(e.target.value) : "";
        sidoSetChange();
        const sidoValueChange= e.target.id=="sido" ? setSidoForNext(sidoName) : "";
        const a= sidoName!=="" ? setSaveContent({...saveContent, sido:sidoName}): "";
        console.log(saveContent);
        
        //시군구
        const sigunGuName = e.target.id=="sigungu" ? sigugun.find(i => i.sido==val1 && i.sigugun==e.target.value ? i.codeNm : "").codeNm  :"";
        console.log("sigunguname",sigunGuName);
        const sigunguValue = e.target.id=="sigungu" ? setSiGuGunForLink(sigunGuName): ""; // 렌더링되면서 결국 마지막 setDongForLink만 적용되는 문제를 삼항연산자로 해결
        console.log("sigunguforlink",siGuGunForLink);
    
        const sigunguSetChange=()=> sigunGuName!="" ? setVal2(e.target.value) : "";
        sigunguSetChange();
        const b= sigunGuName!=="" ? setSaveContent({...saveContent, sigungu:sigunGuName}): "";

    
    
        //동
        const dongName = e.target.id=="dong" ? dong.find(i => (i.sido===val1) && (i.sigugun === val2) && (i.dong===e.target.value) ? i.codeNm : "").codeNm : "";
        setDongForLink(dongName);
        const dongSetChange = () => dongForLink!=="" ? setVal3(e.target.value) : "";
        dongSetChange();
        const c= dongName!=="" ? setSaveContent({...saveContent, dong:dongName}) :"";
      };

      const uploadPosts=(err)=>{
        axios.post("http://localhost:5001/api/houses/upload",{
            sido:saveContent.sido, 
            sigungu:saveContent.sigungu,
            author:saveContent.author,
            content:saveContent.content,
            dong:saveContent.dong,
            image:saveContent.image,
            title:saveContent.title,
        }).then(()=>{
          if(err){
            alert('이미지를 업로드해주세요');
          }
            alert('등록 완료!');
        })
      };

      const uploadPost= async (event)=>{
        event.preventDefault();
        const formData=new FormData();
        console.log("file",file)
        formData.append('image',file);
        formData.append('sido', saveContent.sido);
        formData.append('sigungu', saveContent.sigungu);
        formData.append('author',saveContent.author);
        formData.append('content',saveContent.content);
        formData.append('dong',saveContent.dong);
        formData.append('title',saveContent.title);
        for (let key of formData.keys()){
          console.log("키값확인",key);
      };

        for (let value of formData.values()) {
          console.log("value",value);}
        try{
            await axios({
              method:'post',
              url:'http://localhost:5001/api/houses/upload',
              data:formData,
              headers:{
                "Content-type":"multipart/form-data"
              }
            }).then((res)=>res)
            .then((result)=>{
              alert("등록성공");
              var dt = new Date();
              console.log(dt.getHours(),dt.getMinutes(),dt.getSeconds());
            }).then((res)=>{
              setTimeout(()=>ThrowDetail(),5000);
              //ThrowDetail();
            })}
        catch{
          alert('업로드할 사진을 선택해주세요');
        }
      };


      // 여기서 할 일은: Link로 다음 페이지를 넘겨줘야 되고,
      // axios.get으로부터 saveContent.author(작가이름)과 같은 이름을 가진 db와 --> ok
      // 시간이 1분 정도 차이나는 행을 알아내서 --> ok
      // 행 전체를 속성 처리해서 Link로 넘겨주며
      // 그 행에 있는 id를 params로 설정한다
      const ThrowDetail =async (history)=>{
        console.log("throw Detail");
        // 5분 내로 작성된 게시글만 가져온다
        await axios.get("http://localhost:5001/api/houses/uploadTime")
        .then((res)=>{
          const dt=res.data;
          for(var i=0;i<=dt.length-1;i++){
            const tmp=dt[i];
            console.log("tmp",tmp);
            if(tmp['AUTHOR']==saveContent.author){ // 이 부분을 작성자로 바꾸고, id 값을 변수에 저장하여 link 파라미터로 만든다
              // 어차피 url에서 id를 넣었기 때문이
              // 컴포넌트에서 id 값을 받고, id와 일치하는 db 값을 가져오면 되지 않을까?
              console.log("찾았다요놈",tmp);
              setNum(tmp['ID']);
              RenderUrl();
              }};
        });
      };

      const RenderUrl =()=>{
        return <div><Link to={`/houses/upload/posting?id=${num}`}>
          <Button>확인</Button> </Link> </div>
      };

    return(
        <>
        <Header/>
        {/* 폼 작성 */}
    <Button onClick={()=>navigate(-1)} variant="primary">뒤로가기</Button>{' '}


    <div style={{margin:'10%'}}> 


    {/* 제목 */}
    <InputGroup>
        {/* <InputGroup.Text>With textarea</InputGroup.Text> */}
        <Form.Control as="textarea" aria-label="With textarea" placeholder="제목을 작성하세요!" onChange={
            (e)=>{
                setSaveContent({...saveContent, title:e.target.value});
            }
        }/>
      </InputGroup>

      <InputGroup>
        {/* <InputGroup.Text>With textarea</InputGroup.Text> */}
        <Form.Control as="textarea" aria-label="With textarea" placeholder="작성인" onChange={
            (e)=>{
                setSaveContent({...saveContent, author:e.target.value});
            }
        }/>
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
            onChange={(e)=>{
                console.log(e.target.value);
                setSaveContent({...saveContent,content:e.target.value})}} />
      </InputGroup>
      <br></br>
      {/* 사진 업로드 */}
      <Form.Group controlId="formFileMultiple" className="mb-3" > 
        <Form.Label>사진 등록</Form.Label>
        <Form.Control encType='multipart/form-data' type="file" multiple file={file} value={fileName} accept='image/*' name='image' onChange={onChangeFile} />
      </Form.Group>
      <div>
      <img
        src={imgFile ? imgFile :`/images/icon/user.png`}
        alt="프로필 이미지"
        style={{width:'30%'}}
        />
    </div>
    <br></br>

      {/* 버튼으로 등록 --> db에 넣기 --> 작성한 것 확인하는 페이지로 이동 - */}
      <Button encType='multipart/form-data' onClick={uploadPost} variant="danger" style={{backgroundColor:'tomato', borderColor:'white'}}>등록</Button>{' '}
    </div> 
    <RenderUrl/>

        </>

    )
}


export default Upload;

