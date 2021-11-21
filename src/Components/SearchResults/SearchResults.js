import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} handlePlusClick={this.props.handlePlusClick} isRemoval={false}/>
            </div>
        );
    }
}

export default SearchResults;
