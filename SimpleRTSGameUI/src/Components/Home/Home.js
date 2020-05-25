import React from 'react';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions';
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
      selected: {}
    }
  }
  renderPreview() {
    if (this.state.selected.preview) {
      return (
        <div>
          <h3>{this.state.selected.name}</h3>
          <img src={'http://' + this.state.selected.preview} style={{ width: "100%"}} alt="preview"/>
        </div>
      );
    }

  }
  renderGameList() {
    if (this.props.games.length > 0) {
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
                  <Nav.Link eventKey="create">Create Game</Nav.Link>
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
                  Currently no games available to join
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
                    onClick={() => history.push('/game/' + this.state.selected.id)}>
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
    availableGames: state.games.available
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: () => { dispatch(fetchGames()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
