import * as migration_20260417_083720_init_neon from './20260417_083720_init_neon';
import * as migration_20260417_085353_add_faq_collections from './20260417_085353_add_faq_collections';
import * as migration_20260417_133043_localized from './20260417_133043_localized';
import * as migration_20260420_133904 from './20260420_133904';

export const migrations = [
  {
    up: migration_20260417_083720_init_neon.up,
    down: migration_20260417_083720_init_neon.down,
    name: '20260417_083720_init_neon',
  },
  {
    up: migration_20260417_085353_add_faq_collections.up,
    down: migration_20260417_085353_add_faq_collections.down,
    name: '20260417_085353_add_faq_collections',
  },
  {
    up: migration_20260417_133043_localized.up,
    down: migration_20260417_133043_localized.down,
    name: '20260417_133043_localized',
  },
  {
    up: migration_20260420_133904.up,
    down: migration_20260420_133904.down,
    name: '20260420_133904'
  },
];
