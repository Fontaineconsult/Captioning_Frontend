import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import { updateCanvasVideoBatch } from '../../../actions/ampApi/putData';
import '../../../css/tabulator.css';
import AddJobModal from "./addJobModal";
import clipboardCopy from "clipboard-copy";

// Define CSS styles directly within the component
const styles = {
    toolbarContainer: {
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        padding: '10px',
    },
};

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
        let row_ids = this.props.selected_rows.map(row => row._row.data.id);
        this.props.dispatch(updateCanvasVideoBatch(row_ids, "auto_caption_passed", true));
        this.props.table.deselectRow();
    }

    ignore(e) {
        let row_ids = this.props.selected_rows.map(row => row._row.data.id);
        this.props.dispatch(updateCanvasVideoBatch(row_ids, "ignore_video", true));
        this.props.table.deselectRow();
    }

    remove(e) {
        let row_ids = this.props.selected_rows.map(row => row._row.data.id);
        this.props.dispatch(updateCanvasVideoBatch(row_ids, "invalid_link", true));
        this.props.table.deselectRow();
    }

    selectable() {
        return this.props.selected_rows.length > 0;
    }

    noTitle() {
        return this.props.selected_rows.some(row => !row._row.data.title);
    }

    copyToClipboard() {
        let rows = this.props.selected_rows;
        let selected_rows_string = "";
        rows.forEach((e) => {
            selected_rows_string += `Title: ${e._row.data.title}\nLink: ${e._row.data.resource_link}\n\n`;
        });

        clipboardCopy(selected_rows_string)
            .then(console.log("copied: "))
            .catch((e) => {
                alert(e);
            });
    }

    render() {
        return (
            <div style={styles.toolbarContainer}>
                <Button size="small" disabled={!this.selectable()} onClick={this.passed}>Passed</Button>
                <Button size="small" disabled={!this.selectable()} onClick={this.ignore}>Ignore</Button>
                <Button size="small" disabled={!this.selectable()} onClick={this.remove}>Remove</Button>
                <AddJobModal disabled={!this.selectable() || this.noTitle()} selected_rows={this.props.selected_rows} course_gen_id={this.props.course_gen_id} />
                <Button size="small" disabled={!this.selectable() || this.noTitle()} onClick={this.copyToClipboard}>Copy to Clipboard</Button>
            </div>
        );
    }
}

function mapStateToProps(state, { course_gen_id, selected_rows, table }) {
    return {
        state,
        course_gen_id,
        selected_rows
    };
}

export default withRouter(connect(mapStateToProps)(TabToolBar));
