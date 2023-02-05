import axios from "axios";
import { stringify } from "qs";
import { useState } from "react";
import Header from "./header";

function Uploaded(){

    const params=new URLSearchParams(window.location.search);
    let uploadId=params.get("id");
    console.log(uploadId);

    const [author,setAuthor]=useState("");
    const [sido, setSido] = useState("");
    const [image,setImage]=useState("");
    const [imageUrl,setImageUrl]= useState("");
    // axios.get으로 id와 일치하는 데이터 뽑아오기 + 렌더링될 때만 (한 번만) 되도록
    useState(()=>{
    try{
        axios.get(`http://localhost:5001/api/houses/upload`).then((res)=>res).then((res)=>{
            let tmp=res.data;
            //console.log(tmp[0]);
            var tmps=0
            console.log(tmp[tmp.length-1]);
            console.log("길이",tmp.length);
            for(var i=tmp.length-1;i>=0;i--){ //너무 많은 db를 탐색하지 않도록 역순으로 탐색한다
                tmps=tmp[i];
                if(uploadId==tmps['ID']){
                    console.log("출력완료",tmp[i]);
                    break;
                }
             }
            console.log("tmps",tmps);
            if(tmps!==0){
                //tmps가 업데이트 됐다면
                setAuthor(tmps['AUTHOR']);
                setSido(tmps['SIDO']);
                setImageUrl(tmps['IMAGE_NAME']);
                let imageurltmp='http://localhost:5001'+tmps['IMAGE_NAME'];
                console.log(imageurltmp);
                setImage(imageurltmp);
                //setImage(tmps['IMAGE']);
//                 let blob = new Blob((tmps['IMAGE'])['data'],{ type: 'image/png' });
//                 console.log('blob',blob);
//                 console.log(window.URL.createObjectURL(blob));
// ;                setImageUrl(window.URL.createObjectURL(blob));
//                 console.log("imageUrl",typeof(imageUrl));
//                 console.log('이',tmps['IMAGE']);
//                 setImage(tmps['IMAGE']);
//                 toBase64((tmps['IMAGE'])['data']);
//                 console.log(stringify((tmps['IMAGE'])['data']))

            } ;
        })
    }catch{}
},[]);

    const toBase64=(arr) =>{
        //arr = new Uint8Array(arr) if it's an ArrayBuffer
        return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    };

    // ------------------

    return(
        <>
        <Header/>
        <div>
            <h1>{author? author:""}</h1>
        </div>
        <h1>{sido? sido:""}</h1>
        <div>
            <img src={image} alt="urlimage" style={{width:'30%'}}/>
        </div>
        {/* <img src=`http://localhost:5001${{imageUrl}}` alt="실패"/> */}



        </>
    )
}

export default Uploaded;