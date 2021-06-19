import React from 'react';
import { Card, Typography, Tooltip, Space } from 'antd';
import { ITEM_TYPE_NAME_MAP } from '../../tools/maps';
import { commaNumber } from '../../tools/snippets';
import { IItemAbility } from '../../interfaces';

function ItemReport<
  T extends { itemPrice: number; itemType: number; itemBonus: number; selectedAbilities: IItemAbility[] }
>(props: T) {
  const { itemPrice, itemType, itemBonus, selectedAbilities } = props;
  return (
    <Card>
      <Space direction="vertical">
        <span>
          Item type: <b>{ITEM_TYPE_NAME_MAP[itemType]}</b>
        </span>
        <span>
          Attack bonus: <b>+{itemBonus}</b>
        </span>
        <span>
          Damage bonus: <b>+{itemBonus}</b>
        </span>
        <span>
          Cost: <b>+{commaNumber(itemPrice)}gp</b>
        </span>
        {selectedAbilities.length > 0 ? (
          <>
            <div>
              Enhancements:{' '}
              {selectedAbilities.map((ability) => (
                <Tooltip
                  placement="top"
                  title={ability.notes.length > 0 ? ability.notes.join(' ') : 'No special notes'}
                  key={ability.name}
                >
                  <Typography.Link>{ability.name}</Typography.Link>,{' '}
                </Tooltip>
              ))}
            </div>
            {itemType === 2 ? (
              <Typography.Text style={{ display: 'block', fontStyle: 'italic', fontSize: '.85em' }}>
                This price is for 50 arrows, bolts, bullets, or firearm ammunition.
              </Typography.Text>
            ) : null}
          </>
        ) : null}
      </Space>
    </Card>
  );
}

export default ItemReport;
