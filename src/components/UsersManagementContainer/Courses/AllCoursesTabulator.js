import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import Tabulator from "tabulator-tables";


class AllCoursesTabulator extends Component {


    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;

        this.dataEditedFunc = this.dataEditedFunc.bind(this);
    }


    componentDidMount() {

        let columns = [
            {title: "ID", width: 150, field: "course_id"},
            {title: "Name", field: "course_name"},
            {title: "Section", field: "course_section"},
            {title: "Instructor ID", field: "employee_id"},
            {title: "Instructor Email", field: "employee_email", width: 250},
            {
                title: "Ilearn Video Service Requested",
                field: "ilearn_video_service_requested",
                hozAlign: "center",
                formatter: "tickCross"
            },
            {title: "Ilearn Page ID", field: "ilearn_id",},
            {title: "Canvas Page ID", field: "canvas_page_id"}

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
        //this function is to edit the cell on click
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
                             coursesReducer
                         }, {props}) {

    let data = []
    let columns = []


    let formatData = (course) => {


        let ilearn_data = course.ilearn_page_id
        let canvas_page_data = course.canvas_page_id;

        let canvas_page_id = null;
        let ilearn_page_id = null;

        if (canvas_page_data != null) {
            canvas_page_id = canvas_page_data.canvas_page_id;
        }

        if (ilearn_data != null) {
            ilearn_page_id = ilearn_data.ilearn_page_id;
        }

        return {
            course_id: course.course_gen_id,
            course_name: course.course_name,
            course_section: course.course_section,
            employee_id: course.employee_id,
            employee_email: course.course_instructor.employee_email,
            ilearn_video_service_requested: course.ilearn_video_service_requested,
            ilearn_id: ilearn_page_id,
            canvas_page_id: canvas_page_id,


        }

    }

    if (coursesReducer !== undefined) {
        Object.keys(coursesReducer).forEach(function (key) {
            data.push(formatData(coursesReducer[key]))
        });


    }
    return {
        data,
        columns,
        semester: globalsReducer['currentSemester'],
        coursesReducer
    }
}


export default withRouter(connect(mapStateToProps)(AllCoursesTabulator))