import Container from "./common/container";
import Card from "./common/card";
import {useEmployee, useHrDispatcher} from "../provider/hr-provider";
import Badge from "./common/badge";

export default function Hr(){
    const employee = useEmployee();
    const hrDispatcher = useHrDispatcher();

    return (
        <Container>
            <p></p>
            <Card title={"Employee"}>
                <Badge label={"Full Name"}
                       value={employee.fullname}
                       isVisible={true}
                       color={"bg-primary"}/>
            </Card>
            <p></p>
            <Card title={"Employees"}></Card>
        </Container>
    );
}