import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {addAstJobToCaptioningJob} from "../../actions/ampApi/postData"
import { v1 as uuidv1 } from 'uuid';
import astModal from "../../css/astModal.css"

import Select from "react-select";

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



class AstModalContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            temp_id: '',
            setOpen: false,
            modalStyle: this.getModalStyle(),
            rate: "T",
            file_id: "",
            file_select: this.props.media_files


        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getModalStyle = this.getModalStyle.bind(this);
        this.createAstJob = this.createAstJob.bind(this)
        this.modalContent = this.modalContent.bind(this)
        this.submitJobtoDB = this.submitJobtoDB.bind(this)
        this.updateState = this.updateState.bind(this)
        this.updateMediaSelect = this.updateMediaSelect.bind(this)

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

    handleOpen() {

        this.setState({
            temp_id: uuidv1(),
            setOpen: true,
            open:true
        })
    };

    handleClose() {
        this.setState({

            setOpen:false,
            open: false

        })

    };

    submitJobtoDB(event) {

        event.preventDefault()
        this.props.dispatch(addAstJobToCaptioningJob(this.props.job_id,
            this.state.rate,
            this.state.temp_id,
            this.state.file_id.value))
    }

    createAstJob(event) {


    }

    updateState(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

    }

    updateMediaSelect(value) {
        this.setState({
            file_id: value
        })

    }

    modalContent() {
        return(

            <div style={this.state.modalStyle} className={this.props.classes.paper}>
                <div className={"astModalTitle"}>Create AST Job</div>

                <div>
                    <form>
                        <label>
                            Select Media
                            <Select value={this.state.file_id} onChange={this.updateMediaSelect} options={this.state.file_select}/>
                        </label>


                        <label>
                            Rate
                            <select name="rate" value={this.state.rate} onChange={this.updateState}>
                                <option value="H">8 Hour</option>
                                <option value="R">1 Day</option>
                                <option value="T">2 Day</option>
                                <option value="L">4 Day</option>
                            </select>
                        </label>
                        <label>
                            <Button onClick={this.submitJobtoDB}>Init Job</Button>
                        </label>
                    </form>
                    Create AST Job
                </div>
                <div>
                    <div>
                        Are you sure you want to submit? Charges will apply.
                    </div>
                    <Button onClick={this.createAstJob}>Submit to AST</Button>
                </div>

            </div>


        )


    }

    render() {

        return(
            <React.Fragment>
                <Button
                    style={{maxHeight: '25px', padding:'0px 3px'}}
                    variant="contained"
                    name={"creatAstJob"}
                    onClick={this.handleOpen}
                    title={"Send to Ast"}

                >Ast</Button>
                <Modal open={this.state.open}
                       onClose={this.handleClose}
                       aria-labelledby="simple-modal-title"
                       aria-describedby="simple-modal-description">{this.modalContent()}</Modal>
            </React.Fragment>)

    }

}


function mapStateToProps({mediaReducer, videosJobsReducer, loadingStatusReducer}, {job_id}) {
    let media_files

    if (loadingStatusReducer.videoJobsLoading === false) {

        media_files = mediaReducer[videosJobsReducer[job_id].media.id].media_objects.reduce((accumulator, element) => {
            if (element.associated_files !== null){
                accumulator.push({value: element.associated_files.id, label: element.associated_files.file_name})
            }
            return accumulator
        },[])
    }

    return {
        media_files,
        job_id
    }
}





export default withRouter(connect(mapStateToProps)(withStyles(useStyles, { withTheme: true })(AstModalContainer)))