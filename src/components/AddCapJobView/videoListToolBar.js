import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import Button from '@material-ui/core/Button'
import {addMediaToListTempJob, AddVideoJobBatch} from "../../actions/ampApi/postData";
import {addTempJob, addVideoToTempList, clearTempCapJobs} from "../../actions/tempJobsForm";
import {v1 as uuidv1} from "uuid";
import {addJobInfoToTempJob, addListTempJob, completeTempJob} from "../../actions/tempJobsForm"
import {updateiLearnVideo} from "../../actions/ampApi/putData";
import {emptyVideoList} from "../../actions/videoLists"

class VideoListToolBar extends Component {

    constructor(props) {
        super(props);

        this.add = this.add.bind(this);
        this.commit = this.commit.bind(this);


    }




    add(e) {
        console.log(this.props.selected_rows)
        let row_ids = this.props.selected_rows.map(row => {
            return {
                video: {title:row._row.data.title,
                    url:row._row.data.url},
                job_info: {
                    show_date: row._row.data.show_date,
                    delivery_format: row._row.data.delivery_format,
                    requester_id: this.props.requesterId.requester_id,
                    ilearn_auto_caption: this.props.auto_caption,
                    semester: 'sp22',
                    comments: "",
                },
                meta: {
                    transaction_id: row._row.data.id,
                    requester_id: this.props.requesterId.requester_id

                }


            }

        });

        console.log(row_ids)

        row_ids.forEach(row => {
            console.log(row)
            this.props.dispatch(addListTempJob(row.meta.transaction_id, this.props.requesterId.requester_id))
            this.props.dispatch(addMediaToListTempJob(row.video.title, row.video.url, row.meta.transaction_id))
            this.props.dispatch(addJobInfoToTempJob(row.meta.transaction_id, row.job_info))

        })

        this.props.table.deselectRow()
    };

    editCell(cellData) {

        this.props.dispatch(updateiLearnVideo(cellData._cell.row.data.id, cellData._cell.column.field, cellData._cell.value))
    };

    commit(){

        Object.keys(this.props.tempJobsFormReducer).forEach(key => {
            this.props.dispatch(completeTempJob(key, true))

        })

    }

    selectable() {
        if (this.props.selected_rows.length > 0) {
            return true
        } else {
            return false
        }

    };


    commitable() {

        return Object.keys(this.props.tempJobsFormReducer).some(key => {
            return this.props.tempJobsFormReducer[key].meta.created === false && !this.props.mediaLoading

        })



    }

    clearAble() {
        return Object.keys(this.props.videoListsReducer).length > 0


    }

    clearSearch() {
        this.props.dispatch(emptyVideoList())

    }

    noTitle() {

        return this.props.selected_rows.some(row => {
            return row._row.data.title === "" || row._row.data.title === null;

        })


    }



    render() {

        return(
            <div className={"toolbar-container"}>
                {this.selectable() ?
                    <Button size="small"  onClick={e => this.add(e)}>Add</Button>:
                    <Button size="small" disabled onClick={e => this.add(e)}>Add</Button>
                }
                {this.commitable() ?
                    <Button size="small"  onClick={e => this.commit(e)}>Commit</Button>:
                    <Button size="small" disabled onClick={e => this.commit(e)}>Commit</Button>
                }

                {this.clearAble() ?
                    <Button size="small"  onClick={e => this.clearSearch(e)}>Clear</Button>:
                    <Button size="small" disabled onClick={e => this.clearSearch(e)}>Clear</Button>
                }
            </div>
        )
    }

}





function mapStateToProps({tempJobsFormReducer, videoListsReducer, loadingStatusReducer}, {selected_rows,
    requesterId,
    transaction_id,
    auto_caption,
    is_locked,
    table}) {

    return {
        tempJobsFormReducer,

        requesterId,
        selected_rows,
        transaction_id,
        auto_caption,
        is_locked,
        table,
        mediaLoading: loadingStatusReducer.mediaLoading,
        videoListsReducer
    }
}

export default withRouter(connect(mapStateToProps)(VideoListToolBar))