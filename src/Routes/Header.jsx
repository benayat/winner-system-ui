import "./Header.css";
import StartButton from "../Components/HeaderComponents/StartButton";
import {useSelector, useDispatch} from "react-redux";
import {startSeason} from "../api/api";
import {setSeasonActive} from "../redux/seasonReducer";

const Header = () => {
    let timerActive = useSelector((state) => state.timer.isTimerActive);
    let timer = useSelector((state) => state.timer.timer);
    const seasonActive = useSelector((state) => state.season.seasonActive);
    const dispatch = useDispatch();


    const onStartButtonClick = (e) => {
        startSeason().then(() => {
            dispatch(setSeasonActive(true));
        }).catch((e) => console.log(e));
    }
    return (
        <div className="app-header">
            <StartButton onClick={onStartButtonClick} disabled={seasonActive === true}/>
            {timerActive && <h5>{timer}</h5>}
        </div>
    );

}
export default Header;