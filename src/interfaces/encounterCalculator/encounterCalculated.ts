export interface EncounterTreasure {
  slow: number;
  medium: number;
  fast: number;
}

export interface EncounterCalculated {
  totalAPL: number;
  totalCharacters: number;
  targetCR: number;
  xpBudget: number;
  xpIndividual: number;
  xpIndividualExact: number;
  encounterCR: number;
  encounterXp: number;
  xpCost: number;
  treasure: EncounterTreasure;
}
