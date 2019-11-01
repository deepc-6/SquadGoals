import React, { useState } from 'react';

import { PlayerTable } from './tables/PlayerTable';
import { AddPlayerForm } from './forms/AddPlayerForm';
import EditPlayerForm from './forms/EditPlayerForm';

export const Player = (props) => {
  const { user, players } = props;

  const initialFormState = {
    name: '',
    age: '',
    position: '',
    managerId: user._id,
  };

  const [editing, setEditing] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(initialFormState);

  const updatePlayer = (updatedPlayer) => {
    setEditing(false);
    props.updatePlayer(updatedPlayer);
  };

  const editRow = (player) => {
    setEditing(true);
    setCurrentPlayer({
      _id: player._id,
      name: player.name,
      age: player.age,
      position: player.position,
    });
  };

  const deletePlayer = (id) => {
    setEditing(false);
    props.deletePlayer(id);
  };

  return (
    <div className='container'>
      <h1 className='center greyBackground'>
        You are logged in as {user.name}
      </h1>
      <div className='flex-row'>
        <div className='flex-large'>
          {editing ? (
            <div>
              <h2>Edit player</h2>
              <EditPlayerForm
                editing={editing}
                setEditing={setEditing}
                currentPlayer={currentPlayer}
                updatePlayer={updatePlayer}
              />
            </div>
          ) : (
            <div>
              <h2 className='center'>Add player</h2>
              <AddPlayerForm managerId={user._id} addPlayer={props.addPlayer} />
            </div>
          )}
        </div>
        <div className='flex-large'>
          <h2 className='center'>View players</h2>
          <PlayerTable players={players} editRow={editRow} deletePlayer={deletePlayer} />
        </div>
      </div>
    </div>
  );
};
