import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Space, Divider, Select, Radio } from 'antd';
import WeaponsData from '../../data/weapons/weaponsAbilities.json';
const { Option } = Select;

function ItemsCreator() {
  const [itemType, setItemType] = useState(0);
  const [itemBonus, setItemBonus] = useState(0);
  const [itemAbility, setItemAbility] = useState(0);
  const [totalBonus, setTotalBonus] = useState(0);
  const [abilitiesList, setAbilitiesList] = useState([]);

  useEffect(() => {
    const toSetTotalBonus = () => {
      const total = 1 + itemBonus;
      setTotalBonus(total);
    };
    toSetTotalBonus();
  }, [itemBonus, itemAbility]);

  useEffect(() => {
    const toSetAbilitiesList = () => {
      let list;
      switch (itemType) {
        case 0:
          list = WeaponsData.filter((ability) => ability.category.includes('melee'));
          break;
        case 1:
          list = WeaponsData.filter((ability) => ability.category.includes('ranged'));
          break;
        case 2:
          list = WeaponsData.filter((ability) => ability.category.includes('ammo'));
          break;
        // no default
      }
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
          <Select>
            {abilitiesList.map(({ name }, index) => (
              <Option key={index} value={index}>
                {name}
              </Option>
            ))}
          </Select>
          total bonus: {totalBonus}
        </Card>
      </Col>
      <Col span={12}>report</Col>
    </Row>
  );
}

export default ItemsCreator;
