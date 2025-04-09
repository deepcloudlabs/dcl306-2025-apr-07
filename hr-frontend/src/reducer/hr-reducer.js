export default function HrReducer(hrState, action) {
    const newHrState = {...hrState};
    newHrState.employee = {...hrState.employee};
    switch (action.type) {
        case "MODEL_CHANGED":
            console.log(action)
            newHrState.employee[action.name] = action.value;
            break;
        case "HIRE_EMPLOYEE":
        case "UPDATE_EMPLOYEE":
            alert(`employee is hired/updated: ${action.status}`);
            break;
        case "FIND_EMPLOYEE":
        case "FIRE_EMPLOYEE":
        case "COPY_EMPLOYEE":
            for (let field in newHrState.employee) {
                if (action.employee.hasOwnProperty(field)) {
                    newHrState.employee[field] = action.employee[field];
                }
            }
            break;
        case "RETRIEVE_EMPLOYEES":
            newHrState.employees = action.employees;
            break;
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
    return newHrState;
}