import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button'
import {updateiLearnVideo, updateiLearnVideoBatch} from '../../../actions/ampApi/putData'
import '../../../css/tabulator.css'


class TabToolBar extends Component {

    constructor(props) {
        super(props);

        this.ignore =  this.ignore.bind(this);
        this.remove =  this.remove.bind(this);
        this.createJob =  this.createJob.bind(this);
        this.selectable =  this.selectable.bind(this)
    }


    ignore = (e) => {

        console.log(this.props.selected_rows);
        let row_ids = this.props.selected_rows.map(row => {
            return row.id
        });
        this.props.dispatch(updateiLearnVideoBatch(row_ids, "ignore_video", true))
    };


    remove = (e) => {
        console.log(this.props.selected_rows);
        let row_ids = this.props.selected_rows.map(row => {
            return row.id
        });
        this.props.dispatch(updateiLearnVideoBatch(row_ids, "invalid_link", true))


    };

    createJob = (e) => {

        console.log("farts")
    }

    selectable = () => {
        if (this.props.selected_rows.length > 0) {
            return true
        } else {
            return false
        }

    };

    render() {
        return(
            <div className={this.selectable()}>
                {this.selectable() ?
                    <Button size="small"  onClick={e => this.ignore(e)}>Ignore</Button>:
                    <Button size="small" disabled onClick={e => this.ignore(e)}>Ignore</Button>
                }
                {this.selectable() ?
                    <Button size="small"  onClick={e => this.remove(e)}>Remove</Button>:
                    <Button size="small" disabled onClick={e => this.remove(e)}>Remove</Button>

                }
                {this.selectable() ?
                    <Button size="small"  onClick={e => this.createJob(e)}>Create Job</Button>:
                    <Button size="small" disabled onClick={e => this.createJob(e)}>Create Job</Button>

                }
            </div>
        )
    }

}

function mapStateToProps(state, {props}) {

    return {
        state,
        props
    }
}

export default withRouter(connect(mapStateToProps)(TabToolBar))