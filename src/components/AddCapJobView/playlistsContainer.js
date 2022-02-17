import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import '../../css/addJobContainer.css'
import {getVideoList} from "../../actions/ampApi/fetchData";
import PlayListViewContainer from "./playlistViewContainer";
import {emptyVideoList} from "../../actions/videoLists";


class ListItemsMasterContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            transaction_id:'',
            listURL: '',
            is_auto_caption: false
        };


        this.getVideoList = this.getVideoList.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }



    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;



        this.setState({
            [name]: value
        });
    }



    getVideoList(event) {
        event.preventDefault();
        this.props.dispatch(emptyVideoList())
        this.props.dispatch(getVideoList(this.state.listURL, 'get-yt-playlist'))
        this.setState({
            listURL: ''
        })

    }


    render() {


        return (

            <div className="listItemsMasterContainer">
                <p>listItemsContainer</p>
                <form onSubmit={this.getVideoList}>
                    <label>
                        Name:
                        <input type="text" name="listURL" value={this.state.listURL} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <label>
                    Auto Caption
                    <input name="is_auto_caption"
                           type="checkbox"
                           value={this.state.is_auto_caption}
                           onChange={this.handleInputChange}
                    />
                </label>
                <PlayListViewContainer requesterId={this.props.requesterId}
                                       auto_caption={this.state.is_auto_caption}
                                       transaction_id={this.props.transaction_id}/>
            </div>

        )
    }

}




function mapStateToProps({videoListsReducer, errorsReducer, tempJobsFormReducer, loadingStatusReducer}, {requesterId, transaction_id, is_locked}) {



    return {

        requesterId,
        transaction_id,
        is_locked
    }
}


export default withRouter(connect(mapStateToProps)(ListItemsMasterContainer))