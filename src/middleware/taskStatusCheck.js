import store from "../reducers/store_creator";
import {addStatusUpdate} from "../actions/asyncStatus";
import fetch from "cross-fetch";
import {clearTaskId} from "../actions/asyncTaskIds";
import {endpoint} from '../constants'

const server_url = endpoint();

class AsyncJobChecker {

    constructor() {
        this.is_cycling = false
        this.interval = 0
    }

    addInitialStatus(json){
        store.dispatch(addStatusUpdate(json))

        if (this.is_cycling === false){
            this.cycleCheck()
        }
    }

    cycleCheck(){

        this.intervalCycle = () => {this.interval = setInterval(() => {
            if (store.getState().asyncTaskIdReducer.length === 0) {
                clearInterval(this.interval)
                this.is_cycling = false
            }

            let data_object = store.getState().asyncTaskIdReducer;

            let task_id_list = data_object.map(object => {
                return object.task_id
            },[])

            console.log("ZOOsdfdsfsdfdsfsfPRS", task_id_list)
            let post_object = {
                method: 'POST',
                body: JSON.stringify({"task_id": task_id_list}),
                headers: {
                    'Content-Type': 'application/json'
                }};

            // Yay! Can invoke sync or async actions with `dispatch`
            fetch(`${server_url}/services/task-status`, post_object)
                .then(internal_response => internal_response.json())
                .then(json => store.dispatch(addStatusUpdate(json)))

            this.checkStatuses()
        }, 5000);}


        if (this.is_cycling === false){
            this.is_cycling = true
            this.intervalCycle()
        }
    }

    checkStatuses() {
        let statuses = store.getState().asyncStatusReducer
        let active_tasks = store.getState().asyncTaskIdReducer

        if (Object.keys(statuses).length > 0) {
            Object.keys(statuses).forEach(status => {
                if (statuses[status].status === "SUCCESS") {
                    store.dispatch(clearTaskId(store.dispatch , statuses[status].task_id, active_tasks))

                }

                if (statuses[status].status === "FAILURE") {
                    store.dispatch(clearTaskId(store.dispatch ,statuses[status].task_id, active_tasks))
                    alert(statuses[status].message)
                }

            })
        } else {
            this.is_cycling = false
            clearInterval(this.interval)
        }


    }



}

export default AsyncJobChecker