
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import Tabulator from "tabulator-tables"
import {datePicker, showDateToggle} from "../iLearnViewsContainer/iLearnTabulatorViewContainer/TabulatorDataConstructor"
import {updateTempJobsFormJobsInfo, removeJobfromTempCapJobs} from "../../actions/tempJobsForm"






class PreparedJobsContainer extends Component {


    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
        this.dataEditedFunc = this.dataEditedFunc.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.columns = [
            {title:"Remove", field:"remove", align:'center', width:60, formatter:"buttonCross", cellClick:(e, cell) => this.removeItem(e, cell)},
            {title:"Requester", width:150, field:"requester_name"},
            {title: "Title", field: "video_title"},
            {title: "URL", field: "video_url"},
            {title: "Show Date", editor:datePicker, width:120, field: "show_date"},
            {title: "Delivery Format", editor:"select", width:80, field: "delivery_format", editorParams:{"Amara": "Amara",
                    "SRT":"SRT",
                    "Video File":"Video File"}},
        ];


    }

    buildTabulator() {

        if (this.props.videoJobsList.length > 0) {
            this.tabulator = new Tabulator(this.el, {
                columns: this.columns,
                layout:"fitColumns",
                data: this.props.videoJobsList,
                reactiveData: true,
                cellEdited: this.dataEditedFunc,

            })
            this.tabulator.replaceData(this.props.videoJobsList)

        }

    }

    removeItem(e, cell) {
        let transaction_id = cell._cell.row.data.id;
        this.props.dispatch(removeJobfromTempCapJobs(transaction_id))

    }


    dataEditedFunc(cellData)  {
        this.props.dispatch(updateTempJobsFormJobsInfo(cellData._cell.row.data.id, {"column":cellData._cell.column.field, "value": cellData._cell.value}))
    };



    render() {

        return(

            <div className="preparedJobsContainer">

                {this.props.videoJobsList.length === 0 && <EmptyContainer/>}
                {this.props.videoJobsList.length > 0 && <div ref={el => (this.el = el)} />}

            </div>

        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.buildTabulator()
        //
        // this.tabulator.replaceData(this.props.videoJobsList)
    }


}



function EmptyContainer() {

    return (<div className="emptyCreatedJobsContainer">
        <div className="emptyCreatedJobsContainerText"><div style={{'text-align': 'center'}}>No Jobs Created</div><div>Select Requester To Begin</div></div>

    </div>)

}

function mapStateToProps({tempJobsFormReducer, requesterReducer, campusOrgReducer}, {props}) {

    let findRequesterName = (requester_id) => {

        if (requesterReducer[requester_id].course_id) {
            return requesterReducer[requester_id].course_id

        } else {
            return campusOrgReducer[requesterReducer[requester_id].campus_org_id].organization_name

        }



    };


    let formatData = (videoJob) => {

        return {
            id: videoJob.meta.transaction_id,
            requester_name: findRequesterName(videoJob.meta.requester_id),
            video_title: videoJob.video.title,
            video_url: videoJob.video.source_url,
            show_date: showDateToggle(videoJob.job_info.show_date),
            delivery_format: videoJob.job_info.delivery_format
        }
    };


    let video_job_list = [];

    Object.keys(tempJobsFormReducer).forEach((videoJob) => {

        if (tempJobsFormReducer[videoJob].meta.created === true) {
            video_job_list.push(formatData(tempJobsFormReducer[videoJob]))
        }
    });

    return {

        videoJobsList: video_job_list,
        tempJobsFormReducer,
        props

    }
}


export default withRouter(connect(mapStateToProps)(PreparedJobsContainer))