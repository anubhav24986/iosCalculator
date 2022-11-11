import React from "react";

import Calculator from "./components/calculator";
import ThemeLayout from "./components/themeLayout";


document.title = 'Ios Calculator';
//ThemeLayout Component is using for color change 
const App: React.FC = () => {

    return <div className="App">
        <ThemeLayout/>
       <Calculator/>
    </div>
}
export default App;