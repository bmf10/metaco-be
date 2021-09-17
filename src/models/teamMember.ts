import type { DefineFunction } from 'model-types'
import { Model } from 'sequelize'
import { Team, TeamEntity } from './team'
import { User, UserEntity } from './user'

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
  static readonly association = (): void => {
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
  readonly user!: UserEntity
}

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
}

export default define
