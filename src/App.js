import './App.css';
// import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebar from "./Routes/Sidebar";
import Dashboard from "./Routes/Dashboard";
import Header from "./Routes/Header";


const App = () => {

    return (
        <div className="App">
            {/*<BrowserRouter>*/}
            {/*    <Routes>*/}
            {/*        <Route path={"/"} element={<><Sidebar/><Header/><Dashboard/></>}/>*/}
            {/*    </Routes>*/}
            {/*</BrowserRouter>*/}
            <Sidebar/>
            <Header/>
            <Dashboard/>
        </div>
    );
}

export default App;
