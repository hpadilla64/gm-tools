import { EncounterCharacterGroup } from '../../interfaces';

/**
 * Calculates the APL for a party
 * @param {Array<Object>} characterList List of number of characters and their level
 * @returns {Object} Object with Total Average Party Level
 */
export function calculateAPL(characterList: EncounterCharacterGroup[]) {
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
  totalAPL = totalAPL <= 0 ? 0.5 : totalAPL;

  return {
    totalAPL,
    totalCharacters,
    totalLevels
  };
}
