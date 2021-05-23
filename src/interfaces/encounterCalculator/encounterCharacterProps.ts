import { EncounterCharacterGroup } from '../';

export default interface EncounterCharacterProps {
  characters: number;
  level: number;
  areEnemies?: boolean;
  maxLevel?: number;
  onChange?: (object: EncounterCharacterGroup) => void;
}
