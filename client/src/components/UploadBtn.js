// 게시글 글쓰기 업로드

import { Link } from "react-router-dom"

function UploadBtn({name}){
    return (
    <>
    <Link to='/houses/upload'>
    <button style={{
        backgroundColor:'tomato', 
        border:'None', 
        borderRadius:'3px',
        color:'whitesmoke',
        marginLeft:'80%'
    
    }}>{name}</button>
    </Link>
    <br></br>
    </>
    )
}

export default UploadBtn