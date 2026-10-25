/**
 *
 */
import { EncounterCharacterGroup, EncounterCalculated } from '../../interfaces';
import { CR_VALUES, SUBLEVELS_TREASURE_INDEX } from '../../tools/maps';
import TABLE_TREASURE_VALUE from '../treasureValueEncounter.json';
import { calculateAPL } from './calculateAPL';
import { calculateCR } from './calculateCR';
import { calculateXPByCR } from './calculateXpByCR';

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
  isFavorableTerrain?: boolean | null
): EncounterCalculated {
  const parseDifficulty = difficulty.toUpperCase();
  const { totalAPL, totalCharacters } = calculateAPL(characterList);

  let targetCR = totalAPL + CR_VALUES[parseDifficulty];
  targetCR = targetCR < 1 ? 0.5 : targetCR;

  let handicapCR;
  if (isFavorableTerrain === true) handicapCR = -1;
  if (isFavorableTerrain === false) handicapCR = 1;

  const xpBudget = calculateXPByCR(targetCR);
  const {
    encounterCR = 0,
    encounterXp = 0,
    xpCost = 0
  } = enemiesList?.length > 0 ? calculateCR(enemiesList, handicapCR) : {};

  let xpIndividual = 0;
  let xpIndividualExact = xpCost ? Math.ceil(xpCost / totalCharacters) : 0;
  switch (true) {
    case totalCharacters < 4:
      xpIndividual = xpCost ? Math.ceil(xpCost / 3 / 5) * 5 : 0;
      break;
    case totalCharacters > 5:
      xpIndividual = xpCost ? Math.ceil(xpCost / 6 / 5) * 5 : 0;
      break;
    default:
      xpIndividual = xpCost ? Math.ceil(xpCost / 4 / 5) * 5 : 0;
  }

  const treasureList = encounterCR < 1 ? TABLE_TREASURE_VALUE.subcr : TABLE_TREASURE_VALUE;
  const treasureIndex = encounterCR < 1 ? SUBLEVELS_TREASURE_INDEX[encounterCR.toFixed(3)] : encounterCR - 1;
  const treasure = {
    slow: treasureList.slow[treasureIndex],
    medium: treasureList.medium[treasureIndex],
    fast: treasureList.fast[treasureIndex]
  };

  const encounterCalc: EncounterCalculated = {
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
  return encounterCalc;
}
