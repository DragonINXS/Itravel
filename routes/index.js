const express = require('express');
const router  = express.Router();
const Trip    = require('../models/trip-model.js');
const User = require('../models/user-model.js');
/* GET home page. */
router.get('/', (req, res, next) => {


Trip.aggregate([{$sample: {size:6}}],
  (err,foundTrips)=>{
  if (err) {
    next(err);
    return;
    }

console.log('-------------');
console.log(req.user);

const ownersPictures = [];
const ownersNames = [];

foundTrips.forEach((oneTrip)=>{
 User.findById(oneTrip.owner, (err, theOwner)=>{
   if (err){
     next(err);
     return;
    }
 ownersPictures.push(theOwner.photo);
 ownersNames.push(theOwner.name);
   });
 });

setTimeout(function(){
    res.render('index.ejs',{
      successMessage:req.flash('success'),
      errorMessage: req.flash('error'),
      trips:foundTrips,
      ownersPictures:ownersPictures,
      ownersNames:ownersNames,
      user:req.user
    });
    }, 500);
  });
});


router.get('/profile', (req, res, next) => {
  res.render('user/profile-view.ejs', {
    layout: 'layouts/profile-layout.ejs'
  });
});

module.exports = router;
