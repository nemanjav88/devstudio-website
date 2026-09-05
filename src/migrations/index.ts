import * as migration_20260905_125103_initial from './20260905_125103_initial';
import * as migration_20260905_130556_core_content_model from './20260905_130556_core_content_model';

export const migrations = [
  {
    up: migration_20260905_125103_initial.up,
    down: migration_20260905_125103_initial.down,
    name: '20260905_125103_initial',
  },
  {
    up: migration_20260905_130556_core_content_model.up,
    down: migration_20260905_130556_core_content_model.down,
    name: '20260905_130556_core_content_model'
  },
];
