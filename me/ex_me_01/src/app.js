/** @jsx React.DOM */

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