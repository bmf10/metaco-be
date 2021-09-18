import type { AssociateFunction, Db, DefineFunction } from '../model-type'
import { Model } from 'sequelize'
import type { Team, TeamEntity } from './team'
import type { User, UserEntity } from './user'

export const roles = ['CAPTAIN', 'MEMBER', 'STANDIN'] as const

export type Roles = typeof roles[number]

export interface TeamMemberEntity {
  readonly id: number
  readonly roles: Roles
  readonly ingameId: string
  readonly team: TeamEntity
  readonly user: UserEntity
}

export class TeamMember extends Model implements TeamMemberEntity {
  static readonly associate: AssociateFunction = ({ models }: Db) => {
    const { User, Team } = models
    TeamMember.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
    TeamMember.belongsTo(Team, {
      foreignKey: 'teamId',
      as: 'team',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
  }

  readonly id!: number
  readonly roles!: Roles
  readonly ingameId!: string
  readonly team!: Team
  readonly user!: User
}

export type TeamMemberModel = typeof TeamMember

const define: DefineFunction = (sequelize, DataTypes) => {
  TeamMember.init(
    {
      roles: {
        allowNull: false,
        type: DataTypes.ENUM(...roles),
      },
      ingameId: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: 'TeamMember', tableName: 'team_members' }
  )
  return TeamMember
}

export default define
