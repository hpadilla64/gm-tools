import { useState } from 'react';
import { Card } from 'antd';
import { ITrackerCharacter } from '../../interfaces';
import AddCharToTracker from './addCharToTracker';
import CharacterListTracker from './CharacterListTracker';

function InitiativeTracker() {
  const [charactersList, setCharactersList] = useState<ITrackerCharacter[]>([]);

  const setCharsListHandler = (character: ITrackerCharacter) => {
    setCharactersList((prevState) => [...prevState, character]);
  };

  const arrangeListHandler = (arrangedList: ITrackerCharacter[]) => {
    setCharactersList([...arrangedList]);
  };

  return (
    <Card>
      <AddCharToTracker
        onAdd={setCharsListHandler}
        charactersList={charactersList}
        style={{
          marginBottom: '1em'
        }}
      />
      <CharacterListTracker charactersList={charactersList} onArrange={arrangeListHandler} />
    </Card>
  );
}

export default InitiativeTracker;
