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


// openhouse들 컴포넌트
function HousesCard({sido,sigungu,dong}){
    
    return(
        <>
    <Card style={{marginTop:'10px'}}>
      <Card.Body>{sido}{sigungu}{dong} This is some text within a card body</Card.Body>
    </Card>
        </>
    )
}
HousesCard.defaultProps = {
    name: ''
  }

// 전체 페이지 컴포넌트
function LinkTest(props){

    const [ rangeValue, setRangeValue ] = useState(0); 

    const params=new URLSearchParams(window.location.search);
    let sido=params.get("sido");
    let sigungu=params.get("sigungu");
    let dong= params.get("dong");

    console.log(sido, sigungu, dong);
    // const location = useLocation();
    // const sido=location.state.sido;
    // const sigungu=location.state.sigungu;
    // const dong=location.state.dong;
    // console.log("시도",typeof(sido));
    // console.log(sido=='서울특별시');

    const [dataTest, setDataTest]=useState([]);


    useEffect(()=>{
        axios.get("http://localhost:5001/api/houses/upload")
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

    //   const barClick=(e)=>{
    //     const a= e.target.value >=1 ? console.log("1입니당"):""
    //   }

      const changeRange=(e)=>{
        try{
            setRangeValue(e.target.value);
            console.log(rangeValue);
            <ShowDetail/>
        }catch{}
      };

      const ShowDetail=()=>{
        if (rangeValue == 0){
            console.log("rangeValue",rangeValue);
            return(
                <div>{dataTest.map((i,index) =>  dataTest[index].SIDO===sido? 
                    <div key={index}><HousesCard sido={dataTest[index].SIDO} sigungu={dataTest[index].SIGUNGU} dong={dataTest[index].DONG}/></div> 
                    : "")}</div>
            )
        }else if(rangeValue==5){
            return(
                <div>{dataTest.map((i,index) =>  dataTest[index].SIDO===sido && dataTest[index].SIGUNGU ===sigungu? 
                    <div key={index}><HousesCard sido={dataTest[index].SIDO} sigungu={dataTest[index].SIGUNGU} dong={dataTest[index].DONG}/></div> 
                    : "")}</div>
            )
        }else if(rangeValue==10){
            return(
                <div>{dataTest.map((i,index) =>  dataTest[index].SIDO===sido && dataTest[index].SIGUNGU ===sigungu&&dataTest[index].DONG ===dong? 
                    <div key={index}><HousesCard sido={dataTest[index].SIDO} sigungu={dataTest[index].SIGUNGU} dong={dataTest[index].DONG}/></div> 
                    : "")}</div>
            )
        }}


        return(
            <>
            <Header/>
            <DataOut/>


            {/* {dataTest[0] ? dataTest.map((i,index) => <div key={index}>{dataTest[index].NAME}</div>) :""} */}
            {/* IF문으로 걸러내기 :: 지역 조회에 활용 가능할 것 같음.  */}
            {/* {dataTest.map((i,index) =>  dataTest[index].NAME==sido ? <div key={index}>{dataTest[index].NAME}</div> : "")} */}
            <br></br>
            <div className="Container" style={{backgroundColor:'none', width:'80%',alignItems:'center',margin:'0% 10%',justifyContent:'center',}}>
                {/* <div>
                    <h3>{sido} {sigungu} {dong} OPEN HOUSE</h3>                    
                </div> */}

            <div>지역 검색 범위 변경</div>
            <RangeSlider
                        // value={rangeValue}
                        onChange={changeRange}
                        min='0'
                        max='10'
                        step='5'
                        defaultValue='0'
                        style={{width:'70%'}} />

            <UploadBtn name="+업로드"/>
            <br></br>

                {/* 카드들 */}
                {/* 해당 지역에 대한 포스팅이 있을 때 출력 */}
                {/* <div>
                {dataTest.map((i,index) =>  dataTest[index].SIDO===sido && dataTest[index].SIGUNGU===sigungu && dataTest[index].DONG===dong? 
                    <div key={index}><HousesCard sido={dataTest[index].SIDO} sigungu={sigungu} dong={dong}/></div> 
                    : "")}
                </div> */}

                <p>{rangeValue==0 ? <div>{sido} OPEN HOUSE</div> :
                    rangeValue==5 ? <div>{sido} {sigungu} OPEN HOUSE</div> :
                    rangeValue==10 ? <div>{sido} {sigungu} {dong} OPEN HOUSE</div> :""}</p>

                {/* <p>{rangeValue ===0 ? <div>호호</div>:""}</p> */}
                <ShowDetail/>
                




            </div>


            </>

        )
    
}


export default LinkTest;