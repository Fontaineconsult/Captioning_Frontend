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
import '../../../css/tabulator.css'
import Tabulator from "tabulator-tables"
import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip';

class TabulatorContainer extends Component {


    el = React.createRef();
    tabulator = null;
    ref = null;



    SubmitButton = (props) => {
        const cellData = props.cell;

        if (cellData._cell.value === false || cellData._cell.value === null) {
            return <IconButton size="small" onClick={e => this.submitCap(e,cellData)}><RemoveIcon /></IconButton>;

        } else {
            return <IconButton size="small" onClick={e => this.submitCap(e,cellData)}><DoneIcon /></IconButton>;
        }


    };

    closedCaptionLink = (props) => {
        const cellData = props.cell;

        if (cellData._cell.row.data.captioned_link) {
            return <Tooltip title={cellData._cell.value}><Button  size="small" onClick={e => window.open(cellData._cell.value, '_blank')}>
                <tabFuncs.ClosedCaptionIcon/>
            </Button></Tooltip>
        } else if (cellData._cell.row.data.captioned === true){
            return <Tooltip title={cellData._cell.row.data.resource_link}><Button  size="small" onClick={e => window.open(cellData._cell.row.data.resource_link, '_blank')}>
                <tabFuncs.ClosedCaptionIcon/>
            </Button></Tooltip>

        } else {
            return ''
        }};




    isCaptionedButton = (props) => {
        const cellData = props.cell;
        if (cellData._cell.value === false) {
            return <Button  size="small" color="secondary" onClick={e => this.submitCapStatus(e,cellData)}>Unavailable</Button>;
        }

        if (cellData._cell.value === true) {
            return <Button size="small" color="primary" onClick={e => this.submitCapStatus(e,cellData)}>Available</Button>;}
        if (cellData._cell.value === null) {
            return <Button size="small" color="tertiary" onClick={e => this.submitCapStatus(e,cellData)}>Unknown</Button>;}


    }

    dataEditedFunc = (cellData) => {
        this.props.dispatch(updateiLearnVideo(this.props.course_id, cellData._cell.row.data.id, cellData._cell.column.field, cellData._cell.value))
    };



    cellClick = (e, row) => {
        console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
        console.log("rowClick id: ${row.getData().id}", row, e);
    };

    submitCapStatus = (e, cellData) => {
        e.preventDefault()
        let captionStatus = tabFuncs.capStatToggle2(cellData._cell.value)
        console.log("CAPSTAT", captionStatus, cellData._cell.value)

        this.props.dispatch(updateiLearnVideo(this.props.course_id, cellData._cell.row.data.id, cellData._cell.column.field, captionStatus))

    };

    submitCap = (e,cellData) => {
        e.preventDefault()
        let submitCapStatus = tabFuncs.capSubmitToggle(cellData._cell.value)
        this.props.dispatch(updateiLearnVideo(this.props.course_id, cellData._cell.row.data.id, cellData._cell.column.field, submitCapStatus))
    };



    tableData = null
    columns = [
        { title: "Title", field: "title"},
        { title: "Captioned", field: "captioned", width: 130, align:"center", formatter: reactFormatter(<this.isCaptionedButton />) },
        { title: "CC",  width: 75, field: "captioned_link", align:"center", formatter: reactFormatter(<this.closedCaptionLink />)},
        { title: "Due Date", editor:tabFuncs.datePicker , field: "indicated_due_date", width: 160 },
        { title: "Link", field: "resource_link", width: 350, widthShrink:1, formatter: "link", formatterParams:{target:"_blank", urlField:'url'} },
        { title: "Scan Date", align:"center", field: "scan_date", width: 105 },
        { title: "Submitted", field: "submitted_for_processing",  align:"center", width: 100, formatter: reactFormatter(<this.SubmitButton />)},
        { title: "Section", field: "page_section", align:"center", width: 80 },
        ];

    componentDidMount() {
        this.tableData = this.props.videosList
        this.tabulator = new Tabulator(this.el, {
            columns: this.columns,
            layout:"fitColumns",
            data: this.props.videosList,
            className: "custom-tab-class",
            cellEdited: this.dataEditedFunc,
            reactiveData: true

        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("REPLACEING")
        this.tabulator.replaceData(this.props.videosList)
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
            captioned: video.captioned,
            captioned_link: video.captioned_version == null ? null : video.captioned_version.captioned_url,
            indicated_due_date: tabFuncs.showDateToggle(video.indicated_due_date),
            resource_link: video.resource_link,
            scan_date: moment(video.scan_date).format('MM-DD-YY'),
            submitted_for_processing: video.submitted_for_processing,
            page_section: video.page_section,



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