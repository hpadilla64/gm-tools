import { EncounterCharacterGroup } from '../';

export interface EncounterCharacterProps {
  characters: number;
  level: number;
  areEnemies?: boolean;
  maxLevel?: number;
  maxCharacters?: number;
  onChange?: (object: EncounterCharacterGroup) => void;
}
