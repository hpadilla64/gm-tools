import React, { useEffect, useState } from 'react';
import { Button, List, Select, Row, Col, Card, Typography, Space } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { EncounterCharacterGroup, EncounterReport as IEncounterReport } from '../../interfaces';
import { calculateEncounter } from '../../data/encounterCalculator/encounterCalculator';
const { Option } = Select;
const { Text } = Typography;

// UI
import SelectCharsLvl from './selectCharsLvls';
import EncounterReport from './encounterReport';

const baseEncounterReport = {
  party: {
    totalAPL: 0,
    totalCharacters: 0
  },
  encounter: {
    targetCR: 0,
    encounterCR: 0
  },
  xp: {
    xpIndividual: 0,
    xpIndividualExact: 0,
    xpBudget: 0,
    xpCost: 0
  },
  treasure: {
    slow: 0,
    medium: 0,
    fast: 0
  }
};

// Interfaces
interface IListItem {
  numCharacters: number;
  level: number;
  id: number;
  maxLevel: number;
  areEnemies?: boolean;
  showActions?: boolean;
  maxCharacters: number;
  onDeleteItem: (id: number, areEnemies: boolean) => void;
  onChange: (encounterGroup: EncounterCharacterGroup, id: number, areEnemies: boolean) => void;
}

function ListItem(props: IListItem) {
  const {
    numCharacters,
    level,
    areEnemies = false,
    id,
    onDeleteItem,
    onChange,
    showActions,
    maxLevel,
    maxCharacters
  } = props;

  const removeItem = () => onDeleteItem(id, areEnemies);
  const updateItem = (encounterGroup: EncounterCharacterGroup) => onChange(encounterGroup, id, areEnemies);

  return (
    <List.Item
      actions={
        showActions
          ? [<Button type="primary" danger shape="circle" icon={<DeleteFilled />} onClick={removeItem} />]
          : undefined
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

function EncounterCalculator() {
  const baseEncounterGroup: EncounterCharacterGroup = { numCharacters: 1, level: 1 };
  const [enemiesItems, setEnemiesItems] = useState<EncounterCharacterGroup[]>([baseEncounterGroup]);
  const [charactersItems, setCharactersItems] = useState<EncounterCharacterGroup[]>([baseEncounterGroup]);
  const [terrainValue, setTerrainValue] = useState('null');
  const [encounterDifficulty, setEncounterDifficulty] = useState('average');
  const [encounterInfo, setEncounterInfo] = useState<IEncounterReport>(baseEncounterReport);
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
      ? enemiesItems.filter((_item, index) => index !== elementId)
      : charactersItems.filter((_item, index) => index !== elementId);
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
      let parseTerrain = null;
      switch (terrainValue) {
        case 'true':
          parseTerrain = true;
          break;
        case 'false':
          parseTerrain = false;
          break;
        // no default
      }
      const {
        totalAPL,
        totalCharacters,
        targetCR,
        xpBudget,
        xpIndividual,
        xpIndividualExact,
        encounterCR,
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
    <Row gutter={16}>
      <Col span={16} xs={24}>
        <Card>
          <Row gutter={16} align="top">
            <Col span={12} xs={24} md={12}>
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
            <Col span={12} xs={24} md={12}>
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
                <Space direction="horizontal" wrap>
                  <Space direction="horizontal">
                    <Text strong>Encounter difficulty:</Text>
                    <Select value={encounterDifficulty} onSelect={(value) => setEncounterDifficulty(value)}>
                      <Option value="easy">Easy</Option>
                      <Option value="average">Average</Option>
                      <Option value="challenging">Challenging</Option>
                      <Option value="hard">Hard</Option>
                      <Option value="epic">Epic</Option>
                    </Select>
                  </Space>
                  <Space direction="horizontal">
                    <Text strong>Terrain advantage:</Text>
                    <Select value={terrainValue} onSelect={(value) => setTerrainValue(value)}>
                      <Option value="null">Neutral</Option>
                      <Option value="true">Favorable for PCs</Option>
                      <Option value="false">Unfavorable for PCs</Option>
                    </Select>
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={8} xs={24}>
        <EncounterReport {...encounterInfo} />
      </Col>
    </Row>
  );
}

export default EncounterCalculator;
