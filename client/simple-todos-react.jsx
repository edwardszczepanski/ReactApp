// Define a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.subscribe("tasks");
 
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}


Meteor.methods({
  addTask(text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    // These are simply test values
    var x = Math.floor(1000 * Math.random());
    var y = Math.floor(1000 * Math.random());
    var z = x - y;

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      upvotes: x,
      downvotes: y,
      score: z
    });
  },
 
  removeTask(taskId) {
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
    
    Tasks.remove(taskId);
  },

  upvoteTask(taskId) {
    Tasks.update(taskId, { $inc: { upvotes: 1 } });
    const task = Tasks.findOne(taskId)

    // Right now this logic is unnecesary but it will eventually hold the Reddit Ranking Algo
    var x = task.upvotes;
    var y = task.downvotes;
    var z = x - y;
    Tasks.update(taskId, { $set: { score: z } });
  },

  downvoteTask(taskId) {
    Tasks.update(taskId, { $inc: { upvotes: -1 } });
    const task = Tasks.findOne(taskId)

    // Right now this logic is unnecesary but it will eventually hold the Reddit Ranking Algo
    var x = task.upvotes;
    var y = task.downvotes;
    var z = x - y;
    Tasks.update(taskId, { $set: { score: z } });
  },

  upToggle () {
    
  },

  downToggle () {
    
  },
 
  setChecked(taskId, setChecked) {
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.update(taskId, { $set: { checked: setChecked} });
  },
 
});