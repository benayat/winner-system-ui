import React, {useEffect, useState} from 'react';
import {getTeams} from '../../api/api';
import './TeamsTable.css';

const TeamsTable = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams().then((response) => {
            setTeams(response.data)
        });
    }, []);
    return (
        teams ?
            <div className="teams-table">
                <h1>Teams Table</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Skill Level</th>
                        <th>Injuries</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teams.map((team) => (
                        <tr key={team["name"]}>
                            <td>{team["name"]}</td>
                            <td>{team["points"]}</td>
                            <td>{team["skillLevel"]}</td>
                            <td>{team["injuries"]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            :
            <h2>Loading Teams, please wait</h2>

    );
};

export default TeamsTable;