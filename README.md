SimpleDep
===============================

This is an object to create your own dependent objects, outside of using Meteor Sessions.  

With it, you can store strings, numbers, and objects.  For objects you can also use `setValueForKey` to modify your object rather than using `setValue` for the whole thing.  

These objects can also persist between refreshes -- a little more than Session currently does.  It bases the persistence on the `initialValue` passed in, so if persistence is important to you while you're developing, ensure that each `initialValue` is unique.  

## To install:
```
mrt add simple-dependency-object
```

## To use (client-side only):
```
score = new SimpleDep(0, true);  // 1st parameter is the default value, 2nd is to persist or not
```
or
```
score = new SimpleDep({me:1,jo:0}, true); // for object
```

Then in a template somewhere:

```
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

Or, if you're using an object you can use: 

```
score.setValueForKey('jo', 1);  // this will also cause the 'myScore' helper to be re-run
```

To clear persistent data for a simple dep: 

```
score.clearPersistence();
```
