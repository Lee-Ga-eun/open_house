import React, { Component } from "react";
import { useEffect, useState } from "react";

class DbTest extends Component{
    state={
        member: ""
    }

    componentDidMount(){
        this.callApi()
        .then(res=> this.setState({member:res}))
        .catch(err => console.log(err));
    }

    callApi= async () =>{
        const response= await fetch("/api/dbTest");
        const body=await response.json();
        console.log(body);
        console.log("callApi 실행 완료");
        return body;
    }
    
    render(){
        const {classes}=this.props;

        // useEffect(()=>{
        //     if(this.state.member){
        //         console.log(this.state.member);
        //         var memberTest=this.state.member[Object.keys(this.state.member)];
        //     }
        // },[memberTest]);

        const mem=this.state.member;
        // console.log("되는 거야?",this.state.member,(typeof(this.state.member)));
        // console.log(mem[Object.keys(mem)]);
        var tmp=mem[Object.keys(mem)];
        //tmp ? console.log(tmp["NAME"]): "";
        //tmp ? console.log(tmp["ID"]) : "";
        // console.log(tmp["NAME"]);
        // console.log(Object.keys(tmp));
        // console.log(Object.values(this.state.member));
        // console.log(JSON.stringify(this.state.member));
        // const memberList=JSON.stringify(this.state.member);
        // var arr=new Array(this.state.member[0]);
        // console.log("arr",arr);
        // const obj=JSON.parse(memberList);
        
        
        // console.log("entries",Object.entries(this.state.member));
        // const values=Object.values(this.state.member);
        // console.log("values",values);
        return(
            <div className={classes}>
                <p>{tmp ? (tmp["NAME"]): ""}</p>

                {/* <div>{Object.keys(this.state.member).map(i=>this.state.member[i])}</div> */}
                {/* {this.state.member.map(i => {return<div key={i.id}>{i.name}</div>})} */}
                {/* <div>{this.state.member}</div> */}
                {/* <div>{this.state.member}</div> */}
                {/* <div key={this.state.member.id}>{this.state.member.name}</div> */}
                {/* <div>리스트: {memberList}</div> */}
                {/* {this.state.member ? this.state.member.map(i=>{return (<DbTest key={i.id} id={i.id}></DbTest>)}):""} */}
            </div>
        )
    }
}

export default DbTest;