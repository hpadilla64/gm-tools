import { useEffect, useMemo, useState } from 'react';
import { Select, List, Button } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { IItemAbility } from '../../interfaces';

function ItemAbilityList<
  T extends {
    abilitiesList: IItemAbility[];
    selectedAbilitiesList: IItemAbility[];
    availableSlots: number;
    onChange: (list: IItemAbility[]) => void;
  }
>(props: T) {
  const { abilitiesList, availableSlots, onChange, selectedAbilitiesList } = props;
  const [itemAbility, setItemAbility] = useState(-1);

  const addAbilityToItem = () => {
    if (!selectedAbilitiesList.some((ability) => ability.name === abilitiesList[itemAbility].name)) {
      const updatedList = [...selectedAbilitiesList, abilitiesList[itemAbility]];
      onChange(updatedList);
    }
  };

  const removeItemAbility = (ability: IItemAbility) => {
    const updatedList = selectedAbilitiesList.filter((abilityInList) => abilityInList.name !== ability.name);
    onChange(updatedList);
  };

  useEffect(() => {
    if (itemAbility !== -1 || selectedAbilitiesList.length > 0) {
      resetValues();
    }
  }, [abilitiesList]);

  const resetValues = () => {
    setItemAbility(-1);
    onChange([]);
  };

  const abilityOptions = useMemo(() => {
    const groups: { label: string; options: { value: number; label: string; disabled: boolean }[] }[] = [];
    abilitiesList.forEach((ability, index) => {
      const { bonus, name } = ability;
      if (!groups[bonus]) {
        groups[bonus] = { label: bonus === 0 ? 'Extra abilities' : `+${bonus} abilities`, options: [] };
      }
      groups[bonus].options.push({ value: index, label: name, disabled: availableSlots < bonus });
    });
    return [{ value: -1, label: 'No ability' }, ...groups.filter(Boolean)];
  }, [abilitiesList, availableSlots]);

  return (
    <>
      <Select
        value={itemAbility}
        placeholder="Select an ability"
        onChange={(value) => setItemAbility(value)}
        optionFilterProp="label"
        options={abilityOptions}
        style={{
          width: '80%',
          marginRight: '.5em'
        }}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={addAbilityToItem}
        disabled={itemAbility < 0}
      />
      <List
        dataSource={selectedAbilitiesList}
        locale={{
          emptyText: 'No abilities assigned'
        }}
        header={
          <span style={{ fontStyle: 'italic', fontSize: '.85em' }}>
            <b>{availableSlots}</b> available ability bonus slots
          </span>
        }
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteFilled />}
                onClick={() => removeItemAbility(item)}
              />
            ]}
          >
            {item.name} (+{item.bonus})
          </List.Item>
        )}
      />
    </>
  );
}

export default ItemAbilityList;
