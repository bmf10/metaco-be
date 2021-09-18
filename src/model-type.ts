import Database = require('sequelize')
import type { Sequelize, DataTypes, ModelType } from 'sequelize'
import type { UserModel } from 'models/user'
import type { TeamModel } from 'models/team'
import type { TeamMemberModel } from 'models/teamMember'
import type { TournamentModel } from 'models/tournament'
import type { TournamentResultModel } from 'models/tournamentResult'

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

export interface ModelMap {
  readonly User: UserModel
  readonly Team: TeamModel
  readonly TeamMember: TeamMemberModel
  readonly Tournament: TournamentModel
  readonly TournamentResult: TournamentResultModel
}
export interface Db {
  readonly Sequelize: typeof Database
  readonly sequelize: Sequelize
  readonly models: Readonly<ModelMap>
}

export interface DefineFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (sequelize: Sequelize, dataTypes: typeof DataTypes): any
}
