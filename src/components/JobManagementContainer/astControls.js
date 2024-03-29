import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {reactFormatter} from 'react-tabulator'
import moment from 'moment'
import AstModalContainer from "./astConfirmModal";
import {submitASTJobToAST} from "../../actions/ampApi/putData"
import {astJobURL} from "../../constants";
// import Tabulator from "tabulator-tables";


const astRateFormatter = (rateCode) => ({
    "H": "8 Hour",
    "R": "1 Day",
    "T": "2 Day",
    "L": "4 Day"
})[rateCode]


class AstJobControlMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
        this.formatData = this.formatData.bind(this)
        this.astJobFormatter = this.astJobFormatter.bind(this)
        this.initASTJob = this.initASTJob.bind(this)

        this.ref = null;
        // this.tabulator = null
        this.el = React.createRef();

    }

    initASTJob(ast_job_id, job_id) {
        this.props.dispatch(submitASTJobToAST(ast_job_id, job_id))
    }

    astJobFormatter(ast_job_uri, ast_job_id) {


        // let ast_job_id = props.cell._cell.row.data.id
        // let ast_status = props.cell._cell.row.data.ast_link

        if (ast_job_uri === null) {

            return (<Button style={{'padding': '0px'}}
                            onClick={e => this.initASTJob(ast_job_id, this.props.job_id)}>Init</Button>)
        }
        if (ast_job_uri) {
            return (<Button style={{'padding': '0px'}} onClick={e => window.open(ast_job_uri)}>Job</Button>)
        }


    }


    formatData(astVideoJob) {

        let status = astVideoJob.captioning_status
        let date = astVideoJob.added_date
        if (astVideoJob.ast_status.length === 1) {
            status = astVideoJob.ast_status[0]['ast_status']
            date = astVideoJob.ast_status[0]['added_date']
        }
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
            status: status,
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


        let columns = [{title: "Status", field: "status", formatter: "plaintext"},
            {title: "Speed", field: "speed", formatter: "plaintext"},
            {title: "Added On", field: "added_date", formatter: "plaintext"},
            {
                title: "Ast Url",
                field: "ast_link",
                formatter: reactFormatter(<this.astJobFormatter/>,)
            }]


        this.setState({
            data: data
        })


        // this.tabulator = new Tabulator(this.el, {
        //     columns: columns,
        //     data: data,
        //     reactiveData: true,
        //     resizableColumns: false,
        //     responsiveLayout: false,
        //     layout: "fitColumns",
        //     maxHeight: "80px",
        //
        // })


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
                data: data
            })

        }
    }


    render() {
        // return (<div ref={el => (this.el = el)}/>)

        // if (this.state.data.length > 0) {
        //     return (
        //         <div ref={el => (this.el = el)}/>
        //     )
        // }

        if (this.state.data.length === 0) {
            return ("loading")
        }

        //html table css is in end of tabulator.css file

        console.log(this.state, "STAATEE")
        return (<table>
            <tr>
                <td>{this.state.data[0].status}</td>
                <td>{this.state.data[0].speed}</td>
                <td>{this.state.data[0].added_date}</td>
                <td>{this.astJobFormatter(this.state.data[0].ast_link, this.state.data[0].id)}</td>
            </tr>
        </table>)

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
                <div className={"astModalActivateButtonContainer"}>
                    <AstModalContainer job_id={this.props.job_id}/>
                </div>
                <div className={"astControlsContainer"} tabIndex={0}>
                    {this.props.hasJobs && <AstJobControlMenu
                        job_id={this.props.job_id}
                        dispatch={this.props.dispatch}
                        expanded={this.state.expanded}
                        ast_jobs={this.props.ast_jobs}/>}

                    {!this.props.hasJobs && <NoJobsSlug/>}
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