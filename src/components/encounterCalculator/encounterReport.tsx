import { useEffect, useState } from 'react';
import { Card, Divider, Space, Typography, Tooltip, type GetProp } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { EncounterReport as IEncounterReport, IIndexable } from '../../interfaces';
import { commaNumber } from '../../tools/snippets';
const { Text } = Typography;
type BaseType = GetProp<typeof Text, 'type'>;
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
  treasure: 'Loot',
  slow: 'Slow',
  medium: 'Medium',
  fast: 'Fast'
};
const SUBLEVELS_LABELS: IIndexable = {
  '0.125': '1/8',
  '0.167': '1/6',
  '0.250': '1/4',
  '0.333': '1/3',
  '0.500': '1/2'
};

function EncounterInfoBox<T extends { info: object; suffix?: string }>(props: T) {
  const { info, suffix = '' } = props;

  return (
    <Space orientation="vertical">
      {Object.entries(info).map(([key, value]) => (
        <Text key={key}>
          {ENCOUNTER_LABELS_MAP[key]}:{' '}
          <Text strong>
            {value < 1 ? SUBLEVELS_LABELS[value.toFixed(3)] : commaNumber(value)}
            {suffix}
          </Text>
        </Text>
      ))}
    </Space>
  );
}

function EncounterReport(props: IEncounterReport) {
  const { party, encounter, xp, treasure } = props;
  const [xpCostIndicator, setXpCostIndicator] = useState<BaseType>('success');

  useEffect(() => {
    const setBudgetLabel = () => {
      let budgetLabel: BaseType = 'success';
      switch (true) {
        case xp.xpCost > xp.xpBudget:
          budgetLabel = 'danger';
          break;
        case xp.xpCost < xp.xpBudget * 0.95:
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
      <Divider titlePlacement="start">Party</Divider>
      <EncounterInfoBox info={party} />
      <Divider titlePlacement="start">Encounter</Divider>
      <EncounterInfoBox info={encounter} />
      <Divider titlePlacement="start">XP</Divider>
      <Space orientation="vertical">
        <Text>
          <Tooltip title="Individual XP awards listed for a group of the appropriate party size">
            <InfoCircleOutlined />
          </Tooltip>{' '}
          {ENCOUNTER_LABELS_MAP['xpIndividual']}: <Text strong>{commaNumber(xp.xpIndividual)}</Text>
        </Text>
        <Text strong>
          <Tooltip title="Total XP divided by the number of characters">
            <InfoCircleOutlined />
          </Tooltip>{' '}
          {ENCOUNTER_LABELS_MAP['xpIndividualExact']}: <Text>{commaNumber(xp.xpIndividualExact)}</Text>
        </Text>
        <Text>
          Used{' '}
          <Text type={xpCostIndicator} strong>
            {commaNumber(xp.xpCost)}
          </Text>{' '}
          of <Text strong>{commaNumber(xp.xpBudget)}</Text> xp for this encounter.
        </Text>
      </Space>
      <Divider titlePlacement="start">Treasure</Divider>
      <EncounterInfoBox info={treasure} suffix="gp" />
    </Card>
  );
}

export default EncounterReport;
