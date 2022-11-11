import React from "react";

interface Iprops{
    visible :boolean
}
//Loader is used when network is slow. It blocks the UI
const Loader = ({visible}:Iprops): React.ReactElement => {

    if(visible){
        return (<div style={{zIndex:999,position:"absolute",color:"white",width:"100vw",height:"100vh"}}>Calculating...</div>)

    }
    return(<></>)
   
}
export default Loader;