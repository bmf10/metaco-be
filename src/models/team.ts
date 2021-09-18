import type { AssociateFunction, Db, DefineFunction } from '../model-type'
import { Model } from 'sequelize'
import type { TeamMember, TeamMemberEntity } from './teamMember'
import type { Tournament, TournamentEntity } from './tournament'
import type { User, UserEntity } from './user'

export interface TeamEntity {
  readonly id: number
  readonly name: string
  readonly logo?: string
  readonly captain?: UserEntity
  readonly tournament?: TournamentEntity
  readonly teamMember?: ReadonlyArray<TeamMemberEntity>
}

export class Team extends Model implements TeamEntity {
  static readonly associate: AssociateFunction = ({ models }: Db): void => {
    const { User, Tournament, TeamMember } = models
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
  readonly teamMember?: ReadonlyArray<TeamMember>
}

export type TeamModel = typeof Team

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
  return Team
}

export default define
