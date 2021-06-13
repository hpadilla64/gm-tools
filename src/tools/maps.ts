import { IIndexable } from '../interfaces';

export const CR_VALUES: IIndexable = {
  EASY: -1,
  AVERAGE: 0,
  CHALLENGING: 1,
  HARD: 2,
  EPIC: 3
};
export const LVL_1_XP: number = 400;
export const SUBLEVELS_MAX_DIVIDER: number = 8;
export const SUBLEVELS_TREASURE_INDEX: IIndexable = {
  '0.125': 0,
  '0.167': 1,
  '0.250': 2,
  '0.333': 3,
  '0.500': 4
};
export const ITEM_TYPE_MAP = ['melee', 'ranged', 'ammo'];
