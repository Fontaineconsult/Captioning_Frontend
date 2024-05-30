import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PreparedJobsContainer from "../../AddCapJobView/preparedJobsContainer";
import { addMediaToDBandTempJob } from "../../../actions/ampApi/postData"
import { addJobInfoToTempJob, addTempJob, clearTempCapJobs, completeTempJob } from '../../../actions/tempJobsForm'
import { v1 as uuidv1 } from 'uuid';
import { clearMediaSearch } from "../../../actions/mediaSearch"
import moment from 'moment'

// Define CSS styles directly within the component
const styles = {
    container: {
        padding: '10px',
        overflowX: 'auto', // overflow property to handle horizontal overflow
        // can add more styling for the container element
    },
};

class AddJobsContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.selected_rows.forEach(row => {

            let id = uuidv1()

            this.props.dispatch(addTempJob(id, this.props.requester_id))

            if (this.props.useParent === false) {
                this.props.dispatch(addMediaToDBandTempJob(row._row.data.title,
                    row._row.data.resource_link, 'URL', id))
            }

            if (this.props.useParent === true) {
                this.props.dispatch(addMediaToDBandTempJob(row._row.data.title,
                    row._row.data.parent, 'URL', id))
            }


            let requester_id = Object.keys(this.props.requesterReducer).find(requester => {
                if (this.props.requesterReducer[requester].course_id !== null && this.props.requesterReducer[requester].course_id === row._row.data.course) {
                    return this.props.requesterReducer[requester].id
                }
            })


            let reducer_obj = {
                show_date: moment(row._row.data.indicated_due_date, "MM/DD/YYYY", true).isValid() ? row._row.data.indicated_due_date : moment().add(2, 'days'),
                delivery_format: "Amara",
                comments: "Added from Canvas Page section " + row._row.data.page_section,
                requester_id: requester_id,
                semester: this.props.semester,
                ilearn_auto_caption: true
            };

            this.props.dispatch(addJobInfoToTempJob(id, reducer_obj))
            this.props.dispatch(completeTempJob(id, true))

        });
    }

    componentWillUnmount() {
        this.props.dispatch(clearTempCapJobs())
        this.props.dispatch(clearMediaSearch())
    }

    render() {
        return (
            <div style={styles.container}>
                <h3>Add Canvas Video</h3>
                <PreparedJobsContainer requester_ids={this.props.requester_ids} />
            </div>
        )
    }
}

function mapStateToProps({ globalsReducer, coursesReducer, requesterReducer }, { course_gen_id, selected_rows }) {
    let semester = globalsReducer.currentSemester
    let requester_ids = []

    selected_rows.forEach(row => {
        requester_ids.push(
            Object.keys(requesterReducer).find(requester => {
                if (requesterReducer[requester].course_id !== null && requesterReducer[requester].course_id === row._row.data.course) {
                    return requesterReducer[requester].id
                }
            })
        )
    })

    let requester_id = undefined
    return {
        requesterReducer,
        coursesReducer,
        course_gen_id,
        selected_rows,
        requester_ids,
        semester
    }
}

export default withRouter(connect(mapStateToProps)(AddJobsContainer))
