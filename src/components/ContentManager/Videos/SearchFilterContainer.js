import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import Input from "@material-ui/core/Input";
import {fetchDataFromSourceUrl, fetchDataFromTitle} from "../../../actions/ampApi/fetchData";
import {Button} from "@material-ui/core";
import "../../../css/searchFilter.css"
import SearchFilterResultContainer from "./SearchFilterResultContainer";

class SearchFilterContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            type: "title",

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
        let searchTerm = this.state.search;

        if (this.state.type === "source_url") {
            if (isValidHttpUrl(searchTerm)) {

                this.props.dispatch(fetchDataFromSourceUrl(this.state.search))

            } else {
                //This is not a search term
                console.log("Not a valid URL")
                alert("Please enter a valid URL")
            }
        } else {

            this.props.dispatch(fetchDataFromTitle(this.state.search))
        }


    }


    render() {

        return (
            <div>
                <div style={{padding: "1rem"}}>
                    <div style={{width: "100%"}}>
                        <form style={{width: "50%"}}>
                            <div style={{display: "flex"}}>
                                <label>Search Type:</label>
                                <Select
                                    style={{marginLeft: "1rem", marginTop: "-0.5rem"}}
                                    name="type"
                                    onChange={this.handleInputChange}
                                    value={this.state.type}
                                >
                                    <MenuItem value={'title'}>Title</MenuItem>
                                    <MenuItem value={"source_url"}>Video URL</MenuItem>
                                </Select>

                            </div>


                            <label style={{display: "flex", marginTop: "1rem"}}>Search Term:
                                <Input
                                    style={{marginLeft: "1rem", marginTop: "-0.5rem", width: "70%"}}
                                    name="search"
                                    type='text'
                                    required={true}
                                    size="50"
                                    value={this.state.search}
                                    onChange={this.handleInputChange}
                                />

                            </label>


                        </form>

                        <div className={"button-submit"}>
                            <Button size="medium" variant="contained"
                                    onClick={this.handleSubmit}>Submit</Button>
                        </div>


                    </div>

                </div>


                {


                    Object.keys(this.props.searchFilterReducer).map(key => (


                            <SearchFilterResultContainer key={key} media_id={key}
                                                         reducer={this.props.searchFilterReducer}/>
                        )
                    )
                }


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

    return {
        searchFilterReducer
    }
}

export default withRouter(connect(mapStateToProps)(SearchFilterContainer))