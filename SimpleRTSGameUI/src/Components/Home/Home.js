import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Simple RTS</h1>
          <p className="lead">Go ahead and find a game to join or start your own game</p>
          <hr className="my-4" />

          <div className="row">
            <div className="col-3">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active" id="join-game-tab" data-toggle="pill" href="#join-game-body" role="tab" aria-controls="join-game-body" aria-selected="true">Join Game</a>
                <a className="nav-link" id="create-game-tab" data-toggle="pill" href="#create-game-body" role="tab" aria-controls="create-game-body" aria-selected="false">Create Game</a>
              </div>
            </div>
            <div className="col-9">
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="join-game-body" role="tabpanel" aria-labelledby="join-game-tab">This is where you can join games that other players have created/started</div>
                <div className="tab-pane fade" id="create-game-body" role="tabpanel" aria-labelledby="create-game-tab">This is where you can start your own game/lobby</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
