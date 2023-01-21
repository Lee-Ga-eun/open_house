import { render } from "@testing-library/react";
import Header from "./header";
import { useLocation } from 'react-router';
import Card from 'react-bootstrap/Card';
import UploadBtn from './Upload';
import { useState, useEffect } from "react";
import axios from "axios";


// openhouse들 컴포넌트
function Houses(){
    return(
        <>
    <Card style={{marginTop:'10px'}}>
      <Card.Body>This is some text within a card body.</Card.Body>
    </Card>
        </>
    )
}

// 전체 페이지 컴포넌트
function LinkTest(props){
    const location = useLocation();
    const sido=location.state.sido;
    const sigungu=location.state.sigungu;
    const dong=location.state.dong;

    const [dataTest, setDataTest]=useState("");


    useEffect(()=>{
        axios.get("http://localhost:5001/api/houses")
        .then((res)=>{
          console.log(res.data);

        setDataTest(res.data.id);
        })
      },[])


        return(
            <>
            <Header/>
            <br></br>
            <div className="Container" style={{backgroundColor:'none', width:'80%',alignItems:'center',margin:'0% 10%',justifyContent:'center',}}>
                <div>
                    <h3>{sido} {sigungu} {dong} OPEN HOUSE</h3>
                    <h3>{dataTest}</h3>
                </div>

                <UploadBtn/>

                {/* 카드들 */}
                <div>
                    <Houses/>
                    <Houses/>
                    <Houses/>
                </div>
                

            </div>


            </>

        )
    
}


export default LinkTest;