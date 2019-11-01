import React from 'react';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { playerActions } from '../_actions';
import { Player } from '../_components/players/Player';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(playerActions.getAllPlayers(this.props.user._id));
  }

  addPlayer = (player) => {
    this.props.dispatch(playerActions.createPlayer(player));
  };

  updatePlayer = (player) => {
    this.props.dispatch(playerActions.updatePlayer(this.props.user._id, player));
  };

  deletePlayer = (id) => {
    this.props.dispatch(playerActions.deletePlayer(this.props.user._id, id));
  };

  logOut = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  render() {
    const { user, players } = this.props;
    return (
      <div className='container'>
        <div className='buttonContainer'>
          <button onClick={() => this.logOut()} className='button'>
            Logout
          </button>
        </div>
        {user && players && (
          <div>
            {players.players && (
              <Player
                addPlayer={this.addPlayer}
                updatePlayer={this.updatePlayer}
                deletePlayer={this.deletePlayer}
                dispatch={this.props.dispatch}
                user={user}
                players={players.players}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { players, authentication } = state;
  const { user } = authentication;
  return {
    user,
    players,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
