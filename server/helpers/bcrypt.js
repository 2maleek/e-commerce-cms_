const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  hash: (password) => {
    return bcrypt.hash(password, saltRounds)
  },
  compare: (password, encrypted) => {
    return bcrypt.compare(password, encrypted)
  }
}
