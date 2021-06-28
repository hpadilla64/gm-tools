import React, { BaseSyntheticEvent, useState } from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ITrackerCharacter } from '../../interfaces';
import { isEmptyString } from '../../tools/snippets';

interface AddCharProps {
  charactersList: ITrackerCharacter[];
  onAdd: (character: ITrackerCharacter) => void;
  style?: React.CSSProperties;
}

function AddCharToTracker({ onAdd, charactersList, style }: AddCharProps) {
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
        setNewCharName('');
      }
    }
  };

  return (
    <div style={{ ...style }}>
      <Input
        style={{
          width: 'calc(100% - 4em)',
          marginRight: '.5em'
        }}
        value={newCharName}
        onChange={setNameHandler}
        onPressEnter={clickHandler}
        placeholder="Add a character name"
      />
      <Button onClick={clickHandler} type="primary" shape="circle" icon={<PlusOutlined />} disabled={false} />
    </div>
  );
}

export default AddCharToTracker;
