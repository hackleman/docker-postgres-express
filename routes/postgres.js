const express = require('express');
const router = express.Router();
const zones = require('../database/queries/zones');
const trips = require('../database/queries/trips');
const maps = require('../database/queries/maps');

router.get('/zones', zones.getZones);
router.get('/zones/:id', zones.getZone);
router.get('/yellowtrip', trips.getYellowTrips);
router.get('/yellowtrip/:id', trips.getYellowTrip);
router.get('/greentrip', trips.getGreenTrips);
router.get('/greentrip/:id', trips.getGreenTrip);
router.get('/fhvtrip', trips.getFHVTrips);
router.get('/fhvtrip/:id', trips.getFHVTrip);

router.get('/costhour/:id', maps.getCostHour);
router.get('/avgtime', maps.getAvgTimes);
router.get('/avgtimes/:id', maps.getAvgTimes);


module.exports = router;
