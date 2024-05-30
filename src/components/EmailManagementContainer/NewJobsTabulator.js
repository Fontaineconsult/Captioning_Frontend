import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import Tabulator from "tabulator-tables";
import { reactFormatter } from "react-tabulator";
import Button from "@material-ui/core/Button";
import { sendEmailCommandJobs } from "../../actions/ampApi/putData";
import '../../css/NewJobsTabulator.css'; // Import custom CSS file for styling

class NewJobsTabulator extends Component {


    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
        this.sendEmail = this.sendEmail.bind(this);
        this.sendEmailButton = this.sendEmailButton.bind(this);
    }

    // Function to handle sending email
    sendEmail(e) {
        console.log(e._cell.row.data.requester_name,
            e._cell.row.data.requester_id,
            e._cell.row.data.template)
        let params = { captioning_requester_id: e._cell.row.data.requester_id, semester: this.props.semester };
        let test = this.props.dispatch(sendEmailCommandJobs(e._cell.row.data.requester_id,
            e._cell.row.data.template,
            params));
    };

    // Function to render send email button
    sendEmailButton(props) {
        const cellData = props.cell;
        if (cellData._cell.row.data.sent === true) {
            return <Button variant="contained" color="secondary" size="small"
                           onClick={e => this.sendEmail}>Sent</Button>;
        } else {
            return <Button disabled={props.cell._cell.row.data.block_send} variant="contained" color="primary"
                           size="small" onClick={(e) => this.sendEmail(cellData)}>Send</Button>;
        }

    };


    componentDidMount() {
        // Define columns for Tabulator
        let columns = [
            { title: "Requester", width: 150, field: "requester_name" },
            { title: "Employee", field: "employee_name" },
            { title: "Email", field: "employee_email" },
            { title: "Title", field: "media_title" },
            { title: "Send", width: 80, hozAlign: "center", formatter: reactFormatter(<this.sendEmailButton />) }
        ];

        // Initialize Tabulator
        this.tabulator = new Tabulator(this.el, {
            columns: columns,
            layout: "fitColumns",
            data: this.props.data,
            reactiveData: true,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Replace Tabulator data when there's an update in Redux state
        if (JSON.stringify(prevProps.videosJobsReducer) !== JSON.stringify(this.props.videosJobsReducer)) {
            this.tabulator.replaceData(this.props.data.filter(job => !job.CanvasStudioID)); // Filter out Canvas Studio jobs
        }

    }

    render() {

        return (

            <div className="emailTabulatorContainer">
                {/* Apply custom CSS class to ensure proper overflow handling */}
                <div className="tabulator-container" ref={el => (this.el = el)}></div>
            </div>
        );
    }

}

// Map Redux state to component props
function mapStateToProps({
                             videosJobsReducer,
                             requesterReducer,
                             campusOrgReducer,
                             employeesReducer,
                             globalsReducer,
                         }, { props }) {
    let data = [];
    let columns = [];
    let formatData = (job) => {
        let block_send = false;
        let requester_id;
        let requester_name;
        let employee_id;
        let template;
        if (requesterReducer[job.requester_id].course_id !== null) {
            if (job.ilearn_auto_caption === false) {
                requester_id = requesterReducer[job.requester_id].id;
                requester_name = requesterReducer[job.requester_id].course_id;
                employee_id = requesterReducer[job.requester_id].employee_id;
                template = "NotifyJobReceivedCourse";
            }

            if (job.ilearn_auto_caption === true) {
                requester_id = requesterReducer[job.requester_id].id;
                requester_name = requesterReducer[job.requester_id].course_id;
                employee_id = requesterReducer[job.requester_id].employee_id;
                template = "NotifyJobReceivediLearnAutoCaption";
            }


        } else {
            requester_id = requesterReducer[job.requester_id].id;
            requester_name = campusOrgReducer[requesterReducer[job.requester_id].campus_org_id].organization_name;
            employee_id = requesterReducer[job.requester_id].org_employee_id;
            template = 'NotifyJobReceivedOrg';
        }


        return {
            id: job.id,
            template: template,
            requester_id: requester_id,
            requester_name: requester_name,
            employee_name: employeesReducer[employee_id].employee_first_name + " " + employeesReducer[employee_id].employee_last_name,
            employee_email: employeesReducer[employee_id].employee_email,
            media_title: job.media.title,
        }
    };

    // Populate data for Tabulator
    if (videosJobsReducer !== undefined) {

        Object.keys(videosJobsReducer).forEach((job) => {
            // Aaron, check the data coming in from videojobsreducer and make sure jobs with a CanvasStudioID are not added to the tabulator.
            // This uses Tabulator.js, please review documentation.
            if (videosJobsReducer[job].job_status === "Queued" || videosJobsReducer[job].job_status === "Captioning") {

                if (videosJobsReducer[job].job_added_confirmation_email_sent === false) {
                    data.push(formatData(videosJobsReducer[job]))
                }

            }
        });
    }

    return {
        data,
        columns,
        videosJobsReducer,
        semester: globalsReducer['currentSemester']
    };
}

export default withRouter(connect(mapStateToProps)(NewJobsTabulator));

export default withRouter(connect(mapStateToProps)(NewJobsTabulator))