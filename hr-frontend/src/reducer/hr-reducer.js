export default function HrReducer(hrState, action) {
    const newHrState = {...hrState};
    switch(action.type) {
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
    return newHrState;
}