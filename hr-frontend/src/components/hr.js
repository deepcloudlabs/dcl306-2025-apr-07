import Container from "./common/container";
import Card from "./common/card";
import {useDepartments, useEmployee, useHrDispatcher} from "../provider/hr-provider";
import InputText from "./common/input-text";
import SelectBox from "./common/select";
import CheckBox from "./common/check-box";
import Photo from "./common/photo";

export default function Hr(){
    const employee = useEmployee();
    const hrDispatcher = useHrDispatcher();
    const departments = useDepartments();

    const handleInputChange = (event) => {
        hrDispatcher({type: "MODEL_CHANGED", name: event.target.name, value: event.target.value});
    }
    const handlePhotoChange = (values) => {
        hrDispatcher({type: "MODEL_CHANGED", name: "photo", value: values});
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
                          handleChange={handleInputChange}
                          label={"Full time?"}/>
                <Photo value={employee.photo}
                       id={"photo"}
                       handleChange={handlePhotoChange}
                       label={"Photo"}/>

            </Card>
            <p></p>
            <Card title={"Employees"}></Card>
        </Container>
    );
}