import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Space, Divider, Select, Radio } from 'antd';
import WeaponsData from '../../data/weapons/weaponsAbilities.json';
import { GenericProps, ItemAbility } from '../../interfaces';
const { Option, OptGroup } = Select;

function ItemsCreator() {
  const [itemType, setItemType] = useState(0);
  const [itemBonus, setItemBonus] = useState(0);
  const [itemAbility, setItemAbility] = useState(-1);
  const [totalBonus, setTotalBonus] = useState(0);
  const [abilitiesList, setAbilitiesList] = useState([]);

  const ITEM_TYPE_MAP = ['melee', 'ranged', 'ammo'];

  useEffect(() => {
    const toSetTotalBonus = () => {
      const total = 1 + itemBonus;
      setTotalBonus(total);
    };
    toSetTotalBonus();
  }, [itemBonus, itemAbility]);

  useEffect(() => {
    const toSetAbilitiesList = () => {
      const groupsArray: Array<Array<any>> = [];
      WeaponsData.forEach((ability, index) => {
        const { category, name } = ability;
        const isInCategory = category.includes(ITEM_TYPE_MAP[itemType]);
        if (isInCategory) {
          groupsArray[ability.bonus - 1]
            ? groupsArray[ability.bonus - 1].push(
                <Option key={index} value={index}>
                  {name}
                </Option>
              )
            : (groupsArray[ability.bonus - 1] = [
                <Option key={index} value={index}>
                  {name}
                </Option>
              ]);
        }
      });
      const list: any[] = groupsArray.map((group, index) => (
        <OptGroup key={index} label={`+${index + 1} abilities`}>
          {group}
        </OptGroup>
      ));
      setAbilitiesList(list);
    };
    toSetAbilitiesList();
  }, [itemType]);

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Divider orientation="left">Item type</Divider>
          <Select value={itemType} onChange={(value) => setItemType(value)}>
            <Option value={0}>Melee Weapon</Option>
            <Option value={1}>Ranged Weapon</Option>
            <Option value={2}>Ammo</Option>
          </Select>
          <Divider orientation="left">Item Bonus</Divider>
          <Radio.Group onChange={({ target: { value } }) => setItemBonus(value)} value={itemBonus}>
            <Radio value={0}>+1</Radio>
            <Radio value={1}>+2</Radio>
            <Radio value={2}>+3</Radio>
            <Radio value={3}>+4</Radio>
            <Radio value={4}>+5</Radio>
          </Radio.Group>
          <Divider orientation="left">Item abilities</Divider>
          <Select
            value={itemAbility}
            placeholder="Select an ability"
            onChange={(value) => setItemAbility(value)}
            optionFilterProp="name"
            style={{
              width: '100%'
            }}
          >
            {abilitiesList}
          </Select>
          total bonus: {totalBonus}
        </Card>
      </Col>
      <Col span={12}>report</Col>
    </Row>
  );
}

export default ItemsCreator;
