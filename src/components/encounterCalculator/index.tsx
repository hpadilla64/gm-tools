import React, { useEffect, useState } from 'react';
import { Button, List, Select, Row, Col, Card, Typography, Space, Divider } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { GenericProps, EncounterCharacterGroup, IIndexable } from '../../interfaces';
import { calculateEncounter } from '../../data/encounterCalculator';
const { Option } = Select;
const { Text } = Typography;

// UI
import SelectCharsLvl from './selectCharsLvls';
import EncounterReport from './encounterReport';

function ListItem(props: GenericProps) {
  const { numCharacters, level, areEnemies, id, onDeleteItem, onChange, showActions, maxLevel, maxCharacters } = props;

  const removeItem = () => onDeleteItem(id, areEnemies);
  const updateItem = (encounterGroup: EncounterCharacterGroup) => onChange(encounterGroup, id, areEnemies);

  return (
    <List.Item
      actions={
        showActions
          ? [<Button type="primary" danger shape="circle" icon={<DeleteFilled />} onClick={removeItem} />]
          : null
      }
      style={{ alignItems: 'flex-end' }}
    >
      <div style={{ width: '100%' }}>
        <SelectCharsLvl
          characters={numCharacters}
          level={level}
          areEnemies={areEnemies}
          onChange={updateItem}
          maxLevel={maxLevel}
          maxCharacters={maxCharacters}
        />
      </div>
    </List.Item>
  );
}

interface EncounterInfo {
  party: object;
  encounter: object;
  xp: object;
  treasure: object;
}

function EncounterCalculator() {
  const baseEncounterGroup: EncounterCharacterGroup = { numCharacters: 1, level: 1 };
  const [enemiesItems, setEnemiesItems] = useState<EncounterCharacterGroup[]>([baseEncounterGroup]);
  const [charactersItems, setCharactersItems] = useState<EncounterCharacterGroup[]>([baseEncounterGroup]);
  const [terrainValue, setTerrainValue] = useState(null);
  const [encounterDifficulty, setEncounterDifficulty] = useState('average');
  const [encounterInfo, setEncounterInfo] = useState<EncounterInfo>({ party: {}, encounter: {}, xp: {}, treasure: {} });
  // const [maxLevel, setMaxLevel] = useState(30);
  // const [maxCharacters, setMaxCharacters] = useState(100);
  let updateList;

  const addItem = (isEnemy?: boolean) => {
    updateList = isEnemy ? [...enemiesItems] : [...charactersItems];
    updateList.push(baseEncounterGroup);
    return updateStateAndCalculate(updateList, isEnemy);
  };

  const removeItem = (elementId: number, isEnemy: boolean) => {
    updateList = isEnemy
      ? enemiesItems.filter((item, index) => index !== elementId)
      : charactersItems.filter((item, index) => index !== elementId);
    return updateStateAndCalculate(updateList, isEnemy);
  };

  const updateItem = (encounterGroup: EncounterCharacterGroup, id: number, isEnemy: boolean) => {
    updateList = isEnemy ? [...enemiesItems] : [...charactersItems];
    updateList[id] = encounterGroup;
    return updateStateAndCalculate(updateList, isEnemy);
  };

  const updateStateAndCalculate = (updatedArray: EncounterCharacterGroup[], areEnemies?: boolean) => {
    if (areEnemies) {
      return setEnemiesItems(updatedArray);
    }
    return setCharactersItems(updatedArray);
  };

  useEffect(() => {
    const toCalculateEncounter = () => {
      const parseTerrain = terrainValue ? terrainValue === 'true' : terrainValue;
      const {
        totalAPL,
        totalCharacters,
        targetCR,
        xpBudget,
        xpIndividual,
        xpIndividualExact,
        encounterCR,
        encounterXp,
        xpCost,
        treasure
      } = calculateEncounter(charactersItems, enemiesItems, encounterDifficulty, parseTerrain);
      setEncounterInfo({
        party: {
          totalAPL,
          totalCharacters
        },
        encounter: {
          targetCR,
          encounterCR
        },
        xp: {
          xpIndividual,
          xpIndividualExact,
          xpBudget,
          xpCost
        },
        treasure
      });
    };
    toCalculateEncounter();
  }, [enemiesItems, charactersItems, terrainValue, encounterDifficulty]);

  return (
    <>
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <Row gutter={16} align="top">
              <Col span={12}>
                <Card
                  title="Enemies"
                  extra={<Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => addItem(true)} />}
                >
                  <List
                    dataSource={enemiesItems}
                    itemLayout="horizontal"
                    renderItem={(encounterGroup, index) => (
                      <ListItem
                        {...encounterGroup}
                        onChange={updateItem}
                        onDeleteItem={removeItem}
                        areEnemies
                        showActions={enemiesItems.length > 1}
                        id={index}
                        key={index}
                        maxLevel={40}
                        maxCharacters={100}
                      />
                    )}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title="Players"
                  extra={<Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => addItem()} />}
                >
                  <List
                    dataSource={charactersItems}
                    itemLayout="horizontal"
                    renderItem={(encounterGroup, index) => (
                      <ListItem
                        {...encounterGroup}
                        onChange={updateItem}
                        onDeleteItem={removeItem}
                        showActions={charactersItems.length > 1}
                        id={index}
                        key={index}
                        maxLevel={20}
                        maxCharacters={20}
                      />
                    )}
                  />
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <Card title="Encounter modifiers">
                  <Space direction="horizontal">
                    <Text strong>Encounter difficulty:</Text>
                    <Select value={encounterDifficulty} onSelect={(value) => setEncounterDifficulty(value)}>
                      <Option value="easy">Easy</Option>
                      <Option value="average">Average</Option>
                      <Option value="challenging">Challenging</Option>
                      <Option value="hard">Hard</Option>
                      <Option value="epic">Epic</Option>
                    </Select>
                    <Text strong>Terrain advantage:</Text>
                    <Select value={terrainValue} onSelect={(value) => setTerrainValue(value)}>
                      <Option value={null}>Neutral</Option>
                      <Option value="true">Favorable for PCs</Option>
                      <Option value="false">Unfavorable for PCs</Option>
                    </Select>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <EncounterReport {...encounterInfo} />
        </Col>
      </Row>
    </>
  );
}

export default EncounterCalculator;
