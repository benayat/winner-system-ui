// import {SSE} from "sse.js";


import {API_BASE_ADDRESS} from "../constants";

export const createSimpleSse = () => {
    const simpleSse = new EventSource(API_BASE_ADDRESS + '/api/sse-events/round', {
        withCredentials: false,
    });
    simpleSse.onopen = () => {
        console.log("simple sse open");
    }
    simpleSse.onerror = (e) => {
        console.log("error with simple-sse, trying to reconnect", e);
        setTimeout(() => {
            simpleSse.close();
            createSimpleSse();
        }, 1000);
    }
    return simpleSse;
}
export const createSecureSse = () => {
    const secureSse = new EventSource(API_BASE_ADDRESS + '/api/sse-events/bets', {
        withCredentials: true,
    });
    secureSse.onopen = () => {
        console.log("secure sse open");
    }
    secureSse.onerror = (e) => {
        console.log("error with secure-sse", e);
        setTimeout(() => {
            secureSse.close();
            createSecureSse();
        }, 1000);
    }
    return secureSse;

}


