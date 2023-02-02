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
    const [file,setFile]=useState();
    const [fileName,setFileName]=useState("");
    const onChangeFile=(e)=>{
        setFile(e.target.files[0]);
        setFileName(e.target.value);
        console.log("fileName",e.target.value);
    }

    const ImageComponent = ()=>{
        //axios.get('http://localhost:5001/image/28eabfada88f98a2273218217f10c042');
        return <div><img src="http://localhost:5001/image/28eabfada88f98a2273218217f10c042" style={{height:'100px'}}></img></div>
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
        }).then((res)=>res).then((result)=>{alert('등록완');console.log("data",{formData});});


        for (let value of formData.values()) {
            console.log(value);
     }
      };

    const register = (regiInfo) => {
            axios.post("http://localhost:5001/api/imgtest",{
                method:"post",
                body: regiInfo,
                headers: { "Content-Type": "multipart/form-data", Authorization: localStorage.getItem("access_token") }
                
            }).then(()=>{
                for (let value of regiInfo.values()) {
                    console.log("rego",value);
             }
            }).then((res)=>{
                console.log(res);
                //console.log(regiInfo);
                alert('등록 완료!');
            })
          };

    return(

        <>
        <Header/>

        <form name='accountFrm' onSubmit={handleSubmit} encType='multipart/form-data'>

        <p><input type='text' name='name'></input></p>
        <p><input type='file' file={file} value={fileName} accept='image/jpg,impge/png,image/jpeg,image/gif' name='image' multiple onChange={onChangeFile}></input></p>
        <p><input type='submit' value='회원가입'></input></p>
        </form>

        <ImageComponent/>

        </>
    )
}


export default ImageTest;