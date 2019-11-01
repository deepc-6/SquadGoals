import config from '../config/config';
import { authHeader } from '../_helpers';

export const playerService = {
  login,
  logout,
  getAllPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };
  return fetch(`${config.apiUrl}/manager/login`, requestOptions)
    .then(handleResponse)
    .then((_user) => {
      const user = _user.user;
      user.token = _user.token;
      // store manager details and jwt token in local storage to keep manager logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove manager from local storage to log manager out
  localStorage.removeItem('user');
}

function getAllPlayers(managerId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${config.apiUrl}/players/${managerId}`, requestOptions).then(
    handleResponse,
  );
}

function createPlayer(player) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(player),
  };
  return fetch(`${config.apiUrl}/players`, requestOptions).then(handleResponse);
}

function updatePlayer(managerId, updatedPlayer) {
  const id = updatedPlayer._id;
  delete updatedPlayer._id;
  if (!updatedPlayer.password) {
    delete updatedPlayer.password;
  }
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify(updatedPlayer),
  };
  return fetch(
    `${config.apiUrl}/players/${managerId}/${id}`,
    requestOptions,
  ).then(handleResponse);
}

function deletePlayer(managerId, id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };
  return fetch(`${config.apiUrl}/players/${managerId}/${id}`, requestOptions).then(
    handleResponse,
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
