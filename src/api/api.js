import {instance as axios} from './axiosDefinition';
export const registerUser = async (userDetails) => {
    return axios.post('/api/user/signup', userDetails);
}
export const updateEmail = async (email) => {
    return axios.post('/api/user/update-email', email);
}
export const updateUsername = async (username) => {
    return axios.post('/api/user/update-username', username);
}
export const deleteUser = async (userEmail) => {
    return axios.post('/api/user/delete', userEmail);
}
export const login = async ({email, password}) => {
    const form = new FormData();
    form.append('username', email);
    form.append('password', password);
    return await axios.post('/login', form);
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
export const getBalance = async () => {
    return axios.get('/api/user/balance');
}
