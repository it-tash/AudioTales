import React, { Component } from 'react';
import './App.css';

import basa from './api/basa';
import ViewChoice from './components/ViewChoice';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basa: basa,
            player: false
        };


        this.handlePlayer = this.handlePlayer.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    handleBack(){
        window.location.reload();
    }

    handlePlayer(id){
        const basa = this.state.basa.filter(tale => tale.id === id);
        this.setState({basa, player:true});
    }

  render() {
    return (
      <div className="boxApp">
          {this.state.player ?
              <header className="header-player">
             <button className="box-back-icon" onClick={this.handleBack.bind(this)}>
                <i className="icon-back fa fa-long-arrow-left"></i>
            </button>
              <div className="centreHead">
                  <h1 className="App-title">Сказки</h1>
              </div>
              </header>
            :
              <header className="App-header">

                  <div className="app-cover" style={{backgroundImage: 'url(./img/head3.png)'}}> </div>
              </header>}

          {this.state.player ?

              <section className="tales-list">
                  {this.state.basa.map(tale =>
                      <ViewChoice
                          key={tale.id}
                          id={tale.id}
                          title={tale.title}
                          tale={tale}
                          basa={basa}
                          onBack={this.handleBack}
                          onPlayer={this.handlePlayer}
                      />)
                  }
              </section>
              :
              <section className="tales-list-svitok" >
                  {this.state.basa.map(tale =>
                      <ViewChoice
                          key={tale.id}
                          id={tale.id}
                          title={tale.title}
                          tale={tale}
                          basa={basa}
                          onBack={this.handleBack}
                          onPlayer={this.handlePlayer}
                      />)
                  }
              </section>
          }
      </div>
    );
  }
}

export default App;
