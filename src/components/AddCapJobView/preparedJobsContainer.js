
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import Tabulator from "tabulator-tables"
import {datePicker, showDateToggle} from "../iLearnViewsContainer/iLearnTabulatorViewContainer/TabulatorDataConstructor"
import {updateTempJobsFormJobsInfo} from "../../actions/tempJobsForm"




class PreparedJobsContainer extends Component {

    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
        this.dataEditedFunc = this.dataEditedFunc.bind(this)
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


    dataEditedFunc = (cellData) => {
        this.props.dispatch(updateTempJobsFormJobsInfo(cellData._cell.row.data.id, {"column":cellData._cell.column.field, "value": cellData._cell.value}))
    };

    columns = [

        {title: "Title", field: "video_title"},
        {title: "URL", field: "video_url"},
        {title: "Show Date", editor:datePicker, field: "show_date"},
        {title: "Delivery Format", editor:"select", field: "delivery_format", editorParams:{"Amara": "Amara",
                                                                                            "SRT":"SRT",
                                                                                            "Video File":"Video File"}}
    ];

    render() {
        console.log("ERRMEERRR", this.el)
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

    componentDidMount() {



    }

}



function EmptyContainer() {

    return (<div className="emptyCreatedJobsContainer">
        <div className="emptyCreatedJobsContainerText"><div style={{'text-align': 'center'}}>No Jobs Created</div><div>Select Requester To Begin</div></div>

    </div>)

}

function mapStateToProps({tempJobsFormReducer}, {props}) {

    let formatData = (videoJob) => {

        return {
            id: videoJob.meta.transaction_id,
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