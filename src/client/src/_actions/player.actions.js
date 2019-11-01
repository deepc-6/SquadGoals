import { playerConstants } from '../_constants';
import { playerService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const playerActions = {
  login,
  logout,
  getAllPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));
    playerService.login(email, password).then(
      (user) => {
        dispatch(success(user));
        history.push('/');
      },
      (error) => {
        if (error && error.message) {
          error = error.message;
        }
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request(user) {
    return { type: playerConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: playerConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: playerConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  playerService.logout();
  return { type: playerConstants.LOGOUT };
}

function getAllPlayers(managerId) {
  return (dispatch) => {
    dispatch(request());
    playerService
      .getAllPlayers(managerId)
      .then(
        (players) => dispatch(success(players)),
        (error) => dispatch(failure(error)),
      );
  };

  function request() {
    return { type: playerConstants.GETALL_REQUEST };
  }
  function success(players) {
    return { type: playerConstants.GETALL_SUCCESS, players };
  }
  function failure(error) {
    return { type: playerConstants.GETALL_FAILURE, error };
  }
}

function createPlayer(player) {
  return (dispatch) => {
    dispatch(request(player));
    playerService.createPlayer(player).then(
      () => {
        dispatch(success());
        dispatch(getAllPlayers(player.managerId));
      },
      (error) => {
        if (error && error.message) {
          error = error.message;
        }
        dispatch(failure(error));
        dispatch(alertActions.error(error));
        dispatch(getAllPlayers(player.managerId));
      },
    );
  };
  function request(player) {
    return { type: playerConstants.CREATEONE_REQUEST, player };
  }
  function success() {
    return { type: playerConstants.CREATEONE_SUCCESS };
  }
  function failure(error) {
    return { type: playerConstants.CREATEONE_FAILURE, error };
  }
}

function updatePlayer(managerId, updatedPlayer) {
  return (dispatch) => {
    dispatch(request(updatedPlayer));
    playerService.updatePlayer(managerId, updatedPlayer).then(
      (player) => {
        dispatch(success(player));
        dispatch(getAllPlayers(managerId));
      },
      (error) => {
        if (error && error.message) {
          error = error.message;
        }
        dispatch(failure(error));
        dispatch(alertActions.error(error));
        dispatch(getAllPlayers(managerId));
      },
    );
  };
  function request(player) {
    return { type: playerConstants.UPDATE_REQUEST, player };
  }
  function success(player) {
    return { type: playerConstants.UPDATE_SUCCESS, player };
  }
  function failure(error) {
    return { type: playerConstants.UPDATE_FAILURE, error };
  }
}

function deletePlayer(managerId, id) {
  return (dispatch) => {
    dispatch(request(id));
    playerService.deletePlayer(managerId, id).then(
      () => {
        dispatch(success());
        dispatch(getAllPlayers(managerId));
      },
      (error) => {
        if (error && error.message) {
          error = error.message;
        }
        dispatch(failure(error));
        dispatch(alertActions.error(error));
        dispatch(getAllPlayers(managerId));
      },
    );
  };
  function request(id) {
    return { type: playerConstants.DELETE_REQUEST, id };
  }
  function success() {
    return { type: playerConstants.DELETE_SUCCESS };
  }
  function failure(error) {
    return { type: playerConstants.DELETE_FAILURE, error };
  }
}
