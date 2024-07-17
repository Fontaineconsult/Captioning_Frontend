import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import {reactFormatter} from 'react-tabulator';
import * as tabFuncs from './TabulatorDataConstructor';
import {updateCanvasVideo} from '../../../actions/ampApi/putData';
import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import RemoveIcon from '@material-ui/icons/Remove';
import '../../../css/tabulator.css';
import Tabulator from "tabulator-tables";
import moment from 'moment';
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
        this.IsChecked = this.IsChecked.bind(this);

        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
    }

    IsCaptionedButton(props) {
        const cellData = props.cell;
        const disabled = this.state.selected_rows.length > 0;

        const renderButton = (text, color, onClick) => (
            <Button size="small" color={color} disabled={disabled} onClick={disabled ? null : onClick}>{text}</Button>
        );

        switch (cellData._cell.value) {
            case true:
                return renderButton('Available', 'primary', e => this.submitCapStatus(e, cellData));
            case false:
                return renderButton('Unavailable', 'secondary', e => this.submitCapStatus(e, cellData));
            default:
                return renderButton('Unknown', 'tertiary', e => this.submitCapStatus(e, cellData));
        }
    }

    SubmitButton(props) {
        const cellData = props.cell;
        const disabled = this.state.selected_rows.length > 0;

        const renderIconButton = (Icon, onClick) => (
            <IconButton size="small" disabled={disabled} onClick={disabled ? null : onClick}>
                <Icon/>
            </IconButton>
        );

        return cellData._cell.value === false || cellData._cell.value === null
            ? renderIconButton(RemoveIcon, e => this.submitCap(e, cellData))
            : renderIconButton(DoneIcon, e => this.submitCap(e, cellData));
    }

    ClosedCaptionLink(props) {
        const cellData = props.cell;
        const link = cellData._cell.value || cellData._cell.row.data.resource_link;
        if (link) {
            return (
                <Tooltip title={link}>
                    <Button size="small" onClick={() => window.open(link, '_blank')}>
                        <tabFuncs.ClosedCaptionIcon/>
                    </Button>
                </Tooltip>
            );
        }
        return '';
    }

    checkBoxFunction(e, cellData) {
        if (e.type === "click") {
            const table = cellData.cell._cell.table;
            const row = cellData.cell._cell.row;
            row.modules.select.selected ? table.deselectRow(row.data.id) : table.selectRow(row.data.id);
            this.setState({selected_rows: table.getSelectedRows()});
        }
    }

    submitCapStatus(e, cellData) {
        e.preventDefault();
        const captionStatus = tabFuncs.capStatToggle2(cellData._cell.value);
        this.props.dispatch(updateCanvasVideo(cellData._cell.row.data.id, cellData._cell.column.field, captionStatus))
            .then(() => {
                this.setState({selected_rows: this.tabulator.getSelectedRows()});
            });
    }

    submitCap(e, cellData) {
        e.preventDefault();
        const submitCapStatus = tabFuncs.capSubmitToggle(cellData._cell.value);
        this.props.dispatch(updateCanvasVideo(cellData._cell.row.data.id, cellData._cell.column.field, submitCapStatus))
            .then(() => {
                this.setState({selected_rows: this.tabulator.getSelectedRows()});
            });
    }

    dataEditedFunc(cellData) {
        this.props.dispatch(updateCanvasVideo(cellData._cell.row.data.id, cellData._cell.column.field, cellData._cell.value));
    }

    cellClick(e, row) {
        console.log("ref table: ", this.ref.table);
        console.log(`rowClick id: ${row.getData().id}`, row, e);
    }

    IsChecked(props) {
        const {select} = props.cell._cell.row.modules;
        const checked = select && select.selected;
        return <Checkbox size="small" checked={checked} onClick={e => this.checkBoxFunction(e, props)}/>;
    }

    componentDidMount() {
        const columns = [
            {title: "Title", field: "title", editor: "input"},
            {
                title: "Captioned",
                field: "captioned",
                width: 130,
                hozAlign: "center",
                formatter: reactFormatter(<this.IsCaptionedButton/>)
            },
            // Removing because we are not using this feature
            // {
            //     title: "CC",
            //     width: 75,
            //     field: "captioned_link",
            //     hozAlign: "center",
            //     formatter: reactFormatter(<this.ClosedCaptionLink/>)
            // },
            {
                title: "Parent",
                width: 95,
                field: "resource_type",
                hozAlign: "center",
                formatter: "link",
                formatterParams: {target: "_blank", urlField: 'parent'}
            },
            {
                title: "Link",
                field: "resource_link",
                width: 350,
                widthShrink: 1,
                formatter: "link",
                tooltip: true,
                formatterParams: {target: "_blank", urlField: 'resource_link'}
            },
            {title: "Scan Date", hozAlign: "center", field: "scan_date", width: 105},
            {
                title: "Submitted",
                field: "submitted_for_processing",
                hozAlign: "center",
                width: 100,
                formatter: reactFormatter(<this.SubmitButton/>)
            },
            {title: "Section", field: "page_section", hozAlign: "center", width: 80},
            {title: "Select", width: 60, hozAlign: "center", formatter: reactFormatter(<this.IsChecked/>)},
        ];

        this.tabulator = new Tabulator(this.el, {
            columns,
            layout: "fitColumns",
            rowHeight: 37,
            data: this.props.videosList,
            cellEdited: this.dataEditedFunc,
            reactiveData: true,
            rowFormatter: function (row) {
                const data = row.getData();
                if (data.ignore_video) row.getElement().classList.add("ignore-video");
                if (data.video_passed) row.getElement().classList.add("video-passed");
                if (data.content_hidden) row.getElement().classList.add("video-hidden");
            },
            initialFilter: [{field: "invalid_link", type: "!=", value: true}]
        });

        this.tabulator.redraw();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.videosList) !== JSON.stringify(this.props.videosList)) {
            this.tabulator.replaceData(this.props.videosList);
        }
        const row_ids = this.state.selected_rows.map(row => row.id);
        this.tabulator.selectRow(row_ids);
        this.tabulator.redraw();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const next_rows = nextState.selected_rows.map(row => row.id);
        const cur_rows = this.state.selected_rows.map(row => row.id);

        return next_rows.length !== cur_rows.length || JSON.stringify(nextProps.videosList) !== JSON.stringify(this.props.videosList);
    }

    render() {
        return (
            <div className={"tabMainContainer"}>
                <div className={"tabUpperContainer"}>
                    <TabToolBar table={this.tabulator} course_gen_id={this.props.course_id}
                                selected_rows={this.state.selected_rows}/>
                </div>

                <div className={"tabLowerContainer"}>
                    <div ref={el => (this.el = el)}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({loadingStatusReducer, coursesReducer}, {course_gen_id, canvasVideos}) {
    const formatData = video => ({
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
        content_hidden: video.content_hidden,
        course: video.course_gen_id
    });

    return {
        videosList: Object.values(canvasVideos).map(formatData),
        course_id: course_gen_id
    };
}

export default withRouter(connect(mapStateToProps)(CanvasTabulatorContainer));
