
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import Tabulator from "tabulator-tables"
import {reactFormatter} from "react-tabulator";
import Button from "@material-ui/core/Button";
import moment from "moment";



class EmailTemplateTabulator extends Component {


    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;


    }

    sendEmail(props)  {
        const cellData = props.cell;
        if (cellData._cell.row.data.sent === true) {
            return  <Button variant="contained" color="secondary" size="small" onClick={e => console.log("YY")}>Sent</Button>

        } else {

            return  <Button variant="contained" color="primary" size="small" onClick={e => console.log("YY")}>Send</Button>
        }
    };



    componentDidMount() {
        let columns = [
            {title:"Course", width:150, field:"course_gen_id"},
            {title: "Employee", field: "employee_name"},
            {title: "Email", field: "employee_email"},
            {title: "Sent", field: "sent", formatter: "tick", width:60},
            {title: "Sent Date", field: "sent_date" },
            { title: "Send", width:80, hozAlign :"center",  formatter:reactFormatter(<this.sendEmail/>)}
        ];

        this.tabulator = new Tabulator(this.el, {
            columns: columns,
            layout:"fitColumns",
            data: this.props.data,
            reactiveData: true,
            height: "500px",
        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (JSON.stringify(prevProps.coursesReducer) !== JSON.stringify(this.props.coursesReducer)) {
            this.tabulator.replaceData(this.props.data)

        }

    }

    render() {

        return(

            <div className="emailTabulatorContainer">
                <div ref={el => (this.el = el)} />
            </div>

        )
    }



}





function mapStateToProps({coursesReducer}, {props}) {

    let data = []
    let columns = []



    let formatData = (course) => {
        return {
            id: course.course_gen_id,
            course_gen_id: course.course_gen_id,
            employee_name: course.course_instructor.employee_first_name + " " + course.course_instructor.employee_last_name,
            employee_email: course.course_instructor.employee_email,
            sent: course.ilearn_video_service_requested === true,
            sent_date: moment(course.student_requests_captions_email_sent_date).format('MM-DD-YY'),

        }
    };


    if (coursesReducer !== undefined) {

        Object.keys(coursesReducer).forEach((item) => {

            if (coursesReducer[item].ilearn_video_service_requested === true) {
                data.push(formatData(coursesReducer[item]))
            }


        })
    }


    return {
        data,
        columns


    }
}


export default withRouter(connect(mapStateToProps)(EmailTemplateTabulator))