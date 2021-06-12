import { EncounterCharacterGroup, EncounterCRCalc } from '../../interfaces';
import { SUBLEVELS_MAX_DIVIDER } from '../../tools/maps';
import { calculateLvlByXp } from './calculateLvlByXp';
import { calculateXPByCR } from './calculateXpByCR';

/**
 * Calculates the encounter CR
 * @param {Array} enemiesList list of number of enemies and their levels
 * @returns {Object} CR object
 */
export function calculateCR(enemiesList: EncounterCharacterGroup[], handicap?: number): EncounterCRCalc {
  let xpCost = 0;
  let encounterInfo: { encounterCR: number; encounterXp: number } = { encounterCR: 0, encounterXp: 0 };
  enemiesList.forEach(({ numCharacters, level }) => {
    const currentXP = calculateXPByCR(level) * numCharacters;
    xpCost += currentXP;
  });
  const { encounterCR, encounterXp } = calculateLvlByXp(xpCost);
  encounterInfo = { encounterCR, encounterXp };

  let currentEncounterCR = encounterCR;
  if (handicap) {
    let parsedCR;
    if (currentEncounterCR >= 1) {
      parsedCR = currentEncounterCR + handicap;
      parsedCR = parsedCR < 1 ? 0.5 : parsedCR;
      xpCost = calculateXPByCR(parsedCR);
      encounterInfo = calculateLvlByXp(xpCost);
    } else {
      const minStep = 1 / SUBLEVELS_MAX_DIVIDER;
      const rawStep = 1 / currentEncounterCR;
      let step = 1 / currentEncounterCR + handicap * -1;
      switch (rawStep) {
        case 8:
          step = step === 7 ? 6 : 8;
          break;
        case 6:
          step = step !== 6 ? (step === 7 ? 8 : 4) : 6;
          break;
        case 4:
          step = step !== 4 ? (step === 5 ? 6 : 3) : 4;
          break;
      }
      step = 1 / step;
      step = step < minStep ? minStep : step;
      xpCost = calculateXPByCR(step);
      encounterInfo = calculateLvlByXp(xpCost);
    }
  }

  return {
    ...encounterInfo,
    xpCost
  };
}
