// Task component - represents a single todo item
Task = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },
 
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
  },
 
  deleteThisTask() {
    Meteor.call("removeTask", this.props.task._id);
  },

  upvote() {
    Meteor.call("upvoteTask", this.props.task._id);
  },

  downvote() {
    Meteor.call("downvoteTask", this.props.task._id);
  },

  upToggle() {
    Meteor.call("upToggle", this.props.task._id);
  },

  downToggle() {
    Meteor.call("downToggle", this.props.task._id);
  },

  togglePrivate() {
    Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
  },
 
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    // Add "checked" and/or "private" to the className when needed
    const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
      (this.props.task.private ? "private" : "");
 
    /*
    Temporarily removed code from below:
                <!--input
                type="checkbox"
                readOnly={true}
                checked={this.props.task.checked}
                onClick={this.upToggle}/ -->
            <!-- span className="delete">Upvote</span -->

            <!--input

                type="checkbox"
                readOnly={true}
                checked={this.props.task.checked}
                onClick={this.downToggle}/>
            <span className="delete">Downvote</span -->

    */


    return (
      <li className={taskClassName}>

          <button onClick={this.deleteThisTask}> 
          &times;
        </button>


            <button onClick={this.upvote}>UPVOTE</button>
            <button onClick={this.downvote}>DOWNVOTE</button>
        
 
        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}         Score: {this.props.task.score}
        </span>

      </li>
    );
  }
});