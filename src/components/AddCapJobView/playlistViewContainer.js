import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import '../../css/addJobContainer.css'
import Tabulator from "tabulator-tables"
import {getVideoList} from "../../actions/ampApi/fetchData";
import {
    datePicker,
    showDateToggle
} from "../iLearnViewsContainer/iLearnTabulatorViewContainer/TabulatorDataConstructor";
import {reactFormatter} from "react-tabulator";
import Checkbox from "@material-ui/core/Checkbox";
import { v1 as uuidv1 } from 'uuid';
import VideoListToolBar from "./videoListToolBar";
import {updateiLearnVideo} from "../../actions/ampApi/putData";


class PlayListViewContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            transaction_id:'',
            listURL: '',
            selected_rows: []


        };

        this.el = React.createRef()
        this.tabulator = null;
        this.ref = null;


        this.handleInputChange = this.handleInputChange.bind(this)
        this.IsChecked = this.IsChecked.bind(this)
        this.checkBoxFunction = this.checkBoxFunction.bind(this)
    }




    checkBoxFunction(e, cellData) {

        console.log("CELLL DATA", cellData)
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


    IsChecked(props)  {
        console.log("proppss", props.cell._cell.row.modules.hasOwnProperty("select"))

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

            {title: "URL", field: "url"},
            {title: "Title", field: "title", editor:"input"},
            {title:"Captioned", width:80, field:"captioned",  formatter: "tickCross"},
            {title: "Show Date", field: "show_date", width:100, editor:datePicker},
            {title: "Delivery Format", width:80, field: "delivery_format", editor:"select",
                editorParams:{"Amara": "Amara",
                    "SRT":"SRT",
                    "Video File":"Video File"}},
            { title: "Select", width:60, hozAlign :"center", formatter:reactFormatter(<this.IsChecked/>)},
        ];


        this.tabulator = new Tabulator(this.el, {
            columns: columns,
            layout:"fitColumns",
            data: this.props.video_list,
            reactiveData: true,

        })
        this.tabulator.replaceData(this.props.video_list)

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (JSON.stringify(prevProps.video_list) !== JSON.stringify(this.props.video_list)) {

            this.tabulator.replaceData(this.props.video_list)

        }

        let row_ids = this.state.selected_rows.map(row => {
            return row._row.data.id
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
        let updateOnDataChange = JSON.stringify(nextProps.video_list) !== JSON.stringify(this.props.video_list)
        return updateOnSelect || updateOnDataChange
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }




    render() {


        return (

            <div className="listItemsMasterContainer">
                <VideoListToolBar  table={this.tabulator}
                                   auto_caption={this.props.auto_caption}
                                   requesterId={this.props.requesterId}
                                   transaction_id={this.props.transaction_id}
                                   selected_rows={this.state.selected_rows}/>
                <div ref={el => (this.el = el)} />
            </div>

        )
    }

}




function mapStateToProps({videoListsReducer, errorsReducer, tempJobsFormReducer, loadingStatusReducer}, {requesterId, auto_caption, transaction_id, is_locked}) {

    let formatData = (listvideo) => {
        console.log(listvideo)
        return {
            id: uuidv1(),
            title: listvideo.title,
            url: listvideo.url,
            captioned: listvideo.captioned,
            show_date: showDateToggle(new Date()),
            delivery_format: 'Amara',
        }
    };


    let video_list = [];

    console.log(videoListsReducer)
    Object.keys(videoListsReducer).forEach((video) => {

        video_list.push(formatData(videoListsReducer[video]))

    });


    return {
        video_list,
        requesterId,
        transaction_id,
        auto_caption,
        is_locked

    }
}


export default withRouter(connect(mapStateToProps)(PlayListViewContainer))