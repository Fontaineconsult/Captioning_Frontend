
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import Tabulator from "tabulator-tables"
import {reactFormatter} from "react-tabulator";
import Button from "@material-ui/core/Button";
import moment from "moment";



class ReadyJobsTabulator extends Component {


    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;


    }

    sendEmail(props)  {
        const cellData = props.cell;
        console.log(cellData._cell.value)
        if (cellData._cell.row.data.sent === true) {
            return  <Button variant="contained" color="secondary" size="small" onClick={e => console.log("YY")}>Sent</Button>

        } else {

            return  <Button variant="contained" color="primary" size="small" onClick={e => console.log("YY")}>Send</Button>
        }
    };



    componentDidMount() {
        let columns = [

            {title:"Course", width:150, field:"requester_id"},
            {title: "Employee", field: "employee_name"},
            {title: "Email", field: "employee_email"},
            {title: "Title", field: "media_title"},
            { title: "Send", width:80, hozAlign :"center",  formatter:reactFormatter(<this.sendEmail/>)}
        ];

        this.tabulator = new Tabulator(this.el, {
            columns: columns,
            layout:"fitColumns",
            data: this.props.data,
            reactiveData: true,



        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (JSON.stringify(prevProps.videosJobsReducer) !== JSON.stringify(this.props.coursesReducer)) {
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





function mapStateToProps({videosJobsReducer, requesterReducer, campusOrgReducer, employeesReducer}, {props}) {

    let data = []
    let columns = []


    let formatData = (job) => {
        let requester_id
        let employee_id
        if (requesterReducer[job.requester_id].course_id !== null) {
            requester_id = requesterReducer[job.requester_id].course_id
            employee_id = requesterReducer[job.requester_id].employee_id
        } else {
            requester_id = campusOrgReducer[requesterReducer[job.requester_id].campus_org_id].organization_name
            employee_id = requesterReducer[job.requester_id].org_employee_id
        }



        return {
            id: job.id,
            requester_id: requester_id,
            employee_name: employeesReducer[employee_id].employee_first_name + " " + employeesReducer[employee_id].employee_last_name,
            employee_email: employeesReducer[employee_id].employee_email,
            media_title: job.media.title,
        }
    };

    if (videosJobsReducer !== undefined){

        Object.keys(videosJobsReducer).forEach((job) => {

            if (videosJobsReducer[job].job_status === "Ready") {
                data.push(formatData(videosJobsReducer[job]))
            }


        })

    }

    return {
        data,
        columns,
        videosJobsReducer


    }
}


export default withRouter(connect(mapStateToProps)(ReadyJobsTabulator))