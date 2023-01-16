import React, { useEffect, useState } from "react";
import axios from "axios";
import { render } from "@testing-library/react";

function Test(){
    const [dbList, setdbList]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5001/api/dbTest")
        .then((res)=>{
            if(res.data){
                setdbList(res.data);
            }
        });
    },[]);

    
    //render(){
        return(
            <div>
                <p>뭐가문제지</p>
            </div>
        )
    }
    


export default Test;