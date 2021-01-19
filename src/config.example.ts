// #region bot token
export const TOKEN = process.env.TOKEN!
// #endregion

export const OWNER_ID = process.env.OWNER_ID ?? '292571834770128906';

export const PGSQL_ENABLED = process.env.PGSQL_ENABLED === 'true';
export const PGSQL_DATABASE_NAME = 'ping-manager';
export const PGSQL_DATABASE_PASSWORD = process.env.PGSQL_DATABASE_PASSWORD ?? '';
export const PGSQL_DATABASE_USER = process.env.PGSQL_DATABASE_USER ?? 'postgres';
export const PGSQL_DATABASE_PORT = Number(process.env.PGSQL_DATABASE_PORT) ?? 5432;
export const PGSQL_DATABASE_HOST = process.env.PGSQL_DATABASE_HOST ?? 'localhost';

export const PRODUCTION = process.env.NODE_ENV === 'production';
