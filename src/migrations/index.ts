import * as migration_20260417_083720_init_neon from './20260417_083720_init_neon';

export const migrations = [
  {
    up: migration_20260417_083720_init_neon.up,
    down: migration_20260417_083720_init_neon.down,
    name: '20260417_083720_init_neon'
  },
];
