import { DataSource } from 'typeorm'
import dotEnv from 'dotenv'

import BreederContactEntity from '../entities/BreederContactEntity'
import BreederEntity from '../entities/BreederEntity'
import BreederImageEntity from '../entities/BreederImageEntity'
import BreederUserEntity from '../entities/BreederUserEntity'
import PoultryEntity from '../entities/PoultryEntity'
import PoultryImageEntity from '../entities/PoultryImageEntity'
import RegisterEntity from '../entities/RegisterEntity'
import RegisterFileEntity from '../entities/RegisterFileEntity'

dotEnv.config()

const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = process.env
const isProduction = process.env.NODE_ENV === 'production'

const aditionalProductionRequirednConfig = {
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

export const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [
    BreederContactEntity,
    BreederEntity,
    BreederImageEntity,
    BreederUserEntity,
    PoultryEntity,
    PoultryImageEntity,
    RegisterEntity,
    RegisterFileEntity
  ],
  logging: true,
  migrations: [
    isProduction ? 'build/database/migrations/**/*.js' : 'src/database/migrations/**/*.ts'
  ],
  subscribers: [],
  ...(isProduction ? aditionalProductionRequirednConfig : {}),
})

dataSource.initialize()
  .then(() => console.log('Connected to the database'))
  .catch(error => console.log(error))
