import { useMemo, useState } from 'react';
import { Select } from 'antd';
import { EncounterCharacterProps } from '../../interfaces';

const SUB_LEVEL_OPTIONS = [
  { value: '.125', label: '1/8' },
  { value: '.16666666666666666666666666666667', label: '1/6' },
  { value: '.25', label: '1/4' },
  { value: '.33333333333333333333333333333333', label: '1/3' },
  { value: '.5', label: '1/2' }
];

function SelectCharsLvl(props: EncounterCharacterProps) {
  const { areEnemies, characters, level, onChange, maxLevel, maxCharacters } = props;
  const [chars, setChars] = useState(characters);
  const [levels, setLevel] = useState(level);

  const listCharacterSelect = useMemo(
    () => Array.from({ length: maxCharacters || 30 }, (_, i) => ({ value: i + 1, label: i + 1 })),
    [maxCharacters]
  );

  const listLvlSelect = useMemo(
    () => [
      ...(areEnemies ? SUB_LEVEL_OPTIONS : []),
      ...Array.from({ length: maxLevel || 30 }, (_, i) => ({ value: i + 1, label: i + 1 }))
    ],
    [areEnemies, maxLevel]
  );

  const setCharsHandler = (value: number) => {
    setChars(value);
    if (onChange) {
      onChange({ numCharacters: value, level: levels });
    }
  };

  const setLevelHandler = (value: number) => {
    setLevel(value);
    if (onChange) {
      onChange({ numCharacters: chars, level: value });
    }
  };

  return (
    <div className="ecCharacterRow">
      <div>
        <span className="label"># of {areEnemies ? 'Enemies' : 'Characters'}</span>
        <Select value={characters} onSelect={setCharsHandler} options={listCharacterSelect} />
      </div>
      <div>
        <span className="label">{areEnemies ? 'CR' : 'Lvl'}</span>
        <Select value={level} onSelect={setLevelHandler} options={listLvlSelect} />
      </div>
    </div>
  );
}

export default SelectCharsLvl;
