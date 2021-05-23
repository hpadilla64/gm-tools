/**
 *
 */
import { EncounterCharacterGroup, IIndexable, EncounterCRCalc } from '../interfaces';
import TABLE_TREASURE_VALUE from './treasureValueEncounter.json';

const CR_VALUES: IIndexable = {
  EASY: -1,
  AVERAGE: 0,
  CHALLENGING: 1,
  HARD: 2,
  EPIC: 3
};
const LVL_1_XP: number = 400;

/**
 * Calculates the APL for a party
 * @param {Array<Object>} characterList List of number of characters and their level
 * @returns {Object} Object with Total Average Party Level
 */
function calculateAPL(characterList: EncounterCharacterGroup[]) {
  let totalAPL = 0,
    totalCharacters = 0,
    totalLevels = 0;

  characterList.forEach(({ numCharacters, level }) => {
    totalCharacters += numCharacters;
    totalLevels += level * numCharacters;
  });

  totalAPL = Math.round(totalLevels / totalCharacters);

  switch (true) {
    case totalCharacters > 5:
      totalAPL++;
      break;
    case totalCharacters < 4:
      totalAPL--;
      break;
    // no default
  }
  totalAPL = totalAPL < 1 ? 1 : totalAPL;
  return {
    totalAPL,
    totalCharacters,
    totalLevels
  };
}

/**
 * Calculates the xp for a CR 1 or above
 * @param {Number} cr target CR
 * @returns {Number} total XP for the given cr
 */
function calculateXPByCR(cr: number): number {
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

/**
 * Gets the level for the given xp
 * @param {Number} targetXp xp equivalent for the level
 * @returns {Object} Object with encounter CR and XP
 */
function calculateLvlByXp(targetXp: number): EncounterCRCalc {
  let currentXP = 0;
  let currentCR = 0;
  while (true) {
    currentXP = calculateXPByCR(currentCR);
    if (currentXP >= targetXp) break;
    currentCR++;
  }

  return {
    encounterCR: currentCR,
    encounterXp: currentXP
  };
}

/**
 * Calculates the encounter CR
 * @param {Array} enemiesList list of number of enemies and their levels
 * @returns {Object} CR object
 */
function calculateCR(enemiesList: EncounterCharacterGroup[]): EncounterCRCalc {
  let xpCost = 0;
  enemiesList.forEach(({ numCharacters, level }) => {
    const currentXP = calculateXPByCR(level) * numCharacters;
    xpCost += currentXP;
  });
  const { encounterCR, encounterXp } = calculateLvlByXp(xpCost);
  return {
    encounterCR,
    encounterXp,
    xpCost
  };
}

/**
 * Calculates an encounter
 *
 * @param {Array<Object>} characterList List of number of characters and their level
 * @param {Array<Object>} enemiesList List of number of enemies and their level
 * @param {String} difficulty Encounter´s difficulty. By default average
 * @param {Boolean} isFavorableTerrain Flag to indicate if a terrain is favorable or not.
 * @returns {Object} Encounter object
 */
export function calculateEncounter(
  characterList: EncounterCharacterGroup[],
  enemiesList: EncounterCharacterGroup[],
  difficulty: string,
  isFavorableTerrain: boolean | undefined
) {
  let encounterCalc;
  const parseDifficulty = difficulty.toUpperCase();
  if (characterList.length > 0) {
    const { totalAPL, totalCharacters } = calculateAPL(characterList);

    let targetCR = totalAPL + CR_VALUES[parseDifficulty];
    if (isFavorableTerrain === true) targetCR--;
    if (isFavorableTerrain === false) targetCR++;
    targetCR = targetCR < 1 ? 0.5 : targetCR;

    const xpBudget = calculateXPByCR(targetCR);
    const {
      encounterCR = 0,
      encounterXp = 0,
      xpCost = 0
    } = enemiesList && enemiesList.length > 0 ? calculateCR(enemiesList) : {};

    let xpIndividual = 0;
    let xpIndividualExact = 0;
    switch (true) {
      case totalCharacters <= 3:
        xpIndividual = xpCost ? Math.ceil(xpCost / 3 / 5) * 5 : 0;
        xpIndividualExact = xpCost ? Math.ceil(xpCost / totalCharacters / 5) * 5 : 0;
        break;
      case totalCharacters >= 6:
        xpIndividual = xpCost ? Math.ceil(xpCost / 6 / 5) * 5 : 0;
        xpIndividualExact = xpCost ? Math.ceil(xpCost / totalCharacters / 5) * 5 : 0;
        break;
      default:
        xpIndividual = xpCost ? xpCost / 4 : 0;
        xpIndividualExact = xpCost ? xpCost / totalCharacters : 0;
    }

    const treasure = {
      slow: TABLE_TREASURE_VALUE.slow[encounterCR],
      medium: TABLE_TREASURE_VALUE.medium[encounterCR],
      fast: TABLE_TREASURE_VALUE.fast[encounterCR]
    };

    encounterCalc = {
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
    };
  }
  return encounterCalc;
}
