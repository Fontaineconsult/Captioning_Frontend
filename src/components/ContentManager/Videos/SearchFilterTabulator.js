import React, {Component} from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css';
import {withRouter} from "react-router";
import {connect} from "react-redux";


class SearchFilterTabulator extends Component {
    constructor(props) {
        super(props);

        this.el = React.createRef();
        this.tabulator = null;
        this.ref = null;
    }


    componentDidMount() {
        //initial state here maybe

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        //after updating show here

    }


    render() {
        return (
            <div>


            </div>
        )


    }
}


function mapStateToProps({searchFilterReducer}, {props}) {

    let data = []
    let columns = []

    let formatData = () => {

        return {

            //TODO

            title: "Testing",
            url: "https://www.google.com",

        }
    }

    if (searchFilterReducer.content !== undefined) {

        Object.keys(searchFilterReducer.content).forEach(function (key) {
            //TODO: format this according to real data
            //data.push(formatData(searchFilterReducer.content[key]))
        });

    }

    data.push(formatData());


    return {
        data,
        columns
    }
}

export default withRouter(connect(mapStateToProps)(SearchFilterTabulator))