import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { reactFormatter } from 'react-tabulator'
import * as tabFuncs from './TabulatorDataConstructor'
import {updateCanvasVideo, updateiLearnVideo} from '../../../actions/ampApi/putData'
import Button from '@material-ui/core/Button'
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import RemoveIcon from '@material-ui/icons/Remove'
import '../../../css/tabulator.css'
import Tabulator from "tabulator-tables"
import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip';
import TabToolBar from "./tabToolBar";




class CanvasTabulatorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_rows: []
        };




        this.SubmitButton = this.SubmitButton.bind(this);
        this.ClosedCaptionLink = this.ClosedCaptionLink.bind(this);
        this.IsCaptionedButton = this.IsCaptionedButton.bind(this);
        this.dataEditedFunc = this.dataEditedFunc.bind(this);
        this.cellClick = this.cellClick.bind(this);
        this.submitCap = this.submitCap.bind(this);
        this.submitCapStatus = this.submitCapStatus.bind(this);
        this.checkBoxFunction = this.checkBoxFunction.bind(this);
        this.cellClick = this.cellClick.bind(this)
        this.IsChecked = this.IsChecked.bind(this)


        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
    };


    SubmitButton(props) {
        const cellData = props.cell;
        let disabled = this.state.selected_rows.length > 0


        if (cellData._cell.value === false || cellData._cell.value === null) {
            if (disabled) {
                return <IconButton size="small" disabled><RemoveIcon /></IconButton>;

            } else {
                return <IconButton size="small" onClick={e => this.submitCap(e,cellData)}><RemoveIcon /></IconButton>;
            }

        } else {

            if (disabled) {
                return <IconButton size="small" disabled><DoneIcon /></IconButton>;

            } else {
                return <IconButton size="small" onClick={e => this.submitCap(e,cellData)}><DoneIcon /></IconButton>;

            }

        }

    };

    ClosedCaptionLink(props) {
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

    checkBoxFunction(e, cellData) {


        if (e.type === "click") {

            if (cellData.cell._cell.row.modules.select.selected === false) {
                cellData.cell._cell.table.selectRow(cellData.cell._cell.row.data.id);

                let test = cellData.cell._cell.table.getSelectedRows();
                this.setState({selected_rows: test})

            } else {
                cellData.cell._cell.table.deselectRow(cellData.cell._cell.row.data.id);

                let test = cellData.cell._cell.table.getSelectedRows();
                this.setState({selected_rows: test})

            }

        }

    };

    IsCaptionedButton(props) {

        const cellData = props.cell;
        let disabled = this.state.selected_rows.length > 0 // broken not sure why ,switch back to this.state.selected_rows

        if (cellData._cell.value === false) {
            if (disabled) {
                return <Button  size="small" color="secondary" disabled >Unavailable</Button>;
            } else {
                return <Button  size="small" color="secondary" onClick={e => this.submitCapStatus(e,cellData)}>Unavailable</Button>;
            }
        }

        if (cellData._cell.value === true) {

            if (disabled) {
                return <Button  size="small" color="primary" disabled >Available</Button>;
            } else {
                return <Button  size="small" color="primary" onClick={e => this.submitCapStatus(e,cellData)}>Available</Button>;
            }
        }

        if (cellData._cell.value === null) {

            if (disabled) {
                return <Button  size="small" color="tertiary" disabled >Unknown</Button>;
            } else {
                return <Button  size="small" color="tertiary" onClick={e => this.submitCapStatus(e,cellData)}>Unknown</Button>;
            }
        }


    };

    dataEditedFunc(cellData) {

        this.props.dispatch(updateCanvasVideo(cellData._cell.row.data.id, cellData._cell.column.field, cellData._cell.value))
    };

    cellClick(e, row) {
        console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
        console.log("rowClick id: ${row.getData().id}", row, e);
    };

    submitCap(e,cellData) {

        e.preventDefault()
        let submitCapStatus = tabFuncs.capSubmitToggle(cellData._cell.value);
        this.props.dispatch(updateCanvasVideo(cellData._cell.row.data.id, cellData._cell.column.field, submitCapStatus))
    };

    submitCapStatus(e, cellData) {

        e.preventDefault();
        let captionStatus = tabFuncs.capStatToggle2(cellData._cell.value);
        this.props.dispatch(updateCanvasVideo(cellData._cell.row.data.id, cellData._cell.column.field, captionStatus))

    };

    IsChecked(props)  {

        if (props.cell._cell.row.modules.hasOwnProperty("select")) {
            if (props.cell._cell.row.modules.select.selected === false){

                return  <Checkbox size="small" onClick={e => this.checkBoxFunction(e, props)}/>

            } else {

                return  <Checkbox size="small" checked onClick={e => this.checkBoxFunction(e, props)}/>
            }
        } else {
            return  <Checkbox size="small" onClick={e => this.checkBoxFunction(e, props)}/>


        }

    };


    componentDidMount() {

        let columns = [
            { title: "Title", field: "title", editor:"input"},
            { title: "Captioned", field: "captioned", width: 130, hozAlign :"center", formatter: reactFormatter(<this.IsCaptionedButton />) },
            { title: "CC",  width: 75, field: "captioned_link", hozAlign :"center", formatter: reactFormatter(<this.ClosedCaptionLink />)},
            { title: "Parent", width: 95, field: "resource_type",  hozAlign :"center", formatter: "link", formatterParams:{target:"_blank", urlField:'parent'}},
            { title: "Link", field: "resource_link", width: 350, widthShrink:1, formatter: "link", tooltip:true, formatterParams:{target:"_blank", urlField:'resource_link'} },
            { title: "Scan Date", hozAlign:"center", field: "scan_date", width: 105 },
            { title: "Submitted", field: "submitted_for_processing",  hozAlign :"center", width: 100, formatter: reactFormatter(<this.SubmitButton />)},
            { title: "Section", field: "page_section", hozAlign :"center", width: 80 },
            { title: "Select", width:60, hozAlign :"center",  formatter:reactFormatter(<this.IsChecked/>)},
        ];



        this.tableData = this.props.videosList;

        this.tabulator = new Tabulator(this.el, {
            columns: columns,
            layout:"fitColumns",
            data: this.props.videosList,
            cellEdited: this.dataEditedFunc,
            reactiveData: true,
            rowFormatter:function (row) {
                if(row.getData().ignore_video === true) {
                    row.getElement().classList.remove("tabulator-selectable")
                    row.getElement().classList.add("ignore-video")
                }
                if(row.getData().video_passed === true){
                    row.getElement().classList.remove("tabulator-selectable")
                    row.getElement().classList.add("video-passed")
                }
                if(row.getData().content_hidden === true){
                    row.getElement().classList.add("video-hidden")
                }
            },
            initialFilter: [{field:"invalid_link", type:"!=", value:true}]

        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (JSON.stringify(prevProps.videosList) !== JSON.stringify(this.props.videosList)) {
            this.tabulator.replaceData(this.props.videosList)

        }
        let row_ids = this.state.selected_rows.map(row => {
            return row.id
        });
        this.tabulator.selectRow(row_ids);
        this.tabulator.redraw()

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        let next_rows = nextState.selected_rows.map(row => {
            return row.id
        });

        let cur_rows = this.state.selected_rows.map(row => {
            return row.id
        });

        let updateOnSelect = next_rows.length !== cur_rows.length
        let updateOnDataChange = JSON.stringify(nextProps.videosList) !== JSON.stringify(this.props.videosList)

        return updateOnSelect || updateOnDataChange
    }

    render() {

        return(
            <div className={"tabMainContainer"}>
                <div className={"tabUpperContainer"}>
                    <TabToolBar table={this.tabulator} course_gen_id = {this.props.course_id} selected_rows={this.state.selected_rows}/>
                </div>

                <div className={"tabLowerContainer"}>
                    <div ref={el => (this.el = el)} />
                </div>

            </div>
        )
    }

}

function mapStateToProps({loadingStatusReducer, coursesReducer}, {course_gen_id, canvasVideos}) {

    let course_id = course_gen_id;
    let canvas_videos = canvasVideos;

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
            page_section: video.page_component_count,
            ignore_video: video.ignore_video,
            invalid_link: video.invalid_link,
            resource_type: video.resource_type,
            parent: video.parent_url,
            video_passed: video.auto_caption_passed,
            content_hidden: video.content_hidden

        }
    };

    let videos_list = [];

    Object.keys(canvas_videos).forEach((video) => (
        videos_list.push(formatData(canvas_videos[video]))
    ))


    return {
        videosList: videos_list,
        course_id
    }
}


export default withRouter(connect(mapStateToProps)(CanvasTabulatorContainer))