
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import Tabulator from "tabulator-tables"
import {reactFormatter} from "react-tabulator";
import Button from "@material-ui/core/Button";
import {sendEmailCommandJobs} from "./../../actions/ampApi/putData"



class ReadyJobsTabulator extends Component {


    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
        this.sendEmail = this.sendEmail.bind(this)
        this.sendEmailButton = this.sendEmailButton.bind(this)
    }

    sendEmail(e) {

        console.log(e._cell.row.data.requester_name,
            e._cell.row.data.requester_id,
            e._cell.row.data.template)
            let params = {captioning_requester_id: e._cell.row.data.requester_id, semester: this.props.semester}
            // job_id, template, params
            let test = this.props.dispatch(sendEmailCommandJobs(e._cell.row.data.requester_id,
                e._cell.row.data.template,
                params))



    };

    sendEmailButton(props)  {
        const cellData = props.cell;
        if (cellData._cell.row.data.sent === true) {
            return  <Button variant="contained" color="secondary" size="small" onClick={e => this.sendEmail}>Sent</Button>
        } else {
            return  <Button disabled={props.cell._cell.row.data.block_send} variant="contained" color="primary" size="small" onClick={(e) =>  this.sendEmail(cellData)}>Send</Button>
        }

    };


    componentDidMount() {
        let columns = [

            {title:"Course", width:150, field:"requester_name"},
            {title: "Employee", field: "employee_name"},
            {title: "Email", field: "employee_email"},
            {title: "Title", field: "media_title"},
            { title: "Send", width:80, hozAlign :"center",  formatter:reactFormatter(<this.sendEmailButton/>)}
        ];

        this.tabulator = new Tabulator(this.el, {
            columns: columns,
            layout:"fitColumns",
            data: this.props.data,
            reactiveData: true,

        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (JSON.stringify(prevProps.videosJobsReducer) !== JSON.stringify(this.props.videosJobsReducer)) {
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

function mapStateToProps({videosJobsReducer,
                             requesterReducer,
                             campusOrgReducer,
                             employeesReducer,
                             globalsReducer,

                         },
                                       {props}) {

    let data = []
    let columns = []


    let formatData = (job) => {

        let block_send = false
        let requester_id
        let requester_name
        let employee_id
        let template
        console.log("OUTPUT FORMAT", job.output_format)
        if (requesterReducer[job.requester_id].course_id !== null) {
            requester_id = requesterReducer[job.requester_id].id
            requester_name = requesterReducer[job.requester_id].course_id
            employee_id = requesterReducer[job.requester_id].employee_id


            if (job.ilearn_auto_caption === true) {
                template = "NotifyReadyJobsSingleAutoCaption"
                block_send = job.media.primary_caption_resource_id == null

            }

            if (job.ilearn_auto_caption === false) {

                if (job.output_format === 'SRT') {
                    template = "NotifyReadyCoursesWithAttachment"

                }

                if (job.output_format === 'Open Caption') {
                    template = "NotifyReadyCoursesWithFileLinks"

                }

                if (job.output_format === 'File') {
                    template = "NotifyReadyCoursesWithFileLinks"

                }

                // if (job.output_format === 'Open Cap' || job.output_format === 'Amara') {
                //     template = "NotifyReadyCoursesWithAttachment"
                //
                // }
            }

        } else {
            requester_id = requesterReducer[job.requester_id].id
            requester_name = campusOrgReducer[requesterReducer[job.requester_id].campus_org_id].organization_name
            employee_id = requesterReducer[job.requester_id].org_employee_id
            template = 'NotifyReadyJobsOrgs'

            if (job.output_format === 'Amara') {
                block_send = job.media.primary_caption_resource_id === null && !job.media.media_objects.some(element => element.associated_captions !== null)
            }

            if (job.output_format === 'SRT') {
                block_send = false

            }
        }


        return {
            id: job.id,
            template: template,
            requester_id: requester_id,
            requester_name: requester_name,
            employee_name: employeesReducer[employee_id].employee_first_name + " " + employeesReducer[employee_id].employee_last_name,
            employee_email: employeesReducer[employee_id].employee_email,
            media_title: job.media.title,
            block_send: block_send
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
        videosJobsReducer,
        semester: globalsReducer['currentSemester']

    }
}


export default withRouter(connect(mapStateToProps)(ReadyJobsTabulator))