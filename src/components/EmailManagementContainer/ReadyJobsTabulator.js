import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import Tabulator from "tabulator-tables";
import { reactFormatter } from "react-tabulator";
import Button from "@material-ui/core/Button";
import { sendEmailCommandJobs } from "../../actions/ampApi/putData";

class ReadyJobsTabulator extends Component {
    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
        this.sendEmail = this.sendEmail.bind(this);
        this.sendEmailButton = this.sendEmailButton.bind(this);
    }

    sendEmail(e) {
        console.log(e._cell.row.data.requester_name,
            e._cell.row.data.requester_id,
            e._cell.row.data.template)
        let params = { captioning_requester_id: e._cell.row.data.requester_id, semester: this.props.semester };
        let test = this.props.dispatch(sendEmailCommandJobs(e._cell.row.data.requester_id,
            e._cell.row.data.template,
            params));
    };

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
        let columns = [
            { title: "Course", width: 150, field: "requester_name" },
            { title: "Employee", field: "employee_name" },
            { title: "Email", field: "employee_email" },
            { title: "Title", field: "media_title" },
            { title: "Send", width: 80, hozAlign: "center", formatter: reactFormatter(<this.sendEmailButton />) }
        ];

        // Filter out Canvas Studio jobs from the data
        const filteredData = this.props.data.filter(job => !job.CanvasStudioID);

        this.tabulator = new Tabulator(this.el, {
            columns: columns,
            layout: "fitColumns",
            data: filteredData,
            reactiveData: true,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Replace Tabulator data when there's an update in Redux state
        if (JSON.stringify(prevProps.videosJobsReducer) !== JSON.stringify(this.props.videosJobsReducer)) {
            // Filter out Canvas Studio jobs from the updated data
            const filteredData = this.props.data.filter(job => !job.CanvasStudioID);
            this.tabulator.replaceData(filteredData);
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
            // Include Canvas Studio ID in data
            CanvasStudioID: job.CanvasStudioID
        };
    }

    // Populate data for Tabulator
    if (videosJobsReducer !== undefined) {
        Object.keys(videosJobsReducer).forEach((job) => {
            // Exclude Canvas Studio jobs from the tabulator
            if (videosJobsReducer[job].job_status === "Ready") {
                if (!videosJobsReducer[job].CanvasStudioID) {
                    data.push(formatData(videosJobsReducer[job]));
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

export default withRouter(connect(mapStateToProps)(ReadyJobsTabulator));
