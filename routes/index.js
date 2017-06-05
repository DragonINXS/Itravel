const express = require('express');
const router  = express.Router();
const Trip    = require('../models/trip-model.js');
const User = require('../models/user-model.js');
/* GET home page. */
router.get('/', (req, res, next) => {
  //
  // console.log('HOME ----------------');
  // console.log('SESSION (from express-session middleware)');
  // console.log(req.session);
  // console.log('\n');
  // console.log('USER (from passport middleware)');
  // console.log(req.user);

Trip.aggregate([{$sample: {size:6}}],
  (err,foundTrips)=>{
  if (err) {
    next(err);
    return;
    }


    Trip.find(
  { owner: req.user._id },
  (err, tripsList) => {
    if (err) {
      next(err);
      return;
    }
    res.render('index.ejs', {
      user: req.user,
      trips: tripsList,
      successMessage: req.flash('success')
    });
//
// if (foundTrips) {
//   foundTrips.forEach((trip)=>{
//     trip.owner.forEach((name)=>{
//         <p> Name <%= name %></p>
//  });
//   });
//
// }

    res.render('index.ejs',{
    successMessage:req.flash('success'),
    errorMessage: req.flash('error'),
    trips:foundTrips,

    });
});
});
  //render a completely different view for logged in users:
  // if(req.user){
  //   res.render('logged-in-home.ejs');
  // } else{
  //   res.render('index');
  // }

  // req.flash('successfulSignup');
  // res.render('index', {
    // successMessage:req.flash('success'),
  // });
});


router.get('/profile', (req, res, next) => {
  res.render('user/profile-view.ejs', {
    layout: 'layouts/profile-layout.ejs'
  });
});

module.exports = router;
