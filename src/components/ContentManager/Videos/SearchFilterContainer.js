import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {fetchDataFromSourceUrl} from "../../../actions/ampApi/fetchData";
import SearchFilterTabulator from "./SearchFilterTabulator";

class SearchFilterContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }


    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state.search)
        //first we check if search term is url or not

        let searchTerm = this.state.search;
        if (isValidHttpUrl(searchTerm)) {
            this.props.dispatch(fetchDataFromSourceUrl(this.state.search))
        } else {
            //This is not a search term
            console.log("Not a search term")
        }


    }

    render() {

        return (
            <div>
                <div style={{padding: "1rem"}}>
                    <form>
                        {/*Todo: Get this in one line*/}
                        <label>
                            <div>Search Video Url or Title</div>
                            <div style={{marginTop: "5px"}}></div>
                            <input className={"emp-input"} value={this.state.search} type={'text'}
                                   name={"search"} onChange={this.handleInputChange}/>
                            <Button name="add_single" size="small" variant="contained" onClick={this.handleSubmit}
                            >Search</Button>
                        </label>
                    </form>

                    <SearchFilterTabulator/>
                </div>


            </div>

        )

    }


}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}


function mapStateToProps({searchFilterReducer}, {props}) {

    //TODO: Set data here now, in tabulator maybe? Check it out

    return {}
}

export default withRouter(connect(mapStateToProps)(SearchFilterContainer))