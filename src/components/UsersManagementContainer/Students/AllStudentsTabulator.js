import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import Tabulator from "tabulator-tables";
import {updateStudentData} from "../../../actions/ampApi/putData";


class AllStudentsTabulator extends Component {


    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;

        this.dataEditedFunc = this.dataEditedFunc.bind(this);
    }


    componentDidMount() {
        let columns = [
            {title: "ID", width: 150, field: "student_id"},
            {title: "First Name", minWidth: 200, field: "student_first_name", editor: "input"},
            {title: "Last Name", minWidth: 200, field: "student_last_name", editor: "input"},
            {title: "Email", minWidth: 200, field: "student_email", editor: "input"},
            {
                title: "Transcripts Only",
                width: 50,
                field: "transcripts_only",
                hozAlign: "center",
                formatter: "tickCross"
            },
            {title: "Requests", minWidth: 215, field: "student_requests", editor: "input"},

        ];

        this.tabulator = new Tabulator(this.el, {
            columns: columns,
            layout: "fitData",
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
        this.props.dispatch(updateStudentData(cellData._cell.row.data.student_id, cellData._cell.column.field, cellData._cell.value))
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
                             studentsReducer

                         }, {props}) {

    let data = []
    let columns = []


    let formatData = (student) => {

        return {
            student_id: student.student_id,
            student_first_name: student.student_first_name,
            student_last_name: student.student_last_name,
            student_email: student.student_email,
            student_phone: student.student_phone,
            // student_requests: "this is a very long request. this is a very long request. this is a very long request. this is a very long request. this is a very long request. this is a very long request. this is a very long request. ",
            student_requests: student.student_requests,
            transcripts_only: student.transcripts_only,


        }
    }


    if (studentsReducer.content !== undefined) {

        Object.keys(studentsReducer.content).forEach(function (key) {
            data.push(formatData(studentsReducer.content[key]))
        });

    }
    return {
        data,
        columns,
        semester: globalsReducer['currentSemester'],
        studentsReducer
    }
}


export default withRouter(connect(mapStateToProps)(AllStudentsTabulator))