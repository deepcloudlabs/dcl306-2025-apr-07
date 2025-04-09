import Container from "./common/container";
import Card from "./common/card";
import {useDepartments, useEmployee, useEmployees, useHrDispatcher} from "../provider/hr-provider";
import InputText from "./common/input-text";
import SelectBox from "./common/select";
import CheckBox from "./common/check-box";
import Photo from "./common/photo";
import Button from "./common/button";
import Table from "./common/table";

export default function Hr(){
    const employee = useEmployee();
    const hrDispatcher = useHrDispatcher();
    const departments = useDepartments();
    const employees = useEmployees();

    //region handle methods
    const findEmployeeById = () => {
        fetch(`http://localhost:4001/employees/${employee.identityNo}`,{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(employee => {
                hrDispatcher({type: "FIND_EMPLOYEE", employee});
            })
    }
    const fireEmployee = () => {
        fetch(`http://localhost:4001/employees/${employee.identityNo}`,{
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(employee => {
                hrDispatcher({type: "FIRE_EMPLOYEE", employee});
            })
    }
    const hireEmployee = () => {
        fetch("http://localhost:4001/employees",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        }).then(res => res.json())
            .then(res => {
                    hrDispatcher({type: "HIRE_EMPLOYEE", status: res.status});
            })
    }
    const updateEmployee = () => {
        fetch("http://localhost:4001/employees",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        }).then(res => res.json())
            .then(res => {
                hrDispatcher({type: "UPDATE_EMPLOYEE", status: res.ok === 1 ? "OK" : "FAILED"});
            })
    }
    const retrieveEmployees = () => {
        fetch(`http://localhost:4001/employees`,{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(employees => {
                hrDispatcher({type: "RETRIEVE_EMPLOYEES", employees});
            })
    }

    const handleInputChange = (event) => {
        hrDispatcher({type: "MODEL_CHANGED", name: event.target.name, value: event.target.value});
    }
    const handleCheckBoxChange = (event) => {
        hrDispatcher({type: "MODEL_CHANGED", name: event.target.name, value: event.target.checked});
    }
    const handlePhotoChange = (values) => {
        hrDispatcher({type: "MODEL_CHANGED", name: "photo", value: values});
    }
    //endregion

    const copyEmployeeAtRow = (emp,idx) => {
        hrDispatcher({type: "COPY_EMPLOYEE", employee: emp, index: idx});
    }
    return (
        <Container>
            <p></p>
            <Card title={"Employee"}>
                <InputText value={employee.identityNo}
                           id={"identityNo"}
                           placeholder={"Enter a valid identity no"}
                           handleChange={handleInputChange}
                           label={"Identity No"}/>
                <Button click={findEmployeeById}
                        color={"btn-primary"}
                        label={"Find"}></Button>
                <Button click={fireEmployee}
                        color={"btn-danger"}
                        label={"Fire"}></Button>
                <InputText value={employee.fullname}
                           id={"fullname"}
                           placeholder={"Enter full name"}
                           handleChange={handleInputChange}
                           label={"Full Name"}/>
                <InputText value={employee.iban}
                           id={"iban"}
                           placeholder={"Enter a valid iban"}
                           handleChange={handleInputChange}
                           label={"IBAN"}/>
                <InputText value={employee.salary}
                           id={"salary"}
                           placeholder={"Enter salary"}
                           handleChange={handleInputChange}
                           label={"Salary"}/>
                <InputText value={employee.birthYear}
                           id={"birthYear"}
                           placeholder={"Enter birth year"}
                           handleChange={handleInputChange}
                           label={"Birth Year"}/>
                <SelectBox id={"department"}
                           label={"Department"}
                           value={employee.department}
                           handleChange={handleInputChange}
                           optionValues={departments}
                />
                <CheckBox value={employee.fulltime}
                          id={"fulltime"}
                          handleChange={handleCheckBoxChange}
                          label={"Full time?"}/>
                <Photo value={employee.photo}
                       id={"photo"}
                       handleChange={handlePhotoChange}
                       label={"Photo"}/>
                <Button click={hireEmployee}
                        color={"btn-warning"}
                        label={"Hire"}></Button>
                <Button click={updateEmployee}
                        color={"btn-success"}
                        label={"Update"}></Button>
            </Card>
            <p></p>
            <Card title={"Employees"}>
                <Button click={retrieveEmployees}
                        color={"btn-warning"}
                        label={"Retrieve Employees"} />
                <Table headers={["Identity No","Full Name","Salary","IBAN","Birth Year","Department","Full Time?"]}
                       fields={["identityNo","fullname","salary","iban","birthYear","department","fulltime"]}
                       values={employees}
                       handleRowClick={copyEmployeeAtRow}
                       keyField={"identityNo"} />
            </Card>
        </Container>
    );
}