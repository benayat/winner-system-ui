import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    blockBets: true,
    inActiveGame: false,
    seasonActive: false,
}
export const seasonSlice = createSlice({
    name: 'season',
    initialState,
    reducers: {
        setBlockBets: (state, action) => {
            state.blockBets = action.payload;
        },
        setInActiveGame: (state, action) => {
            state.inActiveGame = action.payload;
        },
        setSeasonActive: (state, action) => {
            state.seasonActive = action.payload;
        },
    },
});
export const {setBlockBets, setInActiveGame, setSeasonActive} = seasonSlice.actions;
export default seasonSlice.reducer;