import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { EncounterCharacterProps } from '../../interfaces';
const { Option } = Select;

function SelectCharsLvl(props: EncounterCharacterProps) {
  const { areEnemies, characters, level, onChange, maxLevel, maxCharacters } = props;
  const [listCharacterSelect, setListCharacterSelect] = useState<JSX.Element[]>([]);
  const [listLvlSelect, setListLvlSelect] = useState<JSX.Element[]>([]);
  const [chars, setChars] = useState(characters);
  const [levels, setLevel] = useState(level);

  useEffect(() => {
    const setLists = () => {
      const subOptions = [
        <Option value=".125" key={`lvl_${0.125}`}>
          1/8
        </Option>,
        <Option value=".16666666666666666666666666666667" key={`lvl_${0.166}`}>
          1/6
        </Option>,
        <Option value=".25" key={`lvl_${0.25}`}>
          1/4
        </Option>,
        <Option value=".33333333333333333333333333333333" key={`lvl_${0.33}`}>
          1/3
        </Option>,
        <Option value=".5" key={`lvl_${0.5}`}>
          1/2
        </Option>
      ];
      const totalCharacterSelect = maxCharacters || 30;
      const totalLvlSelect = maxLevel || 30;
      const charArr = [];
      const lvlArr = areEnemies ? [...subOptions] : [];

      for (let i = 1; i <= totalCharacterSelect; i++) {
        charArr.push(
          <Option value={i} key={`char_${i}`}>
            {i}
          </Option>
        );
      }

      for (let i = 1; i <= totalLvlSelect; i++) {
        lvlArr.push(
          <Option value={i} key={`lvl_${i}`}>
            {i}
          </Option>
        );
      }
      setListCharacterSelect(charArr);
      setListLvlSelect(lvlArr);
    };
    setLists();
  }, []);

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
        <Select value={characters} onSelect={setCharsHandler}>
          {listCharacterSelect}
        </Select>
      </div>
      <div>
        <span className="label">{areEnemies ? 'CR' : 'Lvl'}</span>
        <Select value={level} onSelect={setLevelHandler}>
          {listLvlSelect}
        </Select>
      </div>
    </div>
  );
}

export default SelectCharsLvl;
