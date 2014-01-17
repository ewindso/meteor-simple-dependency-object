/**
 * This is the constructor for a SimpleDep object.
 * It takes 2 parameters -- initialValue and persist. 
 * Note when it persists, it will simply take the initialValue as the key for
 * a cookie, so it is not 100% reliable if you have more than one SimpleDep 
 * with the same initial value.
 * @param initialValue - the initial value of the object, if any (can be null)
 * @param persist - whether or not to persist this value via cookies.
 */
SimpleDep = function(initialValue, persist) {
  this.dep = new Deps.Dependency;
  this.value = initialValue ? initialValue : null; 
  this.persist = persist;

  if(this.persist) {
  	this.persistKey = '_simple_dep_' + this.getEncodedStringVal(initialValue);

  	// attempt to retrieve it first
  	if(this.retrievePersistData() == false) {
	  	this.persistData();
  	}
  }
} 

SimpleDep.prototype.retrievePersistData = function() {
	var cookieData = document.cookie.split(';'); 

	for(var i = 0; i < cookieData.length; i++) {
		var cookieDataArray = cookieData[i].split('=');

		var curKey = cookieDataArray[0].replace(/[ ]/g, '');

		if(curKey == this.persistKey) {

			var persistedValue = cookieDataArray[1].replace('_simple_dep_', '');
			persistedValue = JSON.parse(decodeURIComponent(persistedValue));
			this.setValue(persistedValue);

			return true;
		}
	}

	return false;
} 

SimpleDep.prototype.getEncodedStringVal = function(data) {
	return encodeURIComponent(typeof(data) == 'object' ? JSON.stringify(data) : '' + data);
}

SimpleDep.prototype.persistData = function() {
	if(this.persist == true) {
		document.cookie = this.persistKey + '=' + this.getEncodedStringVal(this.value);
	}
}

SimpleDep.prototype.clearPersistence = function() {
	document.cookie = this.persistKey + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';	
}

SimpleDep.prototype.getValue = function() {
  this.dep.depend(); 

  return this.value; 
} 

SimpleDep.prototype.setValue = function(newVal) {
  if(this.isEqual(this.value, newVal)) { return; }

  this.value = newVal;
  this.persistData();

  return this.dep.changed(); 
}

SimpleDep.prototype.setValueForKey = function(key, value) {
	if(typeof(this.value) != 'object') { return; } // only for objects

	this.value[key] = value;
	this.persistData();

	return this.dep.changed();
}

// can be overwritten to accomodate special cases
SimpleDep.prototype.isEqual = function(oldVal, newVal) {
	var oldValType = typeof(oldVal);
	var newValType = typeof(newVal); 

	if(oldValType != newValType) { return false; }  // not same types, therefore not equal

	if(oldValType == newValType == 'object') {
		return Object.identical(oldVal, newVal); 
	}

	return oldVal == newVal;
}