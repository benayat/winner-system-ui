import React from 'react';
import './LiveGamesComponent.css';
import {allGamesDataArray, allGamesHeadsArray, selectedGamesDataArray, selectedGamesHeadsArray} from "../../constants";

const LiveGamesComponent = ({type, matchesToDisplay}) => {
    const getTableHeadsArray = () => {
        if (type === "selected games") {
            return selectedGamesHeadsArray;
        } else {
            return allGamesHeadsArray;
        }
    }
    const getTableDataArray = () => {
        if (type === "selected games") {
            return selectedGamesDataArray;
        } else {
            return allGamesDataArray;
        }
    }

    return (
        <div className={"period-games-dashboard"}>
            <h1>Period Games Dashboard</h1>
            <table>
                <thead>
                <tr>
                    {getTableHeadsArray().map((head,index) => (
                        <th key={index+"th"}>{head}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {matchesToDisplay.map((game, gameIndex) => (
                    <tr key={gameIndex+"tr"}>
                        {getTableDataArray().map((data, dataIndex) => (
                            <td key={dataIndex+"td"}>{game[data]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LiveGamesComponent;