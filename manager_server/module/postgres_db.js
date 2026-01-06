import {Pool} from "pg";
import config from "config";

const dbConfig = config.get("postgresql_config");

const pool = new Pool({
    user: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    max: dbConfig.max
});

function query(text, params){
    
    return pool.query(text, params);
}

/**
 * 
 * @param {String} table name of database table
 * @param {Object} conditions its property name is the column name of the table
 */
function find(table, conditions){
    var text = `SELECT * FROM ${table} WHERE `;

    const params = [];
    for(const key in conditions){
        params.push(conditions[key]);
        
        if(params.length === 1){
            text = text + `${key}=$${params.length}`;
        }else{
            text = text + ` AND ${key}=$${params.length}`;
        }
    }

    //console.log("db query: " + text);
    //console.log("param: " + params);
    return query(text, params);

}



export default {query, find};