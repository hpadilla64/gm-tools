import React, { useEffect, useState } from 'react';
import { Select, List, Button } from 'antd';
const { Option, OptGroup } = Select;
import WeaponsData from '../../data/weapons/weaponsAbilities.json';

function ItemAbilityList(props: {
  itemType: number;
  availableSlots: number;
  onChange?: (list: Array<object>) => void;
}) {
  const { itemType, availableSlots, onChange } = props;
  const [abilitiesList, setAbilitiesList] = useState([]);
  const [itemAbility, setItemAbility] = useState(-1);
  const [itemAbilitiesList, setItemsAbilitiesList] = useState([]);

  const ITEM_TYPE_MAP = ['melee', 'ranged', 'ammo'];

  const addAbilityToItem = () => {
    if (!itemAbilitiesList.includes(WeaponsData[itemAbility])) {
      const updatedList = [...itemAbilitiesList, WeaponsData[itemAbility]];
      setItemAbility(-1);
      setItemsAbilitiesList(updatedList);
      onChange(updatedList);
    }
  };

  useEffect(() => {
    const toSetAbilitiesList = () => {
      abilitiesList.forEach((optionGroup) => {
        console.log(optionGroup.key, availableSlots);
        if (optionGroup.key > availableSlots) {
          const {
            props: { children: optGroupChildren }
          } = optionGroup;
          optGroupChildren.forEach((child: any) => {
            // child.props.disabled = true;
          });
        }
      });
      console.log(abilitiesList);
      setAbilitiesList(abilitiesList);
    };
    toSetAbilitiesList();
  }, [availableSlots]);

  useEffect(() => {
    const toSetupItemType = () => {
      const groupsArray: Array<Array<any>> = [];
      WeaponsData.forEach((ability, index) => {
        const { category, name, bonus } = ability;
        const isInCategory = category.includes(ITEM_TYPE_MAP[itemType]);
        if (isInCategory) {
          const optionComponent = (
            <Option key={index} value={index} disabled={false}>
              {name} {String(availableSlots < bonus)} {availableSlots} {bonus}
            </Option>
          );
          groupsArray[bonus] ? groupsArray[bonus].push(optionComponent) : (groupsArray[bonus] = [optionComponent]);
        }
      });
      const list: any[] = groupsArray.map((group, index) => (
        <OptGroup key={index} label={`+${index} abilities`}>
          {group}
        </OptGroup>
      ));
      setItemsAbilitiesList([]);
      setAbilitiesList(list);
    };
    toSetupItemType();
  }, [itemType]);

  return (
    <>
      <Select
        value={itemAbility}
        placeholder="Select an ability"
        onChange={(value) => setItemAbility(value)}
        optionFilterProp="name"
        style={{
          width: '100%'
        }}
      >
        <Option value={-1}>Without ability</Option>
        {abilitiesList}
      </Select>
      <Button type="primary" disabled={itemAbility < 0} onClick={addAbilityToItem}>
        Add ability
      </Button>
      <List dataSource={itemAbilitiesList} renderItem={(item) => <List.Item>{item.name}</List.Item>} />
    </>
  );
}

export default ItemAbilityList;
