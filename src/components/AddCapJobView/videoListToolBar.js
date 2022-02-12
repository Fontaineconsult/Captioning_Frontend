import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import Button from '@material-ui/core/Button'
import {AddVideoJobBatch} from "../../actions/ampApi/postData";
import {addTempJob, addVideoToTempList, clearTempCapJobs} from "../../actions/tempJobsForm";
import {v1 as uuidv1} from "uuid";



class VideoListToolBar extends Component {

    constructor(props) {
        super(props);

        this.add = this.add.bind(this);


    }




    add(e) {
        console.log(this.props.selected_rows)
        let row_ids = this.props.selected_rows.map(row => {
            return row._row.data.id
        });


        this.props.dispatch(addVideoToTempList(this.props.transaction_id, "test", "test"))
        this.props.table.deselectRow()
    };

    selectable() {
        if (this.props.selected_rows.length > 0) {
            return true
        } else {
            return false
        }

    };

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

            </div>
        )
    }

}





function mapStateToProps(state, {selected_rows, requesterId, transaction_id,auto_caption,is_locked, table}) {

    return {
        state,
        requesterId,
        selected_rows,
        transaction_id,
        auto_caption,
        is_locked,
        table
    }
}

export default withRouter(connect(mapStateToProps)(VideoListToolBar))