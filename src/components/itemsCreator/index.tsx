import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Divider, Select, Radio } from 'antd';
import ItemAbilityList from './itemAbilityList';
import { IItemAbility } from '../../interfaces';
const { Option } = Select;

const MAX_ITEM_SLOTS: number = 10;

function ItemsCreator() {
  const [itemType, setItemType] = useState(0);
  const [itemBonus, setItemBonus] = useState(1);
  const [itemAbilities, setItemAbilities] = useState<IItemAbility[]>([]);
  const [availableItemSlots, setAvailableItemSlots] = useState(MAX_ITEM_SLOTS - 1);
  const [maxBonusAvailable, setMaxBonusAvailable] = useState(5);

  useEffect(() => {
    const toCalculateItemSlots = () => {
      const abilitiesSlots = itemAbilities.reduce((accumulate, current) => accumulate + current.bonus, 0);
      const maxBonus = MAX_ITEM_SLOTS - abilitiesSlots;
      const availableItemSlots = MAX_ITEM_SLOTS - abilitiesSlots - itemBonus;
      if (itemBonus > maxBonus) {
        setItemBonus(maxBonus);
      }
      setMaxBonusAvailable(maxBonus);
      setAvailableItemSlots(availableItemSlots);
    };
    toCalculateItemSlots();
  }, [itemBonus, itemAbilities]);

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
            <Radio value={1} disabled={maxBonusAvailable < 1}>
              +1
            </Radio>
            <Radio value={2} disabled={maxBonusAvailable < 2}>
              +2
            </Radio>
            <Radio value={3} disabled={maxBonusAvailable < 3}>
              +3
            </Radio>
            <Radio value={4} disabled={maxBonusAvailable < 4}>
              +4
            </Radio>
            <Radio value={5} disabled={maxBonusAvailable < 5}>
              +5
            </Radio>
          </Radio.Group>
          <Divider orientation="left">Item abilities</Divider>
          <ItemAbilityList
            itemType={itemType}
            availableSlots={availableItemSlots}
            onChange={(abilitiesList: IItemAbility[]) => setItemAbilities(abilitiesList)}
          />
          available item slots: {availableItemSlots}
        </Card>
      </Col>
      <Col span={12}>report</Col>
    </Row>
  );
}

export default ItemsCreator;
