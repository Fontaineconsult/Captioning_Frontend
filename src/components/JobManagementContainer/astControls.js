import React, { Component, Fragment } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import { ReactTabulator, reactFormatter } from 'react-tabulator'
import moment from 'moment'
import AstModalContainer from "./astConfirmModal";
import {submitASTJobToAST} from "../../actions/ampApi/putData"
import {astJobURL} from "../../constants";
import {astModal} from "../../css/astModal.css"



const astRateFormatter = (rateCode) => ({
    "H":"8 Hour",
    "R":"1 Day",
    "T":"2 Day",
    "L":"4 Day"
})[rateCode]



class AstJobControlMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
        this.formatData = this.formatData.bind(this)
        this.astJobFormatter = this.astJobFormatter.bind(this)
        this.initASTJob = this.initASTJob.bind(this)
        this.ref = null
        this.columns = [
            {title: "Status", field:"status", formatter: "plaintext" },
            {title: "Speed", field: "speed", formatter: "plaintext"},
            {title: "Added On", field: "added_date", formatter: "plaintext" },
            {title: "Ast Url", field: "ast_link", formatter: reactFormatter(<this.astJobFormatter/>)}
        ];

    }

    initASTJob(ast_job_id, job_id) {
        this.props.dispatch(submitASTJobToAST(ast_job_id, job_id))
    }

    astJobFormatter(props) {

        let ast_job_id = props.cell._cell.row.data.id
        let ast_status = props.cell._cell.row.data.ast_link
        if (ast_status === null) {
            return(<Button style={{'padding': '0px'}} onClick={e => this.initASTJob(ast_job_id, this.props.job_id)}>Init</Button>)
        }
        if (ast_status) {
            return(<Button style={{'padding': '0px'}} onClick={e => window.open(ast_status)}>Job</Button>)
        }
    }



    formatData(astVideoJob) {

        let status = astVideoJob.captioning_status
        let date = astVideoJob.added_date
        if (astVideoJob.ast_status.length === 1) {status=astVideoJob.ast_status[0]['ast_status']
            date=astVideoJob.ast_status[0]['added_date']}
        if (astVideoJob.ast_status.length > 1) {
            let newest = astVideoJob.ast_status[astVideoJob.ast_status.length - 1]


            // let newest = astVideoJob.ast_status.sort(function(a, b) {
            //     let dateA = new Date(a.added_date), dateB = new Date(b.added_date);
            //     return dateA - dateB;
            // })[0];

            status = newest['ast_status']
            date = newest['added_date']
        }

        let astJobLink
        if (astVideoJob.ast_id) {
            astJobLink = `${astJobURL()}${astVideoJob.ast_id}`
        } else {
            astJobLink = null
        }

        return {
            id: astVideoJob.id,
            status:status,
            speed: astRateFormatter(astVideoJob.ast_rush),
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


        if (this.state.data.length > 0) {return (

            <Fragment>
                <ReactTabulator
                    ref={(ref) => (this.ref = ref)}
                    data={this.state.data}
                    columns={this.columns}
                    resizableColumns={false}
                    responsiveLayout={true}
                    layout={"fitData"}
                    maxHeight={"40px"}
                />
            </Fragment>

        )}

        if (this.state.data.length === 0) {
            return ("loading")
        }

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
                <div className={"astModalActivateButtonContainer"} >
                    <AstModalContainer job_id={this.props.job_id}/>
                </div>
                <div className={"astControlsContainer"}  tabIndex={0}>
                    {this.props.hasJobs && <AstJobControlMenu
                        job_id={this.props.job_id}
                        dispatch={this.props.dispatch}
                        expanded={this.state.expanded}
                        ast_jobs={this.props.ast_jobs}/>}

                    {!this.props.hasJobs && <NoJobsSlug /> }
                </div>
            </div>

        )
    }

}

function NoJobsSlug(props) {

    return (
        <div className={"noJobSlug"}>No AST Jobs</div>
    )


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