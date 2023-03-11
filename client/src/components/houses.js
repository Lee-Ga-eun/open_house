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
import Pagination from "react-js-pagination";
import './Paging.css';
import { Link } from "react-router-dom";


// openhouse들 컴포넌트
function HousesCard({ind,sido,sigungu,dong, imgUrl,uplodDate,id}){
    
    return(
        <>
    {/* <Link to={{pathname:`/houses/upload/posting?id=${id}`,state:{previousUrl:1},}} style={{ textDecoration: "none", color:"black"}}> */}
    {/* <Link to={{pathname:`/houses/upload/posting`, search:`?id=${id}`}} state={{previousUrl:"what"}} style={{ textDecoration: "none", color:"black"}}> */}
    {/* <Link to={{pathname:`/houses/upload/posting`, search:`?id=${id}`, state:{previousUrl:'state'}}} style={{ textDecoration: "none", color:"black"}}> */}
    <Link to={`/houses/upload/posting?id=${id}`} state={{urlState:'fromHouses'}} style={{ textDecoration: "none", color:"black"}}>
    <Card style={{marginTop:'10px'}} >
      <Card.Body>
        <div>
        {sido} {sigungu} {dong} 
        </div> 
        <div> 
        </div>
        <div>
            {imgUrl!==null ? 
            <img src={`http://localhost:5001`+imgUrl} alt="urlimage" style={{width:'50%'}}/>
            :""}
        </div>
        <div>
            {uplodDate}
        </div>
        </Card.Body>
    </Card>
    </Link>
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

    const [dataTest, setDataTest]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5001/api/houses/upload")
        .then((res)=>{
        setDataTest(res.data);
        // console.log(Object.keys(res.data));
        })},[]);
        // console.log(dataTest);

      const changeRange=(e)=>{
        try{
            setRangeValue(e.target.value);
            console.log(rangeValue);
            <ShowDetail/>
        }catch{}};

        //const [tmp,setTmp]=useState([]);
    const [totalsize,setTotalSize]=useState(0);
    var sizeofdata=0;
      const ShowDetail=()=>{
        if (rangeValue == 0){
            let tmp=[];
            for(var i=0;i<=dataTest.length;i++){
                var tmpData=dataTest[i];
                if(tmpData!=undefined && tmpData['SIDO'] == sido){
                    tmp.push(tmpData); // useState를 쓰면 state가 변경될 때마다 리렌더링돼서 무한로딩 발생함
                };
             };
            sizeofdata=tmp.length;
            setTotalSize(sizeofdata);
            tmp=tmp.slice(5*page-5,5*page);
            console.log(tmp);
            return(
                <div>
                    {/* {dataTest.map((i,index) =>  dataTest[index].SIDO===sido? 
                    <div key={index}><HousesCard sido={dataTest[index].SIDO} sigungu={dataTest[index].SIGUNGU} dong={dataTest[index].DONG}/></div> 
                    : "")}</div> */}
                    {tmp.map((i,index) =>  tmp[index].SIDO===sido? 
                        <div key={index}><HousesCard ind={index} sido={tmp[index].SIDO} sigungu={tmp[index].SIGUNGU} dong={tmp[index].DONG} imgUrl={tmp[index].IMAGE_NAME}
                        uplodDate={(tmp[index].uploadedTime).slice(0,10)} id={tmp[index].ID}/></div> 
                        : "")}</div>
            )
        }else if(rangeValue==5){
            return(
                <div>{dataTest.map((i,index) =>  dataTest[index].SIDO===sido && dataTest[index].SIGUNGU ===sigungu? 
                    <div key={index}><HousesCard sido={dataTest[index].SIDO} sigungu={dataTest[index].SIGUNGU} dong={dataTest[index].DONG}
                    imgUrl={dataTest[index].IMAGE_NAME} uplodDate={(dataTest[index].uploadedTime).slice(0,10)} id={dataTest[index].ID}/></div> 
                    : "")}</div>
            )
        }else if(rangeValue==10){
            return(
                <div>{dataTest.map((i,index) =>  dataTest[index].SIDO===sido && dataTest[index].SIGUNGU ===sigungu&&dataTest[index].DONG ===dong? 
                    <div key={index}><HousesCard sido={dataTest[index].SIDO} sigungu={dataTest[index].SIGUNGU} dong={dataTest[index].DONG}
                    imgUrl={dataTest[index].IMAGE_NAME}
                        uplodDate={(dataTest[index].uploadedTime).slice(0,10)} id={dataTest[index].ID}/></div> 
                    : "")}</div>
            )
        }
    };

        const [page, setPage] = useState(1);

        const handlePageChange = (page) => {
        setPage(page);
        console.log("현재페이지",page);
        };

        return(
            <>
            <Header/>

            {/* {dataTest[0] ? dataTest.map((i,index) => <div key={index}>{dataTest[index].NAME}</div>) :""} */}
            {/* IF문으로 걸러내기 :: 지역 조회에 활용 가능할 것 같음.  */}
            {/* {dataTest.map((i,index) =>  dataTest[index].NAME==sido ? <div key={index}>{dataTest[index].NAME}</div> : "")} */}
            <br></br>
            <div className="Container" style={{backgroundColor:'none', width:'80%',alignItems:'center',margin:'0% 10%',justifyContent:'center',}}>


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

                <p>{rangeValue==0 ? <div>{sido} OPEN HOUSE</div> :
                    rangeValue==5 ? <div>{sido} {sigungu} OPEN HOUSE</div> :
                    rangeValue==10 ? <div>{sido} {sigungu} {dong} OPEN HOUSE</div> :""}</p>

                {/* <div>{sizeofdata}</div> */}
                <ShowDetail/> {/* 카드 출력 */}

                <Pagination
                activePage={page} // 현재 클릭되어 있는 페이지
                itemsCountPerPage={5} //한 페이지 당 아이템수
                totalItemsCount={totalsize} // 총 아이템수
                pageRangeDisplayed={5}
                prevPageText={'‹'}
                nextPageText={'›'}
                onChange={handlePageChange}
                />
            


            </div>


            </>

        )
    
}


export default LinkTest;