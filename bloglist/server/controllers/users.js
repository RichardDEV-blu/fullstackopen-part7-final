const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || username.length < 3) {
    return response.status(400).json({
      error: 'username must be at least 3 characters long',
    })
  }

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long',
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params

  if (!mongoose.isValidObjectId(id)) {
    return response.status(400).json({
      error: 'malformatted id',
    })
  }

  const user = await User.findById(id).populate('blogs')

  if (!user) {
    return response.status(404).json({
      error: 'user not found',
    })
  }

  response.json(user)
})

module.exports = usersRouter
