
const isObjectEmpty = (obbj) => {
    return Object.keys(obbj).length === 0
}
const flatten = (arr) => {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
const objectsToArray = (objs) => {
    return Object.keys(objs).map(key => objs[key] instanceof Object ? objectsToArray(objs[key]) : key + ":" + objs[key])
}

module.exports={
    isObjectEmpty,
    flatten,
    objectsToArray,

}
