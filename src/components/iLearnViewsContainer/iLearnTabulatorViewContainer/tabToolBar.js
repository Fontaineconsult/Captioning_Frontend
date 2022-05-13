import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import Button from '@material-ui/core/Button'
import {updateiLearnVideoBatch} from '../../../actions/ampApi/putData'
import '../../../css/tabulator.css'
import AddJobModal from "./addJobModal"

class TabToolBar extends Component {

    constructor(props) {
        super(props);

        this.passed = this.passed.bind(this);
        this.ignore = this.ignore.bind(this);
        this.remove = this.remove.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.selectable = this.selectable.bind(this);

    }

    passed(e) {

        let row_ids = this.props.selected_rows.map(row => {
            return row._row.data.id
        });

        this.props.dispatch(updateiLearnVideoBatch(row_ids, "auto_caption_passed", true))
        this.props.table.deselectRow()
    };


    ignore(e) {

        let row_ids = this.props.selected_rows.map(row => {
            return row._row.data.id
        });

        this.props.dispatch(updateiLearnVideoBatch(row_ids, "ignore_video", true))
        this.props.table.deselectRow()
    };

    remove(e) {

        let row_ids = this.props.selected_rows.map(row => {
            return row._row.data.id
        });

        this.props.dispatch(updateiLearnVideoBatch(row_ids, "invalid_link", true))
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
            console.log(this.props.selected_rows)
            return row._row.data.title === "" || row._row.data.title === null;

        })


    }

    copyToClipboard() {
        // console.log("selected row are: ", this.props.selected_rows);

        let rows = this.props.selected_rows;
        let string = ""

        rows.map((e) => {
            console.log("selected row title: ", e._row.data.title);
            console.log("selected row link: ", e._row.data.resource_link);
            string = string + "Title: " + e._row.data.title + "\nLink: " + e._row.data.resource_link + "\n\n";
        })

        console.log("selected rows string: ", string);
        navigator.clipboard.writeText(string);
    }

    render() {

        return (
            <div className={"toolbar-container"}>
                {this.selectable() ?
                    <Button size="small" onClick={e => this.passed(e)}>Passed</Button> :
                    <Button size="small" disabled onClick={e => this.passed(e)}>Passed</Button>
                }
                {this.selectable() ?
                    <Button size="small" onClick={e => this.ignore(e)}>Ignore</Button> :
                    <Button size="small" disabled onClick={e => this.ignore(e)}>Ignore</Button>
                }
                {this.selectable() ?
                    <Button size="small" onClick={e => this.remove(e)}>Remove</Button> :
                    <Button size="small" disabled onClick={e => this.remove(e)}>Remove</Button>

                }
                {this.selectable() && !this.noTitle() ?
                    <AddJobModal disabled={false} selected_rows={this.props.selected_rows}
                                 course_gen_id={this.props.course_gen_id}/> :
                    <AddJobModal disabled={true} selected_rows={this.props.selected_rows}
                                 course_gen_id={this.props.course_gen_id}/>

                }

                {this.selectable() && !this.noTitle() ?
                    <Button size="small" onClick={e => this.copyToClipboard(e)}>Copy to Clipboard</Button> :
                    <Button size="small" disabled onClick={e => this.copyToClipboard(e)}>Copy to Clipboard</Button>

                }

            </div>
        )
    }

}


function mapStateToProps(state, {course_gen_id, selected_rows, table}) {

    console.log("ROWS", table)
    return {
        state,
        course_gen_id,
        selected_rows
    }
}

export default withRouter(connect(mapStateToProps)(TabToolBar))