'use strict';

var jwt = require('jsonwebtoken');
var request = require('request');

exports.handler = function(event, context, callback) {
  if (!event.authToken) {
    callback('Could not find authToken')
    return;
  }

  var token = event.authToken.split(' ')[1];

  var secretBuffer = process.env.AUTH0_SECRET;

  jwt.verify(token, secretBuffer, (err,decoded)=>{
    if(err) {
      console.log(`Failed JWT verification: ${err}, auth: ${event.authToken}`)
      callback('Authorization Failed');
    } else {
      var body = {
        'id_token': token
      };
      var options = {
        url: `http://${process.env.DOMAIN}/tokeninfo`,
        method: 'POST',
        json: true,
        body: body
      };

      request(options, (err, res, body)=>{
        if(!err && res.statusCode == 200){
          callback(null, body);
        } else {
          callback(err);
        }
      })
    }
  })
}