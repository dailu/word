// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-relations
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';
var config = require('../../server/config.json');
var path = require('path');

module.exports = function(Customer) {
   //send verification email after registration
  Customer.afterRemote('create', function(context, customer, next) {
    var options = {
      protocol:'https',
      host:'bkapi.zihanpoems.com',
      port:'443',
      type: 'email',
      to: customer.email,
      from: 'admin@mightshare.co.nz',
      subject: 'Thanks for registering with Mighty Share.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: customer
    };

    customer.verify(options, function(err, response) {
      if (err) {
        Customer.deleteById(customer.id);
        return next(err);
      }
      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' +
            'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });
  
  // Method to render
  Customer.afterRemote('prototype.verify', function(context, customer, next) {
    context.res.render('response', {
      title: 'A Link to reverify your identity has been sent '+
        'to your email successfully',
      content: 'Please check your email and click on the verification link '+
        'before logging in',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  //send password reset link when requested
  Customer.on('resetPasswordRequest', function(info) {
    var url = 'https://bkapi.zihanpoems.com/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    Customer.app.models.Email.send({
      transport: 'smtp',
      to: info.email,
      from: 'admin@mightshare.co.nz',
      subject: 'Password reset for Might Share',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  //render UI page after password change
  Customer.afterRemote('changePassword', function(context, user, next) {
    context.res.render('response', {
      title: 'Password changed successfully for Might Share',
      content: 'Please login again with new password',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  //render UI page after password reset
  Customer.afterRemote('setPassword', function(context, user, next) {
    context.res.render('response', {
      title: 'Password reset success for Might Share',
      content: 'Your password has been reset successfully',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });
  
};
