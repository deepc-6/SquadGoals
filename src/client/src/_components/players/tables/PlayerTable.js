import React from 'react';

export const PlayerTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Position</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.players && props.players.length > 0 ? (
        props.players.map((player) => (
          <tr key={player._id}>
            <td>{player.name}</td>
            <td>{player.age}</td>
            <td>{player.position}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(player);
                }}
                className='button muted-button'
              >
                Edit
              </button>
              <button
                onClick={() => props.deletePlayer(player._id)}
                className='button muted-button'
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No players</td>
        </tr>
      )}
    </tbody>
  </table>
);
