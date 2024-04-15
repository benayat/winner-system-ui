import teamsTableImage from './icons/teams_table_icon.png';
import betsInterfaceImage from './icons/winner_icon.png';
import liveGamesImage from './icons/live_games_icon.png';


export const GUEST_PERMISSION = "Guest";
export const USER_PERMISSION = "User";

export const sidebarItems = [
    {title: "Teams table", icon: teamsTableImage, permission: GUEST_PERMISSION},
    {title: "Live games results", icon: liveGamesImage, permission: GUEST_PERMISSION},
    {title: "Bets interface", icon: betsInterfaceImage, permission: USER_PERMISSION},
    {title: "Selected live game results", icon: liveGamesImage, permission: USER_PERMISSION},
];

export const userActions = {
    guest: ["login", "signup"],
    user: ["update user name", "update email", "logout"]
}
export const allGamesHeadsArray = ["First Team", "First Team Goals", "Second Team", "Second Team Goals", "Current Winner"];
export const allGamesDataArray = ["team1Name", "team1Goals", "team2Name", "team2Goals", "winner"];
export const selectedGamesHeadsArray = ["First Team", "First Team Goals", "First Team Chances", "Second Team", "Second Team Goals", "Second Team Chances", "Current Winner"];
export const selectedGamesDataArray = ["team1Name", "team1Goals", "team1Chances", "team2Name", "team2Goals", "team2Chances", "winner"];
export const LANDING_PAGE_ADDRESS = "/";
export const TIME_BEFORE_PERIOD = 60;
export const GAME_RUNNING_TIME = 30;
export const API_BASE_ADDRESS = "http://localhost:8080";