
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator, reactFormatter } from 'react-tabulator'
import Tabulator from "tabulator-tables"




class PreparedJobsContainer extends Component {

    constructor(props) {
        super(props);


        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
    }


    columns = [

        {title: "Title", field: "video_title"},
        {title: "URL", field: "video_url"},
        {title: "Show Date", field: "show_date"},
        {title: "Delivery Format", field: "delivery_format"}

    ];

    render() {

        return(

            <div className="preparedJobsContainer">
                <div ref={el => (this.el = el)} />
            </div>

        )
    }


    componentDidUpdate(prevProps, prevState, snapshot) {


        this.tabulator.replaceData(this.props.videoJobsList)
    }

    componentDidMount() {

        this.tabulator = new Tabulator(this.el, {
            columns: this.columns,
            layout:"fitColumns",
            data: this.props.videoJobsList,
            reactiveData: true,

        })

    }



}

function mapStateToProps({tempJobsFormReducer}, {props}) {

    let formatData = (videoJob) => {

        return {
            id: videoJob.meta.transaction_id,
            video_title: videoJob.video.title,
            video_url: videoJob.video.source_url,
            show_date: videoJob.job_info.show_date,
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