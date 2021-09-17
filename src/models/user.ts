import type { DefineFunction } from 'model-types'
import { Model } from 'sequelize'
import { Team, TeamEntity } from './team'
import { TeamMember, TeamMemberEntity } from './teamMember'

export interface UserEntity {
  readonly id: number
  readonly name: string
  readonly email: string
  readonly coin: number
  readonly picture?: string
  readonly captains?: ReadonlyArray<TeamEntity>
  readonly teamMembers?: ReadonlyArray<TeamMemberEntity>
}

export class User extends Model implements UserEntity {
  static readonly association = (): void => {
    User.hasMany(Team, {
      foreignKey: 'captainId',
      as: 'captains',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
    User.hasMany(TeamMember, {
      foreignKey: 'userId',
      as: 'teamMembers',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
  }

  readonly id!: number
  readonly name!: string
  readonly email!: string
  readonly coin!: number
  readonly picture?: string
  readonly captains?: ReadonlyArray<Team>
  readonly teamMembers?: ReadonlyArray<TeamMember>
}

const define: DefineFunction = (sequelize, DataTypes) => {
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      coin: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      picture: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: 'User', tableName: 'users' }
  )
}

export default define
