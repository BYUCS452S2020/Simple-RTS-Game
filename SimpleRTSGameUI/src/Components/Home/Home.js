import React from 'react';
import { connect } from 'react-redux';
import { fetchAvailableGames, fetchGames, getMyGame, createGame, joinGame, getUser } from '../../actions';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import history from '../../history';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      gameToJoin: {},
      retries: 0
    }
    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.checkGame = this.checkGame.bind(this);
    this.retryPolicy = null;
  }

  componentDidMount() {
    this.props.fetchAvailableGames();
    this.props.fetchGames();
    this.props.getMyGame();
    this.props.getUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.myGame) {
      console.log("YOU HAVE A GAME!");
      clearInterval(this.retryPolicy);
      history.push('/game/' + this.props.myGame.id)
    }
  }

  checkGame() {
    if (this.state.retries < 10) {
      this.props.getMyGame();
      this.setState({ retries: this.state.retries++ })
    }
  }

  createGame() {
    this.props.createGame(this.state.selected);
    this.retryPolicy = setInterval(this.checkGame, 1000);
  }

  joinGame() {
    this.props.joinGame(this.state.gameToJoin.eci);
    this.retryPolicy = setInterval(this.checkGame, 1000);
  }

  renderAvailableGames() {
    const games = this.props.availableGames;
    if (games && games !== {}) {
      let tbody = [];
      for (const name in games) {
        tbody.push(
          <tr key={name} onClick={() => this.setState({ gameToJoin: games[name] })}>
            <td>
              {games[name].id}
            </td>
            <td>
              {name}
            </td>
            <td>
              {games[name].maxPlayers}
            </td>
          </tr>
        );
      }
      return tbody;
    }
    else {
      return <td></td>
    }
  }

  renderPreview() {
    if (this.state.selected.preview) {
      return (
        <div>
          <h3>{this.state.selected.name}</h3>
          <img src={this.state.selected.preview} style={{ width: "100%"}} alt="preview"/>
        </div>
      );
    }
    else if (this.state.gameToJoin.id) {
      return (
        <div>
          <h3>Map {this.state.gameToJoin.id}</h3>
          <img
            src={window.location.origin + "/maps/level" + this.state.gameToJoin.id + ".png"}
            style={{ width: "100%"}} alt="preview"
          />
        </div>
      );
    }

  }
  renderGameList() {
    if (this.props.games && this.props.games.length > 0) {
      return this.props.games.map((game, i) => {
        return (
          <tr key={i} onClick={() => this.setState({ selected: game })}>
            <td>{game.name}</td>
            <td>{game.description}</td>
            <td>{game.maxPlayers}</td>
          </tr>
        );
      })
    }
    else return <div></div>
  }
  render() {
    return (
      <Jumbotron className="p-5" fluid>
        <h1>Simple RTS</h1>
        <p className="lead">Go ahead and find a game to join or start your own game</p>
        <hr className="my-4" />

        <Tab.Container defaultActiveKey="join">
          <Row>
            <Col xs={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="join" onSelect={() => this.setState({ selected: {} })}>Join Game</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="create" onSelect={() => this.setState({ gameToJoin: {} })}>Create Game</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <hr />
                  {this.renderPreview()}
                </Nav.Item>
              </Nav>
            </Col>
            <Col xs={9}>
              <Tab.Content>
                <Tab.Pane eventKey="join">
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>Map ID</th>
                        <th>Name</th>
                        <th>Max Players</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderAvailableGames()}
                    </tbody>
                  </Table>
                  <Button
                    variant="success"
                    disabled={!this.state.gameToJoin}
                    onClick={this.joinGame}>
                    Join Game
                  </Button>
                </Tab.Pane>
                <Tab.Pane eventKey="create">
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th># of Players</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderGameList()}
                    </tbody>
                  </Table>
                  <Button
                    variant="success"
                    disabled={!this.state.selected.id}
                    onClick={this.createGame}>
                    Create Game
                  </Button>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games.list,
    availableGames: state.games.available,
    myGame: state.games.current
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAvailableGames: () => { dispatch(fetchAvailableGames()) },
    fetchGames: () => { dispatch(fetchGames()) },
    getMyGame: () => { dispatch(getMyGame()) },
    joinGame: (eci) => { dispatch(joinGame(eci)) },
    createGame: (game) => { dispatch(createGame(game)) },
    getUser: () => { dispatch(getUser()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
