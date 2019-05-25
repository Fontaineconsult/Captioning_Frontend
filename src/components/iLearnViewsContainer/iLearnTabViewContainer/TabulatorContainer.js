import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator'
import * as tabFuncs from './TabulatorDataConstructor'

const columns = [{ title: "Title", field: "title", width: 150 },
    { title: "Captioned", field: "captioned", width: 150 },
    { title: "Due Date", field: "indicated_due_date", width: 150 },
    { title: "Link", field: "resource_link", width: 150 },
    { title: "Scan Date", field: "scan_date", width: 150 },
    { title: "Submitted", field: "submitted_for_processing", width: 150},
    { title: "Section", field: "page_section", width: 150 }];

class TabulatorContainer extends Component {


    ref = null;
    rowClick = (e, row) => {
        console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
        console.log("rowClick id: ${row.getData().id}", row, e);
    };


    render() {

        return(

            <div>
                <ReactTabulator
                    ref={ref => (this.ref = ref)}
                    columns={columns}
                    data={this.props.videos_list}
                    cellClick={this.rowClick}

                />

            </div>

        )
    }


}




function mapStateToProps({iLearnVideoReducer, loadingStatusReducer, coursesReducer}, videos) {


    let formatData = (video) => {

        return {
            title: video.title,
            captioned: tabFuncs.capStatus(video.captioned),
            indicated_due_date: tabFuncs.showDateToggle(video.indicated_due_date),
            resource_link: video.resource_link,
            scan_date: video.scan_date,
            submitted_for_processing: video.submitted_for_processing,
            page_section: video.page_section

        }


    };


    let videos_list = []

    Object.keys(videos.videos).map((video) => (

        videos_list.push(formatData(videos.videos[video]))
    ))



    return {
        videos_list
    }
}


export default withRouter(connect(mapStateToProps)(TabulatorContainer))