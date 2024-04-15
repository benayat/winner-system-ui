import React, {useEffect, useState} from 'react';
import './BetsInterface.css';
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import {getBalance, placeBets} from "../../api/api";

const BetsInterface = ({allGames}) => {
        let [bets, setBets] = useState(Array(allGames.length).fill("no bet"));
        let [betAmounts, setBetAmounts] = useState(Array(allGames.length).fill(0));
        let [balance, setBalance] = useState(-1);
        console.log("all games: ", allGames);

        useEffect(() => {
        getBalance().then((response) => {
            setBalance(response.data["balance"]);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
        const handleTeamChoiceChange = (event, index) => {
            // debugger;
            console.log(event.target.value);
            setBets(bets.map((bet, i) => i === index ? event.target.value : bet));
        }
        const handleBetAmountChange = (event, index) => {
            setBetAmounts(betAmounts.map((betAmount, i) => i === index ? event.target.value : betAmount));
        }
        const handleSubmit = (event) => {
            event.preventDefault();
            console.log("submitted");
            console.log("all games: ", allGames);

            const betGames = allGames.filter((game, index) => bets[index] !== "no bet" && betAmounts[index] !== null).map((game, index) => {
                    return {
                        team1Name: game.team1Name,
                        team2Name: game.team2Name,
                        expectedWinner: bets[index].toUpperCase(),
                        amount: betAmounts[index],
                    };
                }
            );
            console.log("submitting. bet games: ", betGames);
            if (betGames.reduce((acc, game) => acc + game.amount, 0) > balance) {
                alert("Not enough balance");
                return;
            }
            placeBets(betGames).then(() => {
                console.log("bets placed successfully");
            })
                .catch((error) => {
                    console.log(error);
                });
        }


        return (
            <div className={"personal-bets-interface"}>
                {balance <= 0 ? <h2>balance is too low to bet</h2> :
                    (<form onSubmit={handleSubmit}>
                            {allGames.map((game, index) => (
                                <FormControl>
                                    <FormLabel
                                        id="bet-game-group-label">{`${game["team1Name"]}:${game["team1Chances"]} VS ${game["team2Name"]}:${game["team2Chances"]}, tie:${game["tieChances"]}`}</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="bet-game-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={(event) => handleTeamChoiceChange(event, index)}
                                        defaultValue="no bet"
                                    >
                                        <FormControlLabel value={"team1"} control={<Radio/>} label="team1"/>
                                        <FormControlLabel value={"team2"} control={<Radio/>} label="team2"/>
                                        <FormControlLabel value={game["tie"]} control={<Radio/>} label="tie"/>
                                        <FormControlLabel value={"no bet"} control={<Radio/>} label="no bet"/>
                                    </RadioGroup>
                                    {bets[index] !== "no bet" && (
                                        <TextField // New TextField for bet amount
                                            required={false}
                                            label="Bet Amount"
                                            type="number"
                                            placeholder={"Enter bet amount"}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={betAmounts[index] !== 0 ? betAmounts[index] : ""}
                                            onChange={(event) => handleBetAmountChange(event, index)}
                                        />
                                    )}
                                </FormControl>
                            ))}
                            <Button variant="contained" type="submit" color="primary">Submit</Button>
                        </form>
                    )}
            </div>
        );
    }
;

export default BetsInterface;