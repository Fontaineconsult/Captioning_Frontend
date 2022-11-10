import React, {Component} from 'react';
import {withRouter} from "react-router";
import SearchFilterContainer from "./SearchFilterContainer"
import {connect} from "react-redux";
import {clearSourceUrlData} from "../../../actions/searchFilter";

class VideosContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            data: this.props.data
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        this.props.dispatch(clearSourceUrlData())
    }

    render() {
        return (<div>
                <div style={{height: "96vh"}}>
                    <div className={"scroll-inside-div"}>
                        <div className="masterListItem masterListUser">
                            <div style={{"marginBottom": "10px"}} className={"emp-display-container"}>
                                <div className={"emp-display-title"}>
                                    <div style={{"fontWeight": "600"}}>
                                        Search and Title Filter
                                    </div>
                                </div>
                                <SearchFilterContainer/>

                            </div>


                        </div>

                    </div>
                </div>


            </div>
        )
    }
}

function mapStateToProps({searchFilterReducer}, {props}) {

    return {}
}

export default withRouter(connect(mapStateToProps)(VideosContainer))