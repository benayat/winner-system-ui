import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userReducer';
import dashboardReducer from './dashboardRecucer';
import seasonReducer from './seasonReducer';
import timerReducer from "./timerReducer";



export default configureStore({
    reducer: {
        user: userReducer,
        dashboard: dashboardReducer,
        season: seasonReducer,
        timer: timerReducer,
    },
})
