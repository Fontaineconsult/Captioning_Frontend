import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import {withRouter} from "react-router";
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import AddJobsiLearnContainer from "./addJobsContainer";
import {AddVideoJobBatch} from "../../../actions/ampApi/postData"
import {clearTempCapJobs} from "../../../actions/tempJobsForm"
import {clearMediaSearch} from "../../../actions/mediaSearch";
import {updateCanvasVideo, updateiLearnVideo} from "../../../actions/ampApi/putData";
import AddJobsCanvasContainer from "./addJobsContainer";




const useStyles = theme => ({
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});


class AddJobModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setOpen: false,
            useParent: false,
            modalStyle: this.getModalStyle()

        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getModalStyle = this.getModalStyle.bind(this);
        this.submitVideoJobs = this.submitVideoJobs.bind(this)

    }

    submitVideoJobs() {

        this.props.selected_rows.forEach(row => {
            row.update({"submitted_for_processing": true})
            let rowData = row._row.data
            this.props.dispatch(updateCanvasVideo(rowData.id, "submitted_for_processing", true))

        })

        this.props.dispatch(AddVideoJobBatch(this.props.tempJobsFormReducer));
        this.props.dispatch(clearMediaSearch());
        this.props.dispatch(clearTempCapJobs())

    }


    getModalStyle() {
        const top = 50
        const left = 50
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    handleOpen(name) {

        if (name==='create_job') {
            this.setState({
            setOpen: true,
            open:true
        })}
        if (name==='create_job_from_parent') {
            this.setState({
                setOpen: true,
                open:true,
                useParent: true

            })}

    };

    handleClose() {
        this.setState({
            setOpen:false,
            open: false,
            useParent: false

        })

    };


    render() {

        return (
            <React.Fragment>
                <Button size="small" disabled={this.props.disabled} type="button" id={"creat_job"} onClick={e => this.handleOpen("create_job")}>
                    CREATE JOB
                </Button>
                <Button size="small" id={"create_job_from_parent"} disabled={this.props.disabled} type="button" onClick={e => this.handleOpen("create_job_from_parent")}>
                    CREATE JOB FROM PARENT
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {<div style={this.state.modalStyle} className={this.props.classes.paper}>
                        <h2 id="simple-modal-title">Create Jobs</h2>
                        <AddJobsCanvasContainer useParent = {this.state.useParent} course_gen_id = {this.props.course_gen_id} selected_rows = {this.props.selected_rows}/>
                        <Button size={"small"} disabled={Object.keys(this.props.tempJobsFormReducer).length === 0}  onClick={this.submitVideoJobs}>Create Jobs</Button>
                    </div>}
                </Modal>
            </React.Fragment>

        )
    }


}


function mapStateToProps({tempJobsFormReducer}, {course_gen_id, selected_rows}) {

    return {
        tempJobsFormReducer,
        course_gen_id,
        selected_rows
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(useStyles, { withTheme: true })(AddJobModal)))