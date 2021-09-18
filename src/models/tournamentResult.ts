import type { AssociateFunction, Db, DefineFunction } from '../model-type'
import { Model } from 'sequelize'
import type { Team, TeamEntity } from './team'
import type { Tournament, TournamentEntity } from './tournament'

export interface TournamentResultEntity {
  readonly id: number
  readonly position: number
  readonly point: string
  readonly teamId: number
  readonly tournament?: TournamentEntity
  readonly team?: TeamEntity
}

export class TournamentResult extends Model implements TournamentResultEntity {
  static readonly associate: AssociateFunction = ({ models }: Db) => {
    const { Team, Tournament } = models
    TournamentResult.belongsTo(Tournament, {
      foreignKey: 'tournamentId',
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
  readonly position!: number
  readonly point!: string
  readonly teamId!: number
  readonly tournament?: Tournament
  readonly team?: Team
}

export type TournamentResultModel = typeof TournamentResult

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
  return TournamentResult
}

export default define
