import fs from 'fs'
import type {
  AssociatedModel,
  ConfigMap,
  Db,
  DefineFunction,
  ModelMap,
} from '../model-type'
import path from 'path'
import Database, { Sequelize } from 'sequelize'

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const configString = fs
  .readFileSync(path.resolve(__dirname, '../../config/config.json'))
  .toString()
const configMap: ConfigMap = JSON.parse(configString) as ConfigMap
const config = configMap[env]

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.storage,
})

const ext = /\.(ts|js)$/

const models = fs
  .readdirSync(__dirname)
  .reduce((acc: { [k: string]: AssociatedModel }, file) => {
    if (file !== basename && file.indexOf('.') !== 0 && ext.test(file)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const define: { default: DefineFunction } = require(path.join(
        __dirname,
        file
      ))
      const model: AssociatedModel = define['default'](
        sequelize,
        Database.DataTypes
      )
      acc[model.name] = model
    }
    return acc
  }, {})

const db: Db = {
  models: models as unknown as ModelMap,
  sequelize,
  Sequelize: Database,
}

Object.keys(models).forEach((modelName) => {
  const associate = models[modelName].associate
  if (associate) {
    associate(db)
  }
})

export default db
