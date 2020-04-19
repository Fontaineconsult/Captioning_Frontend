import DatePicker from 'react-date-picker';
import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from "react-select";
import {addJobInfoToTempJob, completeTempJob} from "../../actions/tempJobsForm";
import Button from "@material-ui/core/Button";



class NewJobFormContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {

            comments: "",
            show_date: new Date(),
            delivery_format: "Amara"

        };
        this.addJobInfo = this.addJobInfo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSetDate = this.handleSetDate.bind(this)

    }

    handleSetDate(value) {
        console.log(value)
        this.setState({show_date: value})

    }


    addJobInfo(event) {

        console.log(event)

        // let requester_ids = Object.keys(this.props.requesterReducer);
        // let requester_id = requester_ids.find(x => this.props.requesterReducer[x].course_id === this.props.current_course)



        let reducer_obj = {
            show_date: this.state.show_date,
            delivery_format: this.state.delivery_format,
            comments: this.state.comments,
            requester_id: this.props.requesterId,
        };

        this.props.dispatch(addJobInfoToTempJob(this.props.transaction_id, reducer_obj))
        this.props.dispatch(completeTempJob(this.props.transaction_id, true))

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (!this.props.isLocked) {
            this.setState({
                [name]: value
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


        if (prevProps.transaction_id !== this.props.transaction_id) {
            if (this.props.transaction_id === '') {
                this.setState({
                    comments: '',
                    show_date: new Date(),
                    delivery_format: "Amara",
                    requester_id: this.props.requesterId
                })
            }
        }
    }

    render() {

        return (

            <div>
                <form className="jobForm">

                    <div className="jobFormLeft">
                        <div>
                            <label>
                                Show Date:
                                <DatePicker name="show_date" value={this.state.show_date} onChange={this.handleSetDate}/>
                            </label>
                        </div>

                        <div>
                            <label>
                                Output:
                                <select name="delivery_format" value={this.state.delivery_format} onChange={this.handleInputChange}>
                                    <option value="Amara">URL (Amara.org)</option>
                                    <option value="SRT">Caption File (.SRT)</option>
                                    <option value="Video File">Video File (.mp4)</option>
                                </select>
                            </label>
                        </div>

                    </div>
                    <div className="jobFormRight">
                        <label>
                            <textarea
                                className="jobFormComments"
                                placeholder="comments"
                                name="comments"
                                type='text'
                                value={this.state.comments}
                                onChange={this.handleInputChange} />
                        </label>
                    </div>






                </form>


                <Button size="small"  variant="contained" onClick={e => this.addJobInfo(e)} disabled={this.props.formDisabled}>Complete Request</Button>
            </div>

        )
    }

}

function mapStateToProps({coursesReducer, mediaSearchReducer, errorsReducer, tempJobsFormReducer, requesterReducer}, {props, requesterId, isLocked}) {
    let formDisabled = requesterId === "";

    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        requesterReducer,
        coursesReducer,
        props,
        isLocked,
        requesterId,
        formDisabled
    }
}


export default withRouter(connect(mapStateToProps)(NewJobFormContainer))