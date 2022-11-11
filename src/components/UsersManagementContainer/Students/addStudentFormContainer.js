import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {AddStudent} from "../../../actions/ampApi/postData";

class AddStudentContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            student_id: '',
            student_first_name: '',
            student_last_name: '',
            student_email: '',
            student_requests: '',
            is_captioning_active: false,
            is_transcripts_only: false,
            //may add course enrolled later
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }


    handleSubmit(event) {
        event.preventDefault()

        //change this to AddStudents
        this.props.dispatch(AddStudent(this.state))
        this.setState({
            student_id: '',
            student_first_name: '',
            student_last_name: '',
            student_email: '',
            student_requests: '',
            is_captioning_active: false,
            is_transcripts_only: false,
        })



    }

    render() {

        return (
            <div className="addEmployeeContainer emp-top">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor={"student_id"}>
                        <div>Student ID</div>
                        <input className={"emp-input"} maxLength={9} value={this.state.student_id} type={'text'}
                               name={"student_id"} onChange={this.handleInputChange}/>
                    </label>

                    <label htmlFor={"student_first_name"}>
                        <div>First Name</div>
                        <input className={"emp-input"} required={true} value={this.state.student_first_name}
                               type={'text'}
                               name={"student_first_name"} onChange={this.handleInputChange}/>
                    </label>


                    <label htmlFor={"student_last_name"}>
                        <div>Last Name</div>
                        <input className={"emp-input"} required={true} value={this.state.student_last_name}
                               type={'text'}
                               name={"student_last_name"} onChange={this.handleInputChange}/>
                    </label>

                    <label htmlFor={"student_email"}>
                        <div>E-Mail</div>
                        <input className={"emp-input"} required={true} value={this.state.student_email} type={'text'}
                               name={"student_email"} onChange={this.handleInputChange}/>
                    </label>
                    <label htmlFor={"student_requests"}>
                        <div>Student Requests</div>
                        <textarea value={this.state.student_requests} required={false} onChange={this.handleInputChange}
                                  name={"student_requests"} rows="4" cols="50">
                        </textarea>
                    </label>

                    <label htmlFor={"is_captioning_active"}>
                        <div>Captioning</div>
                        <input className={"stu-checkbox"}
                               name="is_captioning_active"
                               type="checkbox"
                               checked={this.state.is_captioning_active}
                               value={this.state.is_captioning_active}
                               onChange={this.handleInputChange}
                        />
                    </label>


                    <label htmlFor={"is_transcripts_only"}>
                        <div>Transcripts</div>
                        <input className={"stu-checkbox"}
                               name="is_transcripts_only"
                               type="checkbox"
                               checked={this.state.is_transcripts_only}
                               value={this.state.is_transcripts_only}
                               onChange={this.handleInputChange}
                        />
                    </label>

                    <div>
                        <input type="submit" name="Submit"/>
                    </div>
                </form>
            </div>

        )

    }


}


function mapStateToProps({videosJobsReducer}, {props}) {


    return {}
}

export default withRouter(connect(mapStateToProps)(AddStudentContainer))