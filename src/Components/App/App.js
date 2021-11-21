import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [
                {
                    name: "name1",
                    artist: "artist1",
                    album: "album1",
                    id: "id1",
                },
            ],
            playlistName: "electromagnetism",
            playlistTracks: [
                {
                    name: "name2",
                    artist: "artist2",
                    album: "album2",
                    id: "id2",
                },
            ],
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        let tracks = this.state.playlistTracks;
        if (
            tracks.find((savedTrack) => {
                return savedTrack.id === track.id;
            })
        ) {
            return;
        } else {
            tracks.push(track);
            this.setState({
                playlistTracks: tracks,
            });
        }
    }

    removeTrack(track) {
        let tracks = this.state.playlistTracks;
        tracks = tracks.filter((savedTrack) => {
            return savedTrack.id !== track.id;
        });
        this.setState({
            playlistTracks: tracks,
        });
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name,
        });
    }

    savePlaylist() {
        const trackURIs = this.state.playlistTracks.map((track) => {
            return track.uri;
        });
    }

    search(term) {
        Spotify.search(term).then((results) => {
            return this.setState({
                searchResults: results,
            });
        });
    }

    render() {
        return (
            <div>
                <h1>
                    Ja<span className="highlight">mmm</span>ing
                </h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            handlePlusClick={this.addTrack}
                        />
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            handleMinusClick={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Spotify.searchKinda();

export default App;
