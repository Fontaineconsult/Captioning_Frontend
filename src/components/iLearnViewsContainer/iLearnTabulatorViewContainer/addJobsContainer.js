import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import PreparedJobsContainer from "../../AddCapJobView/preparedJobsContainer";
import {addMediaToDBandTempJob} from "../../../actions/ampApi/postData"
import {addTempJob, clearTempCapJobs, addJobInfoToTempJob, completeTempJob} from '../../../actions/tempJobsForm'
import { v1 as uuidv1 } from 'uuid';
import {clearMediaSearch} from "../../../actions/mediaSearch"
import moment from 'moment'

class AddJobsiLearnContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {
        this.props.selected_rows.forEach(row => {
            console.log(this.props.requester_id)
            let id = uuidv1()
            this.props.dispatch(addTempJob(id, this.props.requester_id))
            this.props.dispatch(addMediaToDBandTempJob(row.title, row.resource_link, 'URL', id))

            let requester_id = Object.keys(this.props.requesterReducer).find(requester => {
                return this.props.requesterReducer[requester].course_id === this.props.course_gen_id
            });

            let reducer_obj = {
                show_date: moment(row.indicated_due_date, "MM/DD/YYYY", true).isValid() ? row.indicated_due_date : moment().add(2,'days'),
                delivery_format: "Amara",
                comments: "Added from iLearn Page",
                requester_id: requester_id,
                semester: this.props.semester
            };
            this.props.dispatch(addJobInfoToTempJob(id, reducer_obj))
            this.props.dispatch(completeTempJob(id,true))



        });

    }

    componentWillUnmount() {


        this.props.dispatch(clearTempCapJobs())
        this.props.dispatch(clearMediaSearch())

    }


    render() {

        return (

            <div>
                <PreparedJobsContainer/>
            </div>

        )
    }


}


function mapStateToProps({globalsReducer, coursesReducer, requesterReducer}, {course_gen_id, selected_rows}) {

    let semester = globalsReducer.semester

    let requester_id = Object.keys(requesterReducer).find(requester => {
        if (requesterReducer[requester].course_id === course_gen_id) {
            return requesterReducer[requester].id

        }

    })


    return {
        requesterReducer,
        coursesReducer,
        course_gen_id,
        selected_rows,
        requester_id,
        semester
    }
}

export default withRouter(connect(mapStateToProps)(AddJobsiLearnContainer))