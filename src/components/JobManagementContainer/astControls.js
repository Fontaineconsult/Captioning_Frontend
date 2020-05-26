import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {addAstJobToCaptioningJob} from '../../actions/ampApi/postData'
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { ReactTabulator, reactFormatter } from 'react-tabulator'
import moment from 'moment'
import Modal from '@material-ui/core/Modal';
import AstModalContainer from "./astConfirmModal";

import {astJobURL} from "../../constants";


class AstJobControlMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
        this.formatData = this.formatData.bind(this)

    }

    columns = [
        {title:"Status", width:120, field:"status"},
        {title: "Speed", width:80, field: "speed"},
        {title: "Added On", width:100, field: "added_date"},
        {title: "Ast Url", width:80, field: "ast_link", formatter: "link"}
    ];

    formatData(astVideoJob) {

        let status = astVideoJob.captioning_status
        let date = astVideoJob.added_date
        if (astVideoJob.ast_status.length === 1) {status=astVideoJob.ast_status[0]['ast_status']
            date=astVideoJob.ast_status[0]['added_date']}
        if (astVideoJob.ast_status.length > 1) {
            let newest = astVideoJob.ast_status.sort(function(a, b) {
                let dateA = new Date(a.added_date), dateB = new Date(b.added_date);
                return dateA - dateB;
            })[0];
            status = newest['ast_status']
            date = newest['added_date']

        }

        let astJobLink
        if (astVideoJob.ast_id) {
            astJobLink = `${astJobURL()}${astVideoJob.ast_id}`
        } else {
            astJobLink = "N/A"

        }



        return {
            id: astVideoJob.id,
            status:status,
            speed: astVideoJob.ast_rush,
            added_date: moment(date).format('MM-DD-YY'),
            ast_link: astJobLink
        }
    };

    componentDidMount() {
        let data = []
        if (!this.props.expanded) {
            data.push(this.formatData(this.props.ast_jobs[0]))

        }
        if (this.props.expanded) {
            Object.keys(this.props.ast_jobs).forEach(item => {
                    data.push(this.formatData(this.props.ast_jobs[item]))
                }
            )

        }

        this.setState({
            data:data
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        let data = []

        if (prevProps.expanded !== this.props.expanded) {

            if (!this.props.expanded) {
                data.push(this.formatData(this.props.ast_jobs[0]))

            }
            if (this.props.expanded) {
                Object.keys(this.props.ast_jobs).forEach(item => {
                        data.push(this.formatData(this.props.ast_jobs[item]))
                    }
                )

            }
            this.setState({
                data:data
            })

        }

    }

    render() {

        return (

            <div>
                <ReactTabulator data={this.state.data} columns={this.columns}/>
            </div>

        )

    }


}


class AstControls extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false

        };

        this.shrinkView = this.shrinkView.bind(this)
        this.expandView = this.expandView.bind(this)
    }



    expandView() {
        this.setState({
            expanded: true
        })
    }

    shrinkView() {
        this.setState({
            expanded: false

        })

    }


    render() {
        return (
            <div className="astControls">
                <div>
                    <AstModalContainer job_id={this.props.job_id}/>
                </div>
                <div onMouseEnter={this.expandView} onMouseLeave={this.shrinkView} tabIndex={0}>
                    {this.props.hasJobs && <AstJobControlMenu expanded={this.state.expanded} ast_jobs={this.props.ast_jobs}/>}
                    {!this.props.hasJobs && <div>No Jobs</div> }
                </div>
            </div>

        )
    }

}





function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer}, {ast_jobs, media_id, job_id}) {
    let hasJobs = Object.keys(ast_jobs).length > 0

    return {
        hasJobs,
        ast_jobs,
        job_id

    }
}





export default withRouter(connect(mapStateToProps)(AstControls))