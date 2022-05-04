import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import {updateEmployeeData} from "../../../actions/ampApi/putData";
import Tabulator from "tabulator-tables";


class AllEmployeesTabulator extends Component {


    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;

        this.dataEditedFunc = this.dataEditedFunc.bind(this);
    }


    componentDidMount() {
        let columns = [
            {title: "ID", width: 150, field: "employee_id"},
            {title: "First Name", field: "employee_first_name", editor: "input"},
            {title: "Last Name", field: "employee_last_name", editor: "input"},
            {title: "Email", field: "employee_email", editor: "input"},
            {title: "Phone", field: "employee_phone", editor: "input"},
            {title: "Permission Type", field: "permission_type"},
        ];

        this.tabulator = new Tabulator(this.el, {
            columns: columns,
            layout: "fitColumns",
            data: this.props.data,
            reactiveData: true,
            height: "500px",
            cellEdited: this.dataEditedFunc
        })


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        this.tabulator.replaceData(this.props.data)


    }

    dataEditedFunc(cellData) {
        this.props.dispatch(updateEmployeeData(cellData._cell.row.data.employee_id, cellData._cell.column.field, cellData._cell.value))
    };


    render() {

        return (

            <div className="emailTabulatorContainer">
                <div ref={el => (this.el = el)}/>
            </div>

        )
    }


}

function mapStateToProps({
                             globalsReducer,
                             employeesReducer
                         }, {props}) {

    let data = []
    let columns = []


    let formatData = (employee) => {

        return {
            employee_id: employee.employee_id,
            employee_first_name: employee.employee_first_name,
            employee_last_name: employee.employee_last_name,
            employee_email: employee.employee_email,
            employee_phone: employee.employee_phone,
            permission_type: employee.permission_type,

        }
    }

    if (employeesReducer !== undefined) {
        Object.keys(employeesReducer).forEach(function (key) {
            data.push(formatData(employeesReducer[key]))
        });

    }
    return {
        data,
        columns,
        semester: globalsReducer['currentSemester'],
        employeesReducer
    }
}


export default withRouter(connect(mapStateToProps)(AllEmployeesTabulator))