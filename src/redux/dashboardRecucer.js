import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    activeItem: '',
}
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setActiveItem: (state, action) => {
            state.activeItem = action.payload;
        },
    },
});
export const {setActiveItem} = dashboardSlice.actions;
export default dashboardSlice.reducer;