export default function HrReducer(hrState, action) {
    const newHrState = {...hrState};
    newHrState.employee = {...hrState.employee};
    switch(action.type) {
        case "MODEL_CHANGED":
            newHrState.employee[action.name] = action.value;
            break;
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
    return newHrState;
}