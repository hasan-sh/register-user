import { DataTypes, Sequelize } from 'sequelize'

const sequelize = new Sequelize('upinionDb', null, null, {
  dialect: 'sqlite',
  define: { timestamps: false },
  storage: './upinionDb.sqlite'
})

sequelize.authenticate().then(
  () => {
    console.log('Connection has been established successfully.')
  },
  err => {
    console.log('Unable to connect to the database:', err)
  }
)

//  MODELS
const Register = sequelize.define(
  'Register',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    company: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false }
  },
  {
    tableName: 'Register',
    timestamps: true,
    updatedAt: false
  }
)

const models = {
  Register
}

export { sequelize, models }
