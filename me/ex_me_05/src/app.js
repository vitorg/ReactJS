/** @jsx React.DOM */


var Input = React.createClass({
    getDefaultProps: function() {
        return {
            defaultValue: 'the default value'
        };
    },
    setInput: function() {
        this.props.setInput(
            this.refs.input.getDOMNode().value
        );
    },

    render: function() {
        return (
            <input defaultValue={this.props.defaultValue} placeholder={this.props.placeholder} ref="input" onChange={this.setInput} />
        );
    }
});

var Container = React.createClass({
    getInitialState: function() {
        return {
            input: ''
        };
    },
    setInput: function(value) {
        this.setState({
            input: value
        });
    },

    render: function() {
        return (
            <div>
                <Input input={this.state.input} setInput={this.setInput} />
                <p>{this.state.input}</p>
            </div>
        );
    }
});


React.render(<Container />, document.getElementById('content') );