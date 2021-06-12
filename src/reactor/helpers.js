/**
 * Map the given object into an array
 * @param {object} object 
 * @param {Function} callback 
 * @returns {Array}
 */
export function mapObject(object,callback){
    return Object.keys(object).map(key=>{
        return callback(key,object[key]);
    })
}