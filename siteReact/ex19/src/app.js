/** @jsx React.DOM */

/*var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText, index) {
      return <li key={index + itemText}>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

React.render(<TodoApp />, document.getElementById('content'));
*/

/*
 <input
                    value={this.props.changesOverTime}
                    onChange={this.updateChanges}
                    ref="input"
               />
*/
var BottomElement = React.createClass({
     updateChanges: function() {
          this.props.setChanges(
               this.refs.input.getDOMNode().value
          );
     },

    render: function() {
        return (
            <div>
                <p><label>{this.props.label}</label>{' '}</p>
                <p><input 
                    placeholder={this.props.placeholder}
                    value={this.props.changesOverTime}
                    onChange={this.updateChanges}
                    ref="input"
                /></p>
            </div>
        );
    }
});



var TopElement = React.createClass({
    getInitialState: function() {
        return {
            elementThatChangesOverTime: ''
        };
    },
    setChangesOverTime(changes) {
        this.setState({
            elementThatChangesOverTime: changes
        });
    },

    render: function() {
        return (
            <div>
                <BottomElement 
                    label={this.props.data.labelForBottom}
                    placeholder={this.props.data.placeholderForBottom}
                    changesOverTime={this.state.elementThatChangesOverTime}
                    setChanges={this.setChangesOverTime}
                />
                <p>The value insert was: "{this.state.elementThatChangesOverTime}"</p>
            </div>
        );
    }
 });

var externalData = {labelForBottom: "Label", placeholderForBottom: 'value..'};
React.render(<TopElement data={externalData} />, document.getElementById('content'));