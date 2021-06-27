import React, { useState } from 'react';
import { Card } from 'antd';
import { ITrackerCharacter } from '../../interfaces';
import AddCharToTracker from './addCharToTracker';
import CharacterListTracker from './CharacterListTracker';

function InitiativeTracker() {
  const [charactersList, setCharactersList] = useState<ITrackerCharacter[]>([]);

  const setCharsListHandler = (character: ITrackerCharacter) => {
    setCharactersList((prevState) => [...prevState, character]);
  };

  return (
    <Card>
      <AddCharToTracker onAdd={setCharsListHandler} charactersList={charactersList} />
      <CharacterListTracker charactersList={charactersList} />
    </Card>
  );
}

export default InitiativeTracker;
