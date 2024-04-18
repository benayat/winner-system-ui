import './Dashboard.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TeamsTable from "../Components/DashboardComponents/TeamsTable";
import {createSimpleSse, createSecureSse} from "../api/sseConfig";
import LiveGamesComponent from "../Components/DashboardComponents/LiveGamesComponent";
import BetsInterface from "../Components/DashboardComponents/BetsInterface";
import {setTimerActive, setTimer} from "../redux/timerReducer";
import {getBetGamesAndChances} from "../api/api";

const Dashboard = () => {
    // let blockBets = useSelector((state) => state.season.blockBets);
    const [blockBets, setBlockBets] = useState(true);
    const [secureSse, setSecureSse] = useState(null);
    const [simpleSse, setSimpleSse] = useState(null);
    let activeItem = useSelector((state) => state.dashboard.activeItem);
    let userName = useSelector((state) => state.user.userName);
    let seasonActive = useSelector((state) => state.season.seasonActive);

    const dispatch = useDispatch();
    const [betGames, setBetGames] = useState("");
    const [tempResults, setTempResults] = useState([]);
    const [filteredBetGames, setFilteredBetGames] = useState([]);


    useEffect(() => {
        if (userName !== "Guest") {
            let secureSseLocal;
            if (secureSse === null) {
                secureSseLocal = createSecureSse();
                setSecureSse(secureSseLocal);
            } else {
                secureSseLocal = secureSse;
            }
            secureSseLocal.onmessage = (e) => {
                const eventData = JSON.parse(e.data);
                if (eventData["blockBets"] === true) {
                    setBlockBets(true);
                    getBetGamesAndChances().then((response) => {
                        setFilteredBetGames(betGames.filter((game) => response.data.map((game) => game["team1Name"]).includes(game["team1Name"])));
                    });
                } else {
                    setBlockBets(false);
                    setBetGames(eventData["matchChancesForUpcomingPeriod"].map(matchChances => ({
                        team1Name: matchChances["team1Name"],
                        team1Goals: 0,
                        team1Chances: matchChances["team1Chances"],
                        team2Name: matchChances["team2Name"],
                        team2Chances: matchChances["team2Chances"],
                        team2Goals: 0,
                        tieChances: matchChances["tieChances"],
                        winner: "Not yet started"
                    })));
                }
            }

            // return () => {
            //     secureSseLocal.close();
            // }
        }
    }, [betGames, secureSse, userName]);
    useEffect(() => {
            let simpleSseLocal;
            if (simpleSse === null) {
                simpleSseLocal = createSimpleSse();
                setSimpleSse(simpleSseLocal);
            } else {
                simpleSseLocal = simpleSse;
            }
            simpleSseLocal.onmessage = (e) => {
                const eventData = JSON.parse(e.data);
                switch (eventData["event"]) {
                    case "MATCH_STARTED_EVENT":
                        setTempResults(eventData["allMatches"].map(match => ({
                            team1Name: match["team1"],
                            team1Goals: 0,
                            team2Name: match["team2"],
                            team2Goals: 0,
                            winner: "Not yet started"
                        })));
                        break;
                    case "MATCH_ENDED_EVENT":
                        break;
                    case "GOAL_CYCLE_EVENT":
                        setTempResults(eventData["matchResults"]);
                        if (userName !== "Guest") {
                            setFilteredBetGames(filteredBetGames.map((match, index) => {
                                const currentMatch = eventData["matchResults"][index];
                                return {
                                    ...match, team1Goals: currentMatch.team1Goals,
                                    team2Goals: currentMatch.team2Goals,
                                };
                            }));
                        }
                        break;
                    case "TIMER_EVENT":
                        if (eventData["value"] === 0) {
                            dispatch(setTimerActive(true));
                        } else if ((eventData["timerType"] === "MATCH" && eventData["value"] === 90)
                            || (eventData["timerType"] === "BETS" && eventData["value"] === 60)) {
                            dispatch(setTimerActive(false));
                        }
                        dispatch(setTimer(eventData["message"]));
                        break;
                    default:
                        break;
                }
            }
            // return () => {
            //     simpleSseLocal.close();
            // }
        }
        ,
        [betGames, dispatch, filteredBetGames, simpleSse, tempResults, userName]
    )


    const renderComponent = () => {
        switch (activeItem) {
            case "Teams table":
                return <TeamsTable/>;
            case "Bets interface":
                return (blockBets === true || betGames === "") ? null : <BetsInterface allGames={betGames}/>;
            case "Live games results":
                return tempResults !== [] ? <LiveGamesComponent type={"all games"}
                                                                matchesToDisplay={tempResults}/> : null;
            case "Selected live game results":
                if (!betGames) return null;
                return <LiveGamesComponent type={"selected games"} matchesToDisplay={filteredBetGames}/>;
            default:
                return null;
        }
    }

    return seasonActive === true && (
        <div className={'dashboard-container'}>
            {renderComponent()}
        </div>
    )
}
export default Dashboard;