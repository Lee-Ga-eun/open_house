import { render } from "@testing-library/react";
import Header from "./header";
import { useLocation } from 'react-router';



function LinkTest(props){
    const location = useLocation();
    const sido=location.state.sido;
    const sigungu=location.state.sigungu;
    const dong=location.state.dong;



        return(
            <>
            <Header/>
            <div>
                <p>{sido} {sigungu} {dong} OPEN HOUSE</p>
            
            </div>

            </>

        )
    
}


export default LinkTest;