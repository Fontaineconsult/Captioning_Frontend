import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button'
import {updateiLearnVideo, updateiLearnVideoBatch} from '../../../actions/ampApi/putData'
import '../../../css/tabulator.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddJobModal from "./addJobModal"

class TabToolBar extends Component {

    constructor(props) {
        super(props);

        this.ignore =  this.ignore.bind(this);
        this.remove =  this.remove.bind(this);
        this.createJob =  this.createJob.bind(this);
        this.selectable =  this.selectable.bind(this);

    }





    ignore = (e) => {

        let row_ids = this.props.selected_rows.map(row => {
            return row.id
        });
        this.props.dispatch(updateiLearnVideoBatch(row_ids, "ignore_video", true))
    };

    remove = (e) => {

        let row_ids = this.props.selected_rows.map(row => {
            return row.id
        });
        this.props.dispatch(updateiLearnVideoBatch(row_ids, "invalid_link", true))


    };

    createJob = (e) => {

        console.log(this.props.selected_rows)
    }

    selectable = () => {
        if (this.props.selected_rows.length > 0) {

            return true
        } else {
            return false
        }

    };

    noTitle = () => {

        return this.props.selected_rows.some(row => {

            return row.title === null;



        })


    }


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
                {this.selectable() && !this.noTitle() ?
                    <AddJobModal disabled={false} selected_rows={this.props.selected_rows} course_gen_id={this.props.course_gen_id}/>:
                    <AddJobModal disabled={true} selected_rows={this.props.selected_rows} course_gen_id={this.props.course_gen_id}/>

                }


            </div>
        )
    }

}






function mapStateToProps(state, {course_gen_id, selected_rows}) {


    return {
        state,
        course_gen_id,
        selected_rows
    }
}

export default withRouter(connect(mapStateToProps)(TabToolBar))