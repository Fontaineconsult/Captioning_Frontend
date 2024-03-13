import store from "../reducers/store_creator";
import { addStatusUpdate } from "../actions/asyncStatus";
import fetch from "cross-fetch";
import { clearTaskId } from "../actions/asyncTaskIds";
import { endpoint } from '../constants';

const server_url = endpoint();

class AsyncJobChecker {
    constructor() {
        this.is_cycling = false;
        this.interval = 0;
        this.isSubmitted = false; // New state variable for tracking submission status
    }

    addInitialStatus(json){
        store.dispatch(addStatusUpdate(json));
        this.isSubmitted = true; // Update the submission status upon initial status update
        if (this.is_cycling === false){
            this.cycleCheck();
        }
    }

    cycleCheck(){
        this.intervalCycle = () => {
            this.interval = setInterval(() => {
                if (store.getState().asyncTaskIdReducer.length === 0) {
                    clearInterval(this.interval);
                    this.is_cycling = false;
                }

                let data_object = store.getState().asyncTaskIdReducer;
                let task_id_list = data_object.map(object => object.task_id);

                let post_object = {
                    method: 'POST',
                    body: JSON.stringify({ "task_id": task_id_list }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                fetch(`${server_url}/services/task-status`, post_object)
                    .then(internal_response => internal_response.json())
                    .then(json => store.dispatch(addStatusUpdate(json)));

                this.checkStatuses();
            }, 5000);
        };

        if (this.is_cycling === false){
            this.is_cycling = true;
            this.intervalCycle();
        }
    }

    checkStatuses() {
        let statuses = store.getState().asyncStatusReducer;
        let active_tasks = store.getState().asyncTaskIdReducer;

        if (Object.keys(statuses).length > 0) {
            Object.keys(statuses).forEach(status => {
                if (statuses[status].status === "SUCCESS") {
                    store.dispatch(clearTaskId(store.dispatch , statuses[status].task_id, active_tasks));
                }

                if (statuses[status].status === "FAILURE") {
                    store.dispatch(clearTaskId(store.dispatch ,statuses[status].task_id, active_tasks));
                    alert(statuses[status].message);
                }
            });
        } else {
            this.is_cycling = false;
            clearInterval(this.interval);
        }
    }

    // Method to render the job container
    renderJobContainer() {
        // Add a CSS class to grey out the job container if it has been submitted
        const containerClassName = this.isSubmitted ? "greyed-out" : "";

        // Return JSX for the job container
        return (
            <div className={`job-container ${containerClassName}`}>
                {/* Job container contents */}
            </div>
        );
    }
}

export default AsyncJobChecker;
