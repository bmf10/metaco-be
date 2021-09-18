import type { AssociateFunction, Db, DefineFunction } from '../model-type'
import { Model } from 'sequelize'
import type { Team, TeamEntity } from './team'
import type { TeamMember, TeamMemberEntity } from './teamMember'

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
  static readonly associate: AssociateFunction = ({ models }: Db) => {
    const { Team, TeamMember } = models
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

export type UserModel = typeof User

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
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      picture: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: 'User', tableName: 'users' }
  )
  return User
}

export default define
