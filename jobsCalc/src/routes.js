const express = require("express")
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

// routes index
routes.get('/', DashboardController.index)

// routes Job Create/Save
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)

// routes Job Edit/Delete
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)

// routes profile
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)


module.exports = routes;