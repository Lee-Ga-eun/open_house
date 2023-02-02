import { render } from "@testing-library/react";
import Header from "./header";
import { useLocation } from 'react-router';
import Card from 'react-bootstrap/Card';
import UploadBtn from './UploadBtn';
import { useState, useEffect } from "react";
import axios from "axios";
import qs from 'qs';
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider';

function ImageTest(){
    const [fileIdentity, setFileIdentity]=useState([])
    const [test, setTest]=useState("");
    const [file,setFile]=useState();
    const [fileName,setFileName]=useState("");
    const [imgFile, setImgFile] = useState(""); // 미리보기 위함


    const onChangeFile=(e)=>{
        setFile(e.target.files[0]);
        setFileName(e.target.value);
        console.log("fileName",e.target.value);

        const reader= new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend=()=>{
            setImgFile(reader.result);
        };
    };

    const ImageComponent = (identity)=>{
        console.log(identity);
        console.log(identity.identity);
        <Final k={identity.identity}/>
        //axios.get('http://localhost:5001/image/28eabfada88f98a2273218217f10c042');
        return <div><img src={`http://localhost:5001/image/${identity.identity}`} style={{height:'100px'}}></img></div>
    };

    const Final =(k)=>{
        return <div><img src={`http://localhost:5001/image/${k}`} style={{height:'100px'}}></img></div>

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(fileName);
        const formData = new FormData();
        //formData.append('profile_img', event.target.profile_img.files[0]);
        formData.append('image', file);
        formData.append('name', event.target.name.value);
        formData.append('realfilename',fileName);
        console.log(event.target.name.value);
        console.log("파일콘솔",event.target.image.files[0]);
        console.log(formData);
        for (let key of formData.keys()){
            console.log("키값확인",key);
        };
        for (let value of formData.values()) {
            console.log("value?",value);
     };
        await axios({
            method:'post',
            url:'http://localhost:5001/api/imgtest',
            data:formData,
            headers:{
                  "Content-Type":"multipart/form-data",}
            //      "Access-Control-Allow-Origin": "*",}
        }).then((res)=>res).then((result)=>{alert('등록완');console.log("data",{formData});}).then(
            axios.get('http://localhost:5001/api/imgtest/fileByteName').then((res)=>setFileIdentity(res['data']))
        ).then(()=>console.log("파일이름름ㄹ므",setTest(fileIdentity[0]['fileByteName'])));

        console.log("test",test);
        for (let value of formData.values()) {
            console.log(value);
     }
      };

    return(

        <>
        <Header/>

        <form name='accountFrm' onSubmit={handleSubmit} encType='multipart/form-data'>

        <p><input type='text' name='name'></input></p>
        <p><input type='file' file={file} value={fileName} accept='image/jpg,impge/png,image/jpeg,image/gif' name='image' multiple onChange={onChangeFile}></input></p>
        <p><input type='submit' value='회원가입'></input></p>
        </form>
        <ImageComponent identity={test}/> 

        {/* {fileIdentity!==[] ? <div>{fileIdentity}</div> :""} */}

        {/* 폼 제출 ==> 서버에서 이미지 고유 번호 가져오기 ==> ${}에 고유번호 집어넣기 ==> 이미지 출력 성공? */}
      
      
       {/* 이미지 미리보기 구현 --> FileReader 이용 */}
        <img
        src={imgFile ? imgFile :`/images/icon/user.png`}
        alt="프로필 이미지"
        style={{width:'30%'}}
        />
        </>
    )
}


export default ImageTest;