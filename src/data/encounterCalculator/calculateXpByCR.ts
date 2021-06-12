import { LVL_1_XP } from '../../tools/maps';

/**
 * Calculates the xp for a CR 1 or above
 * @param {Number} cr target CR
 * @returns {Number} total XP for the given cr
 */
export function calculateXPByCR(cr: number): number {
  const budgetBase = LVL_1_XP / 2;
  const getOddLvl = 4 / 3;
  const getEvenLvl = 3 / 2;
  let currStep = 0;
  let totalBudget = budgetBase;
  do {
    if (cr < 1) {
      totalBudget = Math.round((LVL_1_XP * cr) / 5) * 5;
    } else {
      totalBudget = currStep % 2 ? totalBudget * getOddLvl : totalBudget * getEvenLvl;
    }
    currStep++;
  } while (currStep <= cr);

  return totalBudget;
}
