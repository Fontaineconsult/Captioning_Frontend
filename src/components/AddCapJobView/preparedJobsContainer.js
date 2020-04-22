
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator, reactFormatter } from 'react-tabulator'
import Tabulator from "tabulator-tables"
import {datePicker, showDateToggle} from "../iLearnViewsContainer/iLearnTabulatorViewContainer/TabulatorDataConstructor"
import {updateiLearnVideo} from "../../actions/ampApi/putData";
import {updateTempJobsFormJobsInfo} from "../../actions/tempJobsForm"




class PreparedJobsContainer extends Component {

    constructor(props) {
        super(props);


        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
        this.dataEditedFunc = this.dataEditedFunc.bind(this)
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

        return(

            <div className="preparedJobsContainer">
                <div ref={el => (this.el = el)} />
            </div>

        )
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("IT UPDATED", this.props.videoJobsList)
        this.tabulator.replaceData(this.props.videoJobsList)
    }

    componentDidMount() {

        this.tabulator = new Tabulator(this.el, {
            columns: this.columns,
            layout:"fitColumns",
            data: this.props.videoJobsList,
            reactiveData: true,
            cellEdited: this.dataEditedFunc,

        })

    }


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
    console.log("REDEREDER", tempJobsFormReducer)
    Object.keys(tempJobsFormReducer).forEach((videoJob) => {

        if (tempJobsFormReducer[videoJob].meta.created === true) {
            video_job_list.push(formatData(tempJobsFormReducer[videoJob]))
        }
    });

    console.log("MAPSTATE", video_job_list)
    return {

        videoJobsList: video_job_list,
        tempJobsFormReducer,
        props

    }
}


export default withRouter(connect(mapStateToProps)(PreparedJobsContainer))