import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Divider, Select, Radio } from 'antd';
import ItemAbilityList from './itemAbilityList';
import WeaponsData from '../../data/weapons/weaponsAbilities.json';
import { ITEM_TYPE_MAP } from '../../tools/maps';
import { IItemAbility } from '../../interfaces';
const { Option } = Select;

const MAX_ITEM_SLOTS: number = 10;

function ItemsCreator() {
  const [itemType, setItemType] = useState(0);
  const [itemBonus, setItemBonus] = useState(1);
  const [abilitiesBonus, setAbilitiesBonus] = useState(0);
  const [availableItemSlots, setAvailableItemSlots] = useState(MAX_ITEM_SLOTS);
  const [abilitiesList, setAbilitiesList] = useState<IItemAbility[]>([]);
  const [selectedAbilities, setSelectedAbilities] = useState<IItemAbility[]>([]);
  const [maxBonusAvailable, setMaxBonusAvailable] = useState(MAX_ITEM_SLOTS / 2);

  /* useEffect(() => {
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
 */
  useEffect(() => {
    const setAvailableSlots = () => {
      setAvailableItemSlots(MAX_ITEM_SLOTS - (itemBonus + abilitiesBonus));
      setMaxBonusAvailable(MAX_ITEM_SLOTS - abilitiesBonus);
    };
    setAvailableSlots();
  }, [itemBonus, abilitiesBonus]);

  const handlerAbilitiesBonus = (selectedAbilitiesList: IItemAbility[]) => {
    let updatedAbilitiesBonus = 0;
    selectedAbilitiesList.forEach((ability) => {
      updatedAbilitiesBonus += ability.bonus;
    });
    setAbilitiesBonus(updatedAbilitiesBonus);
    setSelectedAbilities(selectedAbilitiesList);
  };

  useEffect(() => {
    const getAbilitiesListByType = () => {
      const abilitiesList: IItemAbility[] = [];
      WeaponsData.forEach((ability) => {
        const { category } = ability;
        if (category.includes(ITEM_TYPE_MAP[itemType])) {
          abilitiesList.push(ability);
        }
      });
      setAbilitiesList(abilitiesList);
    };
    getAbilitiesListByType();
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
            abilitiesList={abilitiesList}
            selectedAbilitiesList={selectedAbilities}
            availableSlots={availableItemSlots}
            onChange={handlerAbilitiesBonus}
          />
        </Card>
      </Col>
      <Col span={12}>
        report
        <div>
          itemType: {itemType}
          <br />
          itemBonus: {itemBonus}
          <br />
          available item slots: {availableItemSlots}
          <br />
          {/* JSON.stringify(abilitiesList) */}
        </div>
        {JSON.stringify(selectedAbilities)}
      </Col>
    </Row>
  );
}

export default ItemsCreator;
