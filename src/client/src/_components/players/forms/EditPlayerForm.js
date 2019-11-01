import React, { useState, useEffect } from 'react';

const EditPlayerForm = (props) => {
  const [player, setPlayer] = useState(props.currentPlayer);

  useEffect(() => {
    setPlayer(props.currentPlayer);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlayer({
      ...player,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updatePlayer(player);
      }}
    >
      <label>Name</label>
      <input
        type='text'
        name='name'
        value={player.name}
        onChange={handleInputChange}
      />
      <label>Age</label>
      <input
        type='number'
        name='age'
        value={player.age}
        onChange={handleInputChange}
      />
      <label>Position</label>
      <input
        type='text'
        name='position'
        value={player.position}
        onChange={handleInputChange}
        minLength={8}
      />
      <button>Update player</button>
      <button
        onClick={() => props.setEditing(false)}
        className='button muted-button'
      >
        Cancel
      </button>
    </form>
  );
};

export default EditPlayerForm;
