import * as migration_20260905_125103_initial from './20260905_125103_initial';
import * as migration_20260905_130556_core_content_model from './20260905_130556_core_content_model';
import * as migration_20260905_145846_homepage_globals from './20260905_145846_homepage_globals';
import * as migration_20260913_090938_homepage_solutions_references from './20260913_090938_homepage_solutions_references';
import * as migration_20260918_052333_solution_seo_fields from './20260918_052333_solution_seo_fields';

export const migrations = [
  {
    up: migration_20260905_125103_initial.up,
    down: migration_20260905_125103_initial.down,
    name: '20260905_125103_initial',
  },
  {
    up: migration_20260905_130556_core_content_model.up,
    down: migration_20260905_130556_core_content_model.down,
    name: '20260905_130556_core_content_model',
  },
  {
    up: migration_20260905_145846_homepage_globals.up,
    down: migration_20260905_145846_homepage_globals.down,
    name: '20260905_145846_homepage_globals',
  },
  {
    up: migration_20260913_090938_homepage_solutions_references.up,
    down: migration_20260913_090938_homepage_solutions_references.down,
    name: '20260913_090938_homepage_solutions_references',
  },
  {
    up: migration_20260918_052333_solution_seo_fields.up,
    down: migration_20260918_052333_solution_seo_fields.down,
    name: '20260918_052333_solution_seo_fields'
  },
];
