import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import PreparedJobsContainer from "../../AddCapJobView/preparedJobsContainer";
import {addMediaToDBandTempJob} from "../../../actions/ampApi/postData"
import {addJobInfoToTempJob, addTempJob, clearTempCapJobs, completeTempJob} from '../../../actions/tempJobsForm'
import {v1 as uuidv1} from 'uuid';
import {clearMediaSearch} from "../../../actions/mediaSearch"
import moment from 'moment'

class AddJobsCanvasContainer extends Component {

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


            // let requester_id = Object.keys(this.props.requesterReducer).find(requester => {
            //     return this.props.requesterReducer[requester].course_id === this.props.course_gen_id
            // });

            //modified by KG

            let requester_id = Object.keys(this.props.requesterReducer).find(requester => {
                if (this.props.requesterReducer[requester].course_id !== null && this.props.requesterReducer[requester].course_id === row._row.data.course) {
                    return this.props.requesterReducer[requester].id
                }
            })

            console.log("requester id is ", requester_id)
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

            <div>
                <h3>Add Canvas Video</h3>
                <PreparedJobsContainer requester_ids={this.props.requester_ids}/>
            </div>

        )
    }

}


function mapStateToProps({globalsReducer, coursesReducer, requesterReducer}, {course_gen_id, selected_rows}) {

    console.log("ROWS", selected_rows)
    console.log("GEN ID", course_gen_id)

    let semester = globalsReducer.currentSemester
    let requester_ids = []


    selected_rows.forEach(row => {
        console.log(row._row.data.course)
        requester_ids.push(
            Object.keys(requesterReducer).find(requester => {
                if (requesterReducer[requester].course_id !== null && requesterReducer[requester].course_id === row._row.data.course) {
                    return requesterReducer[requester].id

                }

            })
        )


    })

    console.log(requester_ids)
    console.log([...new Set(requester_ids)])


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

export default withRouter(connect(mapStateToProps)(AddJobsCanvasContainer))