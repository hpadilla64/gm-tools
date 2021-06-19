import React, { useEffect, useState } from 'react';
import { Select, List, Button } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { IItemAbility } from '../../interfaces';
const { Option, OptGroup } = Select;

function ItemAbilityList<
  T extends {
    abilitiesList: IItemAbility[];
    selectedAbilitiesList: IItemAbility[];
    availableSlots: number;
    onChange: (list: IItemAbility[]) => void;
  }
>(props: T) {
  const { abilitiesList, availableSlots, onChange, selectedAbilitiesList } = props;
  const [groupedAbilitiesList, setGroupedAbilitiesList] = useState<JSX.Element[]>([]);
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
    const groupAbilities = () => {
      createSelectOptions();
      if (itemAbility !== -1 || selectedAbilitiesList.length > 0) {
        resetValues();
      }
    };
    groupAbilities();
  }, [abilitiesList]);

  useEffect(() => {
    const groupAbilities = () => {
      createSelectOptions();
    };
    groupAbilities();
  }, [availableSlots]);

  const resetValues = () => {
    setItemAbility(-1);
    onChange([]);
  };

  const createSelectOptions = () => {
    const arrayAbilities: Array<Array<JSX.Element>> = [];
    abilitiesList.forEach((ability, index) => {
      const { bonus, name } = ability;
      const optionElement = (
        <Option key={index} value={index} disabled={availableSlots < bonus}>
          {name}
        </Option>
      );
      if (!arrayAbilities[bonus]) {
        arrayAbilities[bonus] = [];
      }
      arrayAbilities[bonus].push(optionElement);
    });
    const groupedAbilities: JSX.Element[] = arrayAbilities.map((group, index) => (
      <OptGroup key={index} label={index === 0 ? 'Extra abilities' : `+${index} abilities`}>
        {group}
      </OptGroup>
    ));
    setGroupedAbilitiesList(groupedAbilities);
  };

  return (
    <>
      <Select
        value={itemAbility}
        placeholder="Select an ability"
        onChange={(value) => setItemAbility(value)}
        optionFilterProp="name"
        style={{
          width: '80%',
          marginRight: '.5em'
        }}
      >
        <Option value={-1}>No ability</Option>
        {groupedAbilitiesList}
      </Select>
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
