import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import Tabulator from "tabulator-tables"


class AllEmployeesTabulator extends Component {


    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
    }


    componentDidMount() {
        let columns = [
            {title: "ID", width: 150, field: "employee_id"},
            {title: "First Name", field: "employee_first_name"},
            {title: "Last Name", field: "employee_last_name"},
            {title: "Email", field: "employee_email"},
            {title: "Phone", field: "employee_phone"},
            {title: "Permission Type", field: "permission_type"},
        ];

        this.tabulator = new Tabulator(this.el, {
            columns: columns,
            layout: "fitColumns",
            data: this.props.data,
            reactiveData: true,
            height: "500px",
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        this.tabulator.replaceData(this.props.data)


    }

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


    let employeeFormatData = (employee) => {

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
            data.push(employeeFormatData(employeesReducer[key]))
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