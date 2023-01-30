import { render } from "@testing-library/react";
import Header from "./header";
import { useLocation } from 'react-router';
import Card from 'react-bootstrap/Card';
import UploadBtn from './UploadBtn';
import { useState, useEffect } from "react";
import axios from "axios";


// openhouse들 컴포넌트
function Houses({name}){
    return(
        <>
    <Card style={{marginTop:'10px'}}>
      <Card.Body>{name} This is some text within a card body</Card.Body>
    </Card>
        </>
    )
}
Houses.defaultProps = {
    name: ''
  }

// 전체 페이지 컴포넌트
function LinkTest(props){
    const location = useLocation();
    const sido=location.state.sido;
    const sigungu=location.state.sigungu;
    const dong=location.state.dong;
    console.log("시도",typeof(sido));
    console.log(sido=='서울특별시');

    const [dataTest, setDataTest]=useState([]);


    useEffect(()=>{
        axios.get("http://localhost:5001/api/houses")
        .then((res)=>{
            console.log(res.data);

        setDataTest(res.data);
        
        console.log("I am useState",typeof(dataTest));
        console.log(Object.keys(res.data));

        })
      },[]);

      const DataOut = () =>{
        try{
            if (dataTest.length > 0){
                return dataTest.map((i,index) => (<div key={index}>{i[0]}</div>))
            }
        }catch{
            console.log("실패");
        }

      };
      console.log("dataTest",dataTest[0]);



        return(
            <>
            <Header/>
            <DataOut/>
            {/* {dataTest[0] ? dataTest.map((i,index) => <div key={index}>{dataTest[index].NAME}</div>) :""} */}
            {/* IF문으로 걸러내기 :: 지역 조회에 활용 가능할 것 같음.  */}
            {/* {dataTest.map((i,index) =>  dataTest[index].NAME==sido ? <div key={index}>{dataTest[index].NAME}</div> : "")} */}
            <br></br>
            <div className="Container" style={{backgroundColor:'none', width:'80%',alignItems:'center',margin:'0% 10%',justifyContent:'center',}}>
                <div>
                    <h3>{sido} {sigungu} {dong} OPEN HOUSE</h3>
                    {/* <h3>{dataTest}</h3> */}
                    
                </div>

                <UploadBtn/>

                {/* 카드들 */}
                {/* 해당 지역에 대한 포스팅이 있을 때 출력 */}
                <div>

                {dataTest.map((i,index) =>  dataTest[index].NAME===sido ? 
                    <div key={index}><Houses name={sido}/></div> 
                    : "")}

                </div>

            </div>


            </>

        )
    
}


export default LinkTest;