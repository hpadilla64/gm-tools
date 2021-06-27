import React, { BaseSyntheticEvent, useState } from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ITrackerCharacter } from '../../interfaces';
import { isEmptyString } from '../../tools/snippets';

interface AddCharProps {
  charactersList: ITrackerCharacter[];
  onAdd: (character: ITrackerCharacter) => void;
}

function AddCharToTracker({ onAdd, charactersList }: AddCharProps) {
  const [newCharName, setNewCharName] = useState('');

  const setNameHandler = (event: BaseSyntheticEvent) => {
    setNewCharName(event.currentTarget.value);
  };

  const clickHandler = () => {
    if (!isEmptyString(newCharName)) {
      const charExists = charactersList.find((char) => char.name === newCharName);
      if (!!!charExists) {
        const tempId = Date.now();
        onAdd({ id: tempId, name: newCharName, initiative: 0 });
      }
    }
  };

  return (
    <div>
      <Input
        style={{
          width: 'calc(100% - 4em)',
          marginRight: '.5em'
        }}
        value={newCharName}
        onChange={setNameHandler}
      />
      <Button onClick={clickHandler} type="primary" shape="circle" icon={<PlusOutlined />} disabled={false} />
    </div>
  );
}

export default AddCharToTracker;
