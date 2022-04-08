import React, {Component} from 'react';
import {withRouter} from "react-router";


class VideosContainer extends Component {

    constructor(props) {
        super(props);

        this.ref = null;

    }


    render() {
        console.log("In video container")
        return (<div>
            <div>
                <div className="masterListItem masterListUser">
                    <div style={{"marginBottom": "10px"}} className={"emp-display-container"}>
                        <div className={"emp-display-title"}>
                            <div style={{"fontWeight": "600", marginTop: "10rem"}}>
                                This is video Container
                            </div>
                        </div>


                    </div>


                </div>
            </div>

        </div>)
    }
}


export default withRouter(VideosContainer)