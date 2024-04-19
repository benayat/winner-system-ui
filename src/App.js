import './App.css';
// import {BrowserRouter, Route, Pages} from "react-router-dom";
import Sidebar from "./Pages/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Header from "./Pages/Header";


const App = () => {

    return (
        <div className="App">
            {/*<BrowserRouter>*/}
            {/*    <Pages>*/}
            {/*        <Route path={"/"} element={<><Sidebar/><Header/><Dashboard/></>}/>*/}
            {/*    </Pages>*/}
            {/*</BrowserRouter>*/}
            <Sidebar/>
            <Header/>
            <Dashboard/>
        </div>
    );
}

export default App;
