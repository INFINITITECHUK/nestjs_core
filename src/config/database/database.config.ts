import { IDatabaseConfig } from './database.interface';
import 'dotenv/config'

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_DEVELOPMENT,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            useUTC: process.env.DB_USE_UTC, // for reading from database
          },
        timezone: process.env.DB_TIMEZONE, // for writing to database
        define: {
            timestamps: false
        },
        pool: {
            max: 40,
            min: 0,
            acquire: 60000,
            idle: 10000
        },
        logging: false
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_TEST,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            useUTC: process.env.DB_USE_UTC, // for reading from database
          },
        timezone: process.env.DB_TIMEZONE, // for writing to database
        define: {
            timestamps: false
        },
        pool: {
            max: 40,
            min: 0,
            acquire: 60000,
            idle: 10000
        },
        logging: false
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_PRODUCTION,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            useUTC: process.env.DB_USE_UTC, // for reading from database
          },
        timezone: process.env.DB_TIMEZONE, // for writing to database
        define: {
            timestamps: false
        },
        pool: {
            max: 40,
            min: 0,
            acquire: 60000,
            idle: 10000
        },
        logging: false
    },
};
