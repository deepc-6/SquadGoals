import React, { useState } from 'react';

export const AddPlayerForm = (props) => {
  const initialFormState = {
    name: '',
    age: '',
    position: '',
    managerId: props.managerId,
  };

  const [player, setPlayer] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlayer({ ...player, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.addPlayer(player);
        setPlayer(initialFormState);
      }}
    >
      <label>Name</label>
      <input
        type='text'
        name='name'
        value={player.name}
        onChange={handleInputChange}
        required
      />
      <label>Age</label>
      <input
        type='number'
        name='age'
        value={player.age}
        onChange={handleInputChange}
        required
      />
      <label>Position</label>
      <input
        type='text'
        name='position'
        value={player.position}
        onChange={handleInputChange}
        required
      />
      <button>Add new player</button>
    </form>
  );
};

export default AddPlayerForm;
