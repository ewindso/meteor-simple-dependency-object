SimpleDep = function(initialValue) {
  this.dep = new Deps.Dependency;
  this.value = initialValue ? initialValue : null; 
}

SimpleDep.prototype.getValue = function() {
  this.dep.depend(); 

  return this.value; 
} 

SimpleDep.prototype.setValue = function(newVal) {
  if(this.value == newVal) { return; }

  this.value = newVal;

  return this.dep.changed(); 
}