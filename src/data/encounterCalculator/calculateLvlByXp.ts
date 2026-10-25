import { EncounterCRCalc } from '../../interfaces';
import { LVL_1_XP, SUBLEVELS_MAX_DIVIDER } from '../../tools/maps';
import { calculateXPByCR } from './calculateXpByCR';

/**
 * Gets the level for the given xp
 * @param {Number} targetXp xp equivalent for the level
 * @returns {Object} Object with encounter CR and XP
 */
export function calculateLvlByXp(targetXp: number): EncounterCRCalc {
  let currentXP = 0;
  let currentCR = 0;
  let subLvlSteps = SUBLEVELS_MAX_DIVIDER;

  while (true) {
    currentXP = calculateXPByCR(currentCR);
    if (currentXP >= targetXp) break;
    if (targetXp < LVL_1_XP) {
      currentCR = 1 / subLvlSteps;
      subLvlSteps--;
    } else {
      currentCR++;
    }
  }

  return {
    encounterCR: currentCR,
    encounterXp: currentXP
  };
}
