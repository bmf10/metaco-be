import type { DefineFunction } from 'model-types'
import { Model } from 'sequelize'
import { TeamMember } from './teamMember'
import { Tournament, TournamentEntity } from './tournament'
import { User, UserEntity } from './user'

export interface TeamEntity {
  readonly id: number
  readonly name: string
  readonly logo?: string
  readonly captain?: UserEntity
  readonly tournament?: TournamentEntity
}

export class Team extends Model implements TeamEntity {
  static readonly association = (): void => {
    Team.belongsTo(User, {
      foreignKey: 'captainId',
      as: 'captain',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
    Team.belongsTo(Tournament, {
      foreignKey: 'tournamentId',
      as: 'tournament',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
    Team.hasMany(TeamMember, {
      foreignKey: 'teamId',
      as: 'teamMembers',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
  }

  readonly id!: number
  readonly name!: string
  readonly logo?: string
  readonly captain?: User
  readonly tournament?: Tournament
}

const define: DefineFunction = (sequelize, DataTypes) => {
  Team.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      logo: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: 'Team', tableName: 'teams' }
  )
}

export default define
