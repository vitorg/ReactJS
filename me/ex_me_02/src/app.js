/** @jsx React.DOM */

var Input = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.refs.input.getDOMNode().value
        );
    },
    render: function() {
        return(
            <p><strong>{this.props.inputLabel}</strong>
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    ref="input"
                    onChange={this.handleChange}
                />
            </p>
        );
    }
});

var InsertText = React.createClass({
    render: function() {
        return (
            <form style={{border: '1px solid green', padding: '10px', margin: '10px'}}>
                <p style={{color: 'green'}}>InsertText</p>
                <span>Insert your text: </span>
                <Input 
                    placeholder={this.props.placeholders.input1}
                    value={this.props.filterText1}
                    onUserInput={this.props.onUserInput1}
                />
                <Input 
                    placeholder={this.props.placeholders.input2}
                    value={this.props.filterText2}
                    onUserInput={this.props.onUserInput2}
                />
            </form>
        );
    }
});

var ShowText = React.createClass({
    render: function() {
        return (
            <div style={{border: '1px solid red', padding: '10px', margin: '10px'}}>
                <p style={{color: 'red'}}>ShowText</p>
                <p>You inserted:</p>
                <p><strong>input_1:</strong> <span>{this.props.filterText1}</span></p>
                <p><strong>input_2:</strong> <span>{this.props.filterText2}</span></p>
            </div>
        );
    }
});


var Container = React.createClass({
    getInitialState: function() {
        return {
            filterText1: '',
            filterText2: ''
        };
    },
    getDefaultProps: function() {
        return {
            placeholders: {
                input1: 'Text 1',
                input2: 'Text 2',    
            }
        };
    },

    handleUserInput1: function(filterText1) {
        this.setState({
            filterText1: filterText1
        });
    },
    handleUserInput2: function(filterText2) {
        this.setState({
            filterText2: filterText2
        });
    },

    render: function() {
        return (
            <div style={{border: '1px solid gray', padding: '10px'}}>
                <p style={{color: 'gray'}}>Container</p>
                <InsertText
                    filterText1={this.state.filterText1}
                    filterText2={this.state.filterText2}
                    onUserInput1={this.handleUserInput1}
                    onUserInput2={this.handleUserInput2}
                    placeholders={this.props.placeholders}
                />
                <ShowText
                    filterText1={this.state.filterText1}
                    filterText2={this.state.filterText2}
                />
            </div>
        );
    }
});


React.render(<Container/>, document.getElementById('content') );