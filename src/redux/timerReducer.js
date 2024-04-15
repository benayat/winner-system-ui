import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isTimerActive: false,
    timer: "",
}
export const timerSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setTimerActive: (state, action) => {
            state.isTimerActive = action.payload;
        },
        setTimer: (state, action) => {
            state.timer = action.payload;
        },
    },
});
export const {setTimerActive, setTimerType, setTimer} = timerSlice.actions;
export default timerSlice.reducer;