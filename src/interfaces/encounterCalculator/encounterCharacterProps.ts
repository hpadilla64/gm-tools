import { EncounterCharacterGroup } from '../';

export default interface EncounterCharacterProps {
  characters: number;
  level: number;
  areEnemies?: boolean;
  maxLevel?: number;
  maxCharacters?: number;
  onChange?: (object: EncounterCharacterGroup) => void;
}
