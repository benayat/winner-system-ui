import {instance as axios} from './axiosDefinition';
export const registerUser = async (userDetails) => {
    return axios.post('/api/user/signup', userDetails);
}
export const updateEmail = async (email, newEmail) => {
    return axios.put(`/api/user/update-email?email=${email}&new-email=${newEmail}`);
}
export const updateUsername = async (email, newUsername) => {
    return axios.put(`/api/user/update-username?email=${email}&new-username=${newUsername}`);
}
export const updatePassword = async (email, newPassword) => {
    return axios.put(`/api/user/update-password?email=${email}&new-password=${newPassword}`);
}
export const deleteUser = async (userEmail) => {
    return axios.post('/api/user/delete', userEmail);
}
export const getLoggedInUser = async () => {
    return axios.get('/api/user/');
}
export const login = async ({email, password, rememberMe}) => {
    const form = new FormData();
    form.append('username', email);
    form.append('password', password);
    form.append('remember-me', rememberMe);
    return await axios.post('/login', form);
}
export const logout = async () => {
    return axios.post('/logout');
}
// all teams sorted by points descending then by goals descending then by name ascending
export const getTeams = async () => {
    return axios.get('/api/team/sorted');
}
export const startSeason = async () => {
    return axios.post('/api/season/start');
}

export const placeBets = async (bets) => {
    return axios.post('/api/bets/place-bets', bets);
}
export const getBetGamesAndChances = async () => {
    return axios.get('/api/bets/get-bet-games');
}
export const getBalance = async () => {
    return axios.get('/api/user/balance');
}
