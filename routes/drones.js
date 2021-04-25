const express = require('express');

// require the Drone model here
const Drone = require('../models/Drone.model.js');

const router = express.Router();

router.get('/drones', (req, res, next) => {
  Drone.find()
    .then(allDronesFromDB => {
      console.log('Retrieved movies from DB:', allDronesFromDB);
      res.render('drones/list', { drones: allDronesFromDB });
    })
    .catch(error => {
      console.log('Error while getting the drones from the DB: ', error);
      next(error);
    });
});

router.get('/drones/create', (req, res, next) => res.render('drones/create-form'));

router.post('/drones/create', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then(() => res.redirect('/drones'))
    .catch(() => res.render('drones/create-form'));
});

router.get('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Drone.findById(id).then(drone => {
    console.log(drone);
    res.render('drones/update-form', { drone });
  });
});

router.post('/drones/:id/edit', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  const { id } = req.params;
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed }, { new: true })
    .then(drone => {
      console.log('update', drone);
      res.redirect('/drones');
    })
    .catch(() => res.render('drones/create-form'));
});

router.post('/drones/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Drone.findByIdAndDelete(id)
    .then(drone => {
      console.log('delete', drone);
      res.redirect('/drones');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
