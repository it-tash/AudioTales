import React from 'react';
import Player from './Player'


class ViewChoice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            player: false,
        };
        this.handlePlay = this.handlePlay.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    handleBack(){
        this.props.onBack();
        this.setState({player:false});
    }
    handlePlay(){
        this.props.onPlayer(this.props.id);
        this.setState({player: true});
    }
    renderList(){
        return(
                <div className="list-line" onClick={this.handlePlay}>
                    <span className="name-list">{this.props.title}</span>
                </div>
        );
    }
    renderPlayer(){
            return (
                <Player playlist={this.props.basa}
                        tale={this.props.tale}
                        // autoplay
                        onBack={this.handleBack}

                />
            );
    }
    render(){
        return this.state.player  ? this.renderPlayer() : this.renderList();
    }
}

export default ViewChoice;