'use strict';
const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken') 
const crypto = require("crypto");
var refreshTokens = {} 
var SECRET = "123456789abcdefghijklmnopqurstuvwxyz" 

router.post('/login', authenticate);
router.post('/refresh-token', refreshToken);
router.post('/user-data', authorize,fetchData);
router.post('/revoke-token', authorize,  revokeToken);
module.exports = router;

 /**
  * authenticate the user
  * @param {*} param0 
  */
 function authenticate(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    if (username !=='admin' || password !=='admin') {
        throw 'Username or password is incorrect';
    }
    // authentication successful so generate jwt and refresh tokens
      const user = { 
        'username': username, 
        'role': 'admin' 
      } 
      //generate jwt token
      const jwtToken = jwt.sign(user, SECRET, { expiresIn: 300 }) 
      //generate refresh token
      const refreshToken = crypto.randomBytes(40).toString('hex');
      refreshTokens[refreshToken] = username;
    
    // return basic details and tokens
    return  res.json({ 
        username,
        jwtToken,
        refreshToken
    });
} 

/**
 * generate refresh token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function refreshToken(req, res, next){
    const username = req.body.username
    const refreshToken = req.body.refreshToken
    if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
      const user = {
        'username': username,
        'role': 'admin'
      }
      const token = jwt.sign(user, SECRET, { expiresIn: 300 })
      res.json({jwtToken:token})
    }
    else {
      res.sendStatus(401)
    }
} 

/**
 * remove the token
 */
function revokeToken(req, res, next){
    var refreshToken = req.body.refreshToken 
    if(refreshToken in refreshTokens) { 
      delete refreshTokens[refreshToken]
    } 
    res.send(204) 
} 

/**
 * check the autherization
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function authorize(req, res, next) { 
   let token = req.headers['x-auth'] ;
   jwt.verify(token, SECRET, (err, verifiedJwt) => {
                if(err){
                    return res.status(401).json({ message: 'Unauthorized' });
                }else{                    
                    next();
                }
     })  
    
}
/**
 * fetch some sample data
 */
function fetchData(req, res, next){
    res.json({"employeeName":"ram",
            "employeeCode":"RAM23"});
}