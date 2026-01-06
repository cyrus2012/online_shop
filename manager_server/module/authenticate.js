
global.service_caches = {};
global.service_auth_fn = null;

async function getService(serviceName){
    if(global.service_caches[serviceName])
        return global.service_caches[serviceName];

    
    const servicePath = "../service/" + serviceName + ".js";
    
    try{
        console.log(`try to access ${serviceName} module`);
        const serviceModule = await import(servicePath);

        if(!serviceModule){
            console.log(`Module ${serviceName} is NOT found`);
            return null;
        }

        global.service_caches[serviceName] = {};

        
        for(const actionName in serviceModule){  
            //need a middleware to check authorization before executing the action.
            global.service_caches[serviceName][actionName] = serviceModule[actionName];
        }

        //console.log(global.service_caches[serviceName]);
        return global.service_caches[serviceName];

    }catch(err){
        console.error(err);
    }
}

export default {getService};