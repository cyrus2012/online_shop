import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import BearerStrategy from "passport-http-bearer";
import jwt from "jsonwebtoken";
import config from "config";

const jwt_config = config.get("jwt_config");


function setup (inject_function){


    passport.use("local", new LocalStrategy(
        function verify(username, password, cb){

            if(!inject_function){
                console.log("no inital verify function");
                return cb("server has problem");
            }
            
            inject_function(username, password, function(err, user){
                    return cb(err, user);
            });

        }
    ));
    
    passport.use('bearer', new BearerStrategy(
        (token, done) => {
            jwt.verify(token, jwt_config.get("secretKey"), function(err, decode){
                if(err)
                    return done("error in token auth: " + err.message);

                return done(null, "token auth");
            });
            //set fixed token for test purpose
            // if(token === "aaa"){
            //     return done(null, "get user info");
            // }else{
            //     return done(null, false);            
            // }
            
        }
    ));

}


/*
function setup(app, loginFunction, callback){

    passport.use("local", new LocalStrategy(
        function(username, password, cb){
            if(!loginFunction)
                return cb("login function has not been setup");

            loginFunction(username, password, function(err, user){
                if(err)
                    return cb(err);

                return cb(null, user);
            });
        }
    ));

    passport.use('bearer', new BearerStrategy(
        (token, done) => {
            jwt.verify(token, jwt_config.get("secretKey"), function(err, decode){
                if(err)
                    return done("error in token auth: " + err.message);

                return done(null, "token auth");
            });
            //set fixed token for test purpose
            // if(token === "aaa"){
            //     return done(null, "get user info");
            // }else{
            //     return done(null, false);            
            // }
            
        }
    ));


    if(callback)
        callback();

}
*/

function login(req, res, next){
    passport.authenticate("local", function(err, user, info){
        
        if(err)
            return res.sendResult(null, 400, err);
        if(!user)
            return res.sendResult(null, 400, "user not found");

        const token = jwt.sign({uid:user.id, rid:user.rid}, jwt_config.get("secretKey"),
                        {expiresIn:jwt_config.get("expiresIn")});

        user.token = "Bearer " + token;
        
        return res.sendResult(user, 200, "login success");
    })(req, res, next);
}

// The 3rd parameter of passport.authenticate() is the callback function of the "bearer" Strategy
function tokenAuth(req, res, next){
    
    passport.authenticate('bearer', {session:false}, 
        (err, user, info, status) => {
            if(err){
                return res.sendResult(err, 400, "invalid token");
            }

            if(!user){
                return res.sendResult(null, 400, "invalid token");
            }

            //return res.sendResult(user, 200, "success");
            next();
        })(req, res, next);
}

export default {setup, login, tokenAuth};
