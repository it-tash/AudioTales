
import React from 'react';
import '../Player.css';

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeMusicIndex: this.props.tale.id,
            leftTime: 0,
            play: this.props.autoplay || false,
            playMode: 'loop',
            progress: 0,
            volume: 0.5,
        };
        this.modeList = ['loop', 'random', 'repeat'];
    }

    componentDidMount() {
        const audioContainer = this.audioContainer;
        audioContainer.addEventListener('timeupdate', this.updateProgress.bind(this));
        audioContainer.addEventListener('ended', this.end.bind(this));
    }

    componentWillUnmount() {
        const audioContainer = this.audioContainer;
        audioContainer.removeEventListener('timeupdate', this.updateProgress.bind(this));
        audioContainer.removeEventListener('ended', this.end.bind(this));
    }

    updateProgress() {
        const duration = this.audioContainer.duration;
        const currentTime = this.audioContainer.currentTime;
        const progress = currentTime / duration;
        this.setState({
            progress: progress,
            leftTime: duration - currentTime
        })
    }

    end() {
        const { playMode, activeMusicIndex } = this.state;
        if (playMode === 'repeat') {
            this.audioContainer.play()
        } else if (playMode === 'loop') {
            this.handleNext()
        } else if (playMode === 'random') {
            let randomIndex = Math.floor(Math.random() * this.props.playlist.length);
            while (randomIndex === activeMusicIndex) {
                randomIndex = Math.floor(Math.random() * this.props.playlist.length)
            }
            this._playMusic(randomIndex)
        } else {
            this.setState({ play: false })
        }
    }

    handleAdjustProgress(e) {
        const progressContainer = this.progressContainer;
        const progress = (e.clientX - progressContainer.getBoundingClientRect().left) / progressContainer.clientWidth;
        const currentTime = this.audioContainer.duration * progress;
        this.audioContainer.currentTime = currentTime;
        this.setState({
            play: true,
            progress: progress
        }, () => {
            this.audioContainer.play()
        })
    }

    handleAdjustVolume(e) {
        const volumeContainer = this.volumeContainer;
        let volume = (e.clientX - volumeContainer.getBoundingClientRect().left) / volumeContainer.clientWidth;
        volume = volume < 0 ? 0 : volume;
        this.audioContainer.volume = volume;
        this.setState({
            volume: volume
        })
    }

    handleToggle() {
        this.state.play ? this.audioContainer.pause() : this.audioContainer.play();
        this.setState({ play: !this.state.play })
    }

    handlePrev() {
        const total = this.props.playlist.length;
        const activeMusicIndex = this.state.activeMusicIndex > 0 ? this.state.activeMusicIndex - 1 : total - 1;
        this._playMusic(activeMusicIndex)
    }

    handleNext() {
        const total = this.props.playlist.length;
        const activeMusicIndex = this.state.activeMusicIndex < total - 1 ? this.state.activeMusicIndex + 1 : 0;
        this._playMusic(activeMusicIndex)
    }

    handleChangePlayMode() {
        let index = this.modeList.indexOf(this.state.playMode);
        index = (index + 1) % this.modeList.length;
        this.setState({ playMode: this.modeList[index] })
    }

    _playMusic(index) {
        this.setState({
            activeMusicIndex: index,
            leftTime: 0,
            play: true,
            progress: 0,
        }, () => {
            this.audioContainer.play();
        })
    }

    _formatTime(time) {
        if (isNaN(time) || time === 0) {
            return
        }
        const mins = Math.floor(time / 60);
        const secs = (time % 60).toFixed();
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    _processArtistName(artistList) {
        return artistList.join(' / ')
    }
    handleBack(){
        // window.location.reload();

        // this.audioContainer.pause();
        // this.audioContainer.currentTime = 0.0;
        // const audioContainer = this.audioContainer;
        // audioContainer.removeEventListener('timeupdate', this.updateProgress.bind(this));
        // audioContainer.removeEventListener('ended', this.end.bind(this));
        // this.setState({play: false});
        // this.props.onBack();
    }


    render() {
        const playlist = this.props.playlist;
        const { activeMusicIndex, playMode } = this.state;
        const activeMusic = playlist[activeMusicIndex];
        const playModeClass = playMode === 'loop' ? 'refresh' : playMode === 'random' ? 'random' : 'repeat';


        return (
            <div className="player-container" >
                <audio
                    autoPlay={this.state.play}
                    preload="auto"
                    ref={(ref) => { this.audioContainer = ref }}
                    src={activeMusic.url}
                />
                <div className="info-and-control">
                    <div className="music-info">
                        <h2 className="title">{activeMusic.title}</h2>
                        <h3 className="artist">{this._processArtistName(activeMusic.artist)}</h3>
                    </div>
                    <div className="time-and-volume">
                        <div className="left-time">-{this._formatTime(this.state.leftTime)}</div>
                        <div className="volume-container">
                            <div className="volume-icon">
                                <i className="volumicon icon fa fa-volume-up"></i>
                            </div>
                            <div className="volume-wrapper">
                                <div
                                    className="progress-container"
                                    onClick={this.handleAdjustVolume.bind(this)}
                                    ref={(ref) => { this.volumeContainer = ref }}
                                >
                                    <div className="progress" style={{width: `${this.state.volume * 100}%`}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="progress-container"
                        onClick={this.handleAdjustProgress.bind(this)}
                        ref={(ref) => { this.progressContainer = ref }}
                    >
                        <div className="progress" style={{width: `${this.state.progress * 100}%`, background: this.props.color}}></div>
                    </div>
                    <div className="control-container">
                        <div className="mode-control">
                            <i className={`marg-auto orange icon fa fa-${playModeClass}`}  onClick={this.handleChangePlayMode.bind(this)}></i>
                        </div>
                        <div className="controls">
                            <i className="marg-auto orange icon fa fa-step-backward"  onClick={this.handlePrev.bind(this)}></i>
                            <i className={`big marg-auto icon fa fa-${this.state.play ? 'pause-circle-o ' : 'play-circle-o'}`} onClick={this.handleToggle.bind(this)}></i>
                            <i className="marg-auto orange icon fa fa-step-forward" onClick={this.handleNext.bind(this)}></i>
                        </div>
                    </div>
                </div>
                {/*<div className="cover-container">*/}



                    <div className="cover" style={{backgroundImage: `url(${activeMusic.cover})`}}></div>
                {/*</div>*/}


            </div>
        )
      }
}

export default Player
