import Database = require('sequelize')
import type { Sequelize, DataTypes, ModelType } from 'sequelize'

export interface Config {
  readonly dialect: string
  readonly storage: string
}

export interface ConfigMap {
  readonly [k: string]: Config
}

export interface AssociateFunction {
  (db: Db): void
}

export interface AssociatedModel extends ModelType {
  readonly associate?: AssociateFunction
}

export interface Db {
  readonly Sequelize: typeof Database
  readonly sequelize: Sequelize
  readonly models: Readonly<unknown>
}

export interface DefineFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (sequelize: Sequelize, dataTypes: typeof DataTypes): any
}
