
global.serviceCaches = {};
global.serviceAuthorizationFunction  = null;

/**
 * 
 * @param {function(role_id, serviceName, actionName, cb)} authFn authorization function to check if the role has permission for service action. 
 * cb(error, isPermitted) is the callback function and isPermitted is true if authorized.
 */
async function setAuthorizationFunction(authFn){
    global.serviceAuthorizationFunction  = authFn;
}


function requestPermissionCheck(serviceName, actionName, serviceModule, actionFunction){
    return function(){
        const origArguments = arguments;
        //console.log("requestPermissionCheck arguments: ");
        //console.log(arguments);

        return function(req, res){
            const role_id = req.userInfo.role_id; //userInfo property comes from passport.tokenAuth function.
            //console.log("role id is " + role_id);

            //check user role permission and protected Function
            if(!role_id || isNaN(role_id))
                return res.sendResult(null, 401, "No Role id provided.");
            

            if(global.serviceAuthorizationFunction){
                //console.log("call global.serviceAuthorizationFunction()");
                global.serviceAuthorizationFunction (role_id, serviceName, actionName, function(err, isPermitted){
                    if(err)
                        return res.sendResult(null, 400, err);

                    if(isPermitted)
                        return actionFunction.apply(serviceModule, origArguments);
                    else
                        return res.sendResult(null, 401, "User does not has permission to this operation");

                });
                
            }else
                return res.sendResult(null, 401, "Authorization Function fails");
        }
    }

}


/**
 * 
 * @param {String} serviceName 
 * @returns function[], which contains all function (action) available of that service.
 */
async function getService(serviceName){
    if(global.serviceCaches[serviceName])
        return global.serviceCaches[serviceName];

    
    const servicePath = "../service/" + serviceName + ".js";
    
    try{
        console.log(`try to access ${serviceName} module`);
        const serviceModule = await import(servicePath);

        if(!serviceModule){
            console.log(`Module ${serviceName} is NOT found`);
            return null;
        }

        global.serviceCaches[serviceName] = {};

        
        for(const actionName in serviceModule){  
            //need a middleware to check authorization before executing the action.
            //global.service_caches[serviceName][actionName] = serviceModule[actionName];
            global.serviceCaches[serviceName][actionName] = requestPermissionCheck(serviceName, actionName, serviceModule, serviceModule[actionName]);
        }

        //console.log(global.service_caches[serviceName]);
        return global.serviceCaches[serviceName];

    }catch(err){
        console.error(err);
    }
}

export default {getService, setAuthorizationFunction};