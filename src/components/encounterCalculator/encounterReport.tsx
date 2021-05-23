import React, { useEffect, useState } from 'react';
import { Card, Divider, Space, Typography, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { GenericProps, IIndexable } from '../../interfaces';
import { BaseType } from 'antd/lib/typography/Base';
import { commaNumber } from '../../app/tools/snippets';
const { Text } = Typography;
const ENCOUNTER_LABELS_MAP: IIndexable = {
  totalAPL: 'Average Party Level',
  totalCharacters: 'Total # of characters',
  targetCR: 'Recommended Encounter CR',
  xpBudget: 'XP Budget',
  xpIndividual: 'Abstract XP',
  xpIndividualExact: 'Exact XP',
  encounterCR: 'Current Encounter CR',
  encounterXp: 'Current Encounter XP',
  xpCost: 'XP Cost',
  treasure: 'Loot'
};

function EncounterInfoBox(props: GenericProps) {
  const { info } = props;

  return (
    <Space direction="vertical">
      {Object.entries(info).map(([key, value]: [string, number]) => (
        <Text key={key}>
          {ENCOUNTER_LABELS_MAP[key]}: <Text strong>{value < 1 ? '1/2' : value}</Text>
        </Text>
      ))}
    </Space>
  );
}

function EncounterReport(props: GenericProps) {
  const { party, encounter, xp, treasure } = props;
  const [xpCostIndicator, setXpCostIndicator] = useState<BaseType>('success');

  useEffect(() => {
    const setBudgetLabel = () => {
      let budgetLabel: BaseType = 'success';
      switch (true) {
        case xp.xpCost > xp.xpBudget:
          budgetLabel = 'danger';
          break;
        case xp.xpCost < xp.xpBudget * 0.75:
          budgetLabel = 'warning';
          break;
        // no default
      }
      setXpCostIndicator(budgetLabel);
    };
    setBudgetLabel();
  }, [xp]);

  return (
    <Card title="Encounter Information">
      <Divider orientation="left">Party</Divider>
      <EncounterInfoBox info={party} />
      <Divider orientation="left">Encounter</Divider>
      <EncounterInfoBox info={encounter} />
      <Divider orientation="left">XP</Divider>
      <Space direction="vertical">
        <Text>
          <Tooltip title="Individual XP awards listed for a group of the appropriate party size">
            <InfoCircleOutlined />
          </Tooltip>{' '}
          {ENCOUNTER_LABELS_MAP['xpIndividual']}: <Text strong>{xp.xpIndividual}</Text>
        </Text>
        <Text strong>
          <Tooltip title="Total XP divided by the number of characters">
            <InfoCircleOutlined />
          </Tooltip>{' '}
          {ENCOUNTER_LABELS_MAP['xpIndividualExact']}: <Text>{xp.xpIndividualExact}</Text>
        </Text>
        <Text>
          Used{' '}
          <Text type={xpCostIndicator} strong>
            {commaNumber(xp.xpCost)}
          </Text>{' '}
          of <Text strong>{commaNumber(xp.xpBudget)}</Text> xp for this encounter.
        </Text>
      </Space>
    </Card>
  );
}

export default EncounterReport;
