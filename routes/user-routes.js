const express      = require('express');
const ensure       = require('connect-ensure-login');
const bcrypt       = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const User         = require('../models/user-model.js');


const routerThingy = express.Router();

const myUploader = multer({
  dest:path.join( __dirname, '../public/uploads')
 });

routerThingy.get('/profile',

    //     redirects to '/login' if you are NOT logged in
    //                      |
  ensure.ensureLoggedIn('/login'),

  (req, res, next) => {
    res.render('user/profile-view.ejs', {
      successMessage: req.flash('success')
    });
  }
);






// <form method="post" action="/profile/edit">
routerThingy.post('/profile',

  ensure.ensureLoggedIn('/login'),
  myUploader.single('userPhoto'),
  (req, res, next) => {
    console.log("LOOK!");
    console.log(req.body.pic);
    const profileName = req.body.profileName;
    const profileUsername = req.body.profileUsername;
    const currentPassword = req.body.profileCurrentPassword;
    const newPassword = req.body.profileNewPassword;

    User.findOne(
      { username: profileUsername },
      { username: 1 },
      (err, foundUser) => {
        if (err) {
          next(err);
          return;
        }

     // add updates from form !!!!!!!
        req.user.name = req.body.profileName;
        req.user.username = req.body.profileUsername;
        // dodato na osnovu forme koju popunjavaju da bi napravili profil
        req.user.location = req.body.userCountry;
        req.user.profession = req.body.userProfession;
        req.user.email = req.body.userEmail;
        req.user.favPlace = req.body.userFavPlace;

        if (currentPassword && newPassword && bcrypt.compareSync(currentPassword, req.user.encryptedPassword)) {
          // add new encryptedPassword to the updates
          const salt = bcrypt.genSaltSync(10);
          const hashPass = bcrypt.hashSync(newPassword, salt); //my comment: here we use new password
          // profileChanges.encryptedPassword = hashPass;
          req.user.encryptedPassword = hashPass;
        }
        req.user.about = req.body.userAbout;
        if (req.body.pic === 'false') {
          req.user.save((err) => {

            if (err) {
              next(err);
              return;
            }

    req.flash('success', 'Changes saved.');
    res.redirect('/profile');
  });
  }


if (req.body.pic === 'true') {


  req.user.photo = `/uploads/${req.file.filename}`;
  req.user.save((err) => {
    if (err) {
      next(err);
      return;
    }

    // req.flash('success', 'Changes saved.');

    res.redirect('/profile');
  });

}


      }
    );
  }
);





module.exports = routerThingy;
