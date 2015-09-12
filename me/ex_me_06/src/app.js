/** @jsx React.DOM */


var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setTheInterval: function() {
    console.log("setTheInterval()");
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var TickTock = React.createClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function() {
    return {seconds: 0, order: 'asc'};
  },
  componentDidMount: function() {
    this.setTheInterval(this.tick, 1000); // Call a method on the mixin
  },
  tick: function() {
    console.log("tick()");
    if( this.state.seconds > 5)
        this.state.order = 'desc';

    var value = this.state.order == 'asc' ? 1 : -1;
    this.setState({seconds: this.state.seconds + value});

    if( this.state.seconds == 0)
        this.state.order = 'asc';


  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

React.render(<TickTock />, document.getElementById('content') );