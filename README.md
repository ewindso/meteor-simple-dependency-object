SimpleDep
===============================

This is an object to create your own dependent objects, outside of using Meteor Sessions.

## To install:
```
mrt add simple-dependency-object
```

## To use (client-side only):
```
score = new SimpleDep(0);  // parameter is the default value

...

Template['game'].helpers({
  'myScore': function() {
    return score.getValue();   // this is like returning a value from a Session variable.
  }
});
```

To cause reaction: 

```
score.setValue(1);   // this will cause the 'myScore' helper to be re-run
```
