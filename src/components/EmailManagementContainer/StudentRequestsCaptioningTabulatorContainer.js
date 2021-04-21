
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import Tabulator from "tabulator-tables"
import {reactFormatter} from "react-tabulator";
import Button from "@material-ui/core/Button";
import moment from "moment";
import {sendEmailCommandCourses} from "../../actions/ampApi/putData";



class StudentRequestsCaptioningTabulatorContainer extends Component {


    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
        this.sendEmailButton = this.sendEmailButton.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
    }


    sendEmail(e) {
        console.log(e)
        let params = {captioning_requester_id: e._cell.row.data.requester_id, semester: this.props.semester}

        this.props.dispatch(sendEmailCommandCourses(e._cell.row.data.requester_id,
            e._cell.row.data.template,
            params))

    };




    sendEmailButton(props)  {
        const cellData = props.cell;
        if (cellData._cell.row.data.sent === true) {
            return  <Button variant="contained" disabled={true} color="secondary" size="small" onClick={e => this.sendEmail(cellData)}>Sent</Button>

        } else {
            return  <Button  variant="contained" color="primary" size="small" onClick={e => this.sendEmail(cellData)}>Send</Button>
        }
    };



    componentDidMount() {
        let columns = [
            {title:"Course", width:150, field:"course_gen_id"},
            {title: "Employee", field: "employee_name"},
            {title: "Email", field: "employee_email"},
            {title: "Sent", field: "sent", formatter: "tick", width:60},
            {title: "Sent Date", field: "sent_date" },
            { title: "Send", width:80, hozAlign :"center",  formatter:reactFormatter(<this.sendEmailButton/>)}
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

        console.log("UPDATED")

        if (JSON.stringify(prevProps.coursesReducer) !== JSON.stringify(this.props.coursesReducer)) {
            console.log("I SHOULD UPDATE")
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

function mapStateToProps({coursesReducer,
                             requesterReducer,
                             globalsReducer}, {props}) {

    let data = []
    let columns = []



    let formatData = (course) => {

        let requester_id =  Object.keys(requesterReducer).find(element => {

            if (requesterReducer[element].course_id === course.course_gen_id){
                return true
            }
        })

        return {
            requester_id: requester_id,
            template:"NotifyInstructorsStudentsWantCaptions",
            course_gen_id: course.course_gen_id,
            employee_name: course.course_instructor.employee_first_name + " " + course.course_instructor.employee_last_name,
            employee_email: course.course_instructor.employee_email,
            sent: course.student_requests_captions_email_sent === true,
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
        columns,
        semester: globalsReducer['currentSemester'],
        coursesReducer
    }
}


export default withRouter(connect(mapStateToProps)(StudentRequestsCaptioningTabulatorContainer))