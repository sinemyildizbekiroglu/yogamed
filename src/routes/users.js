const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Photo = require('../models/photo')
const Event = require('../models/event')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.age) {
    query.age = req.query.age
  }

  res.send(await User.find(query))
})

router.get('/initialize', async (req, res) => {
  // const users = []
  // printName = person => console.log(person.name)
  const ceyhan = await User.create({ name: 'ceyhan', age: 32 })
  const sinem = await User.create({ name: 'sinem', age: 36 })

  const centralparkPhoto = await Photo.create({ filename: 'centralpark.jpg' })
  const ycp = await Event.create('Yoga class in Central Park')
  // event is still not object, it is string. This needs to be changed.

  // centralparkPhoto.save()

  // const ycp = new Event('Yoga class in Central Park')

  await sinem.likeEvent(ycp)
  await ceyhan.likeEvent(ycp)
  await sinem.addPhoto(centralparkPhoto)
  await ceyhan.addPhoto(centralparkPhoto)
  await sinem.attend(ycp)
  await ceyhan.attend(ycp)

  console.log(sinem)
  res.sendStatus(200)
})

// ycp.printAttendeeNames()

// console.log(ceyhan, ceyhan.photos[0].likedBy)
// console.log(sinem, sinem.photos[0].likedBy)
// console.log(ycp.likedBy)
// const users = [ceyhan, sinem]

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router
