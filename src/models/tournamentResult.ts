import type { DefineFunction } from 'model-types'
import { Model } from 'sequelize'
import { Team, TeamEntity } from './team'
import { Tournament, TournamentEntity } from './tournament'

export interface TournamentResultEntity {
  readonly id: number
  readonly position: string
  readonly point: string
  readonly tournament?: TournamentEntity
  readonly team?: TeamEntity
}

export class TournamentResult extends Model implements TournamentResultEntity {
  static readonly association = (): void => {
    TournamentResult.belongsTo(Tournament, {
      foreignKey: 'userId',
      as: 'tournament',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
    TournamentResult.belongsTo(Team, {
      foreignKey: 'teamId',
      as: 'team',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
  }
  readonly id!: number
  readonly position!: string
  readonly point!: string
  readonly tournament?: Tournament
  readonly team?: Team
}

const define: DefineFunction = (sequelize, DataTypes) => {
  TournamentResult.init(
    {
      position: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      point: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'TournamentResult',
      tableName: 'tournament_results',
    }
  )
}

export default define
