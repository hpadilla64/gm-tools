import { EncounterTreasure } from '../';

export interface EncounterReport {
  party: {
    totalAPL: number;
    totalCharacters: number;
  };
  encounter: {
    targetCR: number;
    encounterCR: number;
  };
  xp: {
    xpIndividual: number;
    xpIndividualExact: number;
    xpBudget: number;
    xpCost: number;
  };
  treasure: EncounterTreasure;
}
