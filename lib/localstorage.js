var convertObjectHash = function(obj){
  if (typeof obj != 'object') return obj;
  var objectHash = {functions: {}, data: {}};
  for (var property in obj)
  {
    if (obj.hasOwnProperty(property)) {
      var propertyValue =  obj[property];
      if(typeof propertyValue === 'function' ) objectHash.functions[property] = encodeURIComponent(propertyValue);
      else if (typeof propertyValue === 'object')  objectHash.data[property] = convertObjectHash(propertyValue);
      else objectHash.data[property] = propertyValue;
    }
  }

  return objectHash;
};

var restoreObject = function(objectHash){
  if(typeof objectHash != 'object') return objectHash;
  var object = {};
  var data = objectHash.data;
  var functions =  objectHash.functions;

  for (var property in functions)
  {
    if (functions.hasOwnProperty(property)) object[property] = eval("(" + decodeURIComponent(functions[property]) + ")");

  }
  for (var property in data)
  {
    if (data.hasOwnProperty(property)) {
      var dataValue =  data[property];
      if(typeof dataValue === 'object' )  object[property] = restoreObject(dataValue);
      else object[property] = dataValue;
    }

  }

  return object;
}

var setObject = function(key, value) {
  var objectHash = convertObjectHash(value);
  var string = JSON.stringify(objectHash);
  window.localStorage.setItem(key, string);
}

var getObject = function(key) {
  var stringValue = window.localStorage.getItem(key);
  if(stringValue){
    var objectHash = JSON.parse(stringValue);
    var object = restoreObject(objectHash);
    return object;
  }
}

if(window.Storage) {
  Storage.prototype.setObject = setObject;
  Storage.prototype.getObject = getObject;
}
else {
  window.localStorage = {
    getItem: window.localStorage.getItem,
    setItem: window.localStorage.setItem,
    removeItem: window.localStorage.removeItem,
    clear: window.localStorage.clear,
    setObject: setObject,
    getObject: getObject
  }

}

