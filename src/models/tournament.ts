import type { DefineFunction } from 'model-types'
import { Model } from 'sequelize'
import { Team, TeamEntity } from './team'

export interface TournamentEntity {
  readonly id: number
  readonly title: string
  readonly startDate: Date
  readonly endDate: Date
  readonly teamCount: string
  readonly slot?: string
  readonly teams?: ReadonlyArray<TeamEntity>
}

export class Tournament extends Model implements TournamentEntity {
  static readonly association = (): void => {
    Tournament.hasMany(Team, {
      foreignKey: 'captainId',
      as: 'teams',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
  }

  readonly id!: number
  readonly title!: string
  readonly startDate!: Date
  readonly endDate!: Date
  readonly teamCount!: string
  readonly slot?: string
  readonly teams?: ReadonlyArray<Team>
}

const define: DefineFunction = (sequelize, DataTypes) => {
  Tournament.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      teamCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      slot: {
        type: DataTypes.INTEGER,
      },
    },
    { sequelize, modelName: 'Tournament', tableName: 'tournaments' }
  )
}

export default define
