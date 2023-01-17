import { render } from "@testing-library/react";
import Header from "./header";
import { useLocation } from 'react-router';


function LinkTest(){


    const location = useLocation();
    console.log(location);

        return(
            <>
            <Header/>
            <div>
                <p>{location.state.sido}</p>
                링크 테스트 성공
            </div>

            </>

        )
    
}


export default LinkTest;