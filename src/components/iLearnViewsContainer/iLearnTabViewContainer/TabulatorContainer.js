import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator, reactFormatter } from 'react-tabulator'
import * as tabFuncs from './TabulatorDataConstructor'
import {updateiLearnVideo} from '../../../../src/actions/creators/postData'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import RemoveIcon from '@material-ui/icons/Remove'
import '../../../tabulator.css'
import Tabulator from "tabulator-tables"

class TabulatorContainer extends Component {


    el = React.createRef();
    tabulator = null;
    ref = null;

    SubmitButton = (props) => {
        console.log(props)
        const cellData = props.cell;

        if (cellData._cell.value === false) {
            return <IconButton onClick={e => this.submitCap(e,cellData)}><RemoveIcon /></IconButton>;
        } else {
            return <IconButton onClick={e => this.submitCap(e,cellData)}><DoneIcon /></IconButton>;
        }


    };

    dataEditedFunc = (cellData) => {
        this.props.dispatch(updateiLearnVideo(this.props.course_id, cellData._cell.row.data.id, cellData._cell.column.field, cellData._cell.value))
    };



    cellClick = (e, row) => {
        console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
        console.log("rowClick id: ${row.getData().id}", row, e);
    };
    submitCap = (e,cellData) => {
        e.preventDefault()
        let submitCapStatus = !cellData._cell.value
        this.props.dispatch(updateiLearnVideo(this.props.course_id, cellData._cell.row.data.id, cellData._cell.column.field, submitCapStatus))
    };



    tableData = null
    columns = [{ title: "Title", field: "title", width: 150 },
        { title: "Captioned", field: "captioned", width: 150 },
        { title: "Due Date", editor:tabFuncs.datePicker , field: "indicated_due_date", width: 150 },
        { title: "Link", field: "resource_link", width: 150 },
        { title: "Scan Date", field: "scan_date", width: 150 },
        { title: "Submitted", field: "submitted_for_processing", width: 150, formatter: reactFormatter(<this.SubmitButton />)},
        { title: "Section", field: "page_section", width: 150 }];

    componentDidMount() {
        this.tableData = this.props.videosList
        this.tabulator = new Tabulator(this.el, {
            columns: this.columns,
            data: this.props.videosList,
            className: "custom-tab-class",
            cellEdited: this.dataEditedFunc,
            reactiveData: true

        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.tabulator.setData(this.props.videosList)
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return JSON.stringify(nextProps.videosList) !== JSON.stringify(this.props.videosList)

    }

    render() {

        return(
            <div ref={el => (this.el = el)} />
            // <div>
            //
            //     {/*<ReactTabulator*/}
            //         {/*ref={ref => (this.ref = ref)}*/}
            //         {/*columns={this.columns}*/}
            //         {/*data={this.props.videosList}*/}
            //         {/*className="custom-tab-class"*/}
            //         {/*cellEdited ={this.dataEditedFunc}*/}
            //
            //     {/*/>*/}
            //
            //
            // </div>

        )
    }


}




function mapStateToProps({iLearnVideoReducer, loadingStatusReducer, coursesReducer}, videos) {

    let course_id = videos.course_gen_id.course_id
    let ilearn_videos = iLearnVideoReducer[course_id]
    let formatData = (video) => {

        return {
            id: video.id,
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
    Object.keys(ilearn_videos).map((video) => (
        videos_list.push(formatData(ilearn_videos[video]))
    ))


    return {
        videosList: videos_list,
        course_id
    }
}


export default withRouter(connect(mapStateToProps)(TabulatorContainer))