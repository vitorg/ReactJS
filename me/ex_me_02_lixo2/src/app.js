/** @jsx React.DOM */

var InsertText = React.createClass({
    handleChange1: function() {
        this.props.onUserInput1(
            this.refs.filterTextInput1.getDOMNode().value
        );
    },
    handleChange2: function() {
        this.props.onUserInput2(
            this.refs.filterTextInput2.getDOMNode().value
        );
    },
    render: function() {
        return (
            <form style={{border: '1px solid green', padding: '10px', margin: '10px'}}>
                <p style={{color: 'green'}}>InsertText</p>
                <span>Insert your text: </span>
                <p><strong>input_1:</strong>
                    <input
                        type="text"
                        placeholder={this.props.data.placeholders.placeholderInput1}
                        value={this.props.filterText1}
                        ref="filterTextInput1"
                        onChange={this.handleChange1}
                    />
                </p>
                <p><strong>input_2:</strong>
                    <input
                        type="text"
                        placeholder={this.props.data.placeholders.placeholderInput2}
                        value={this.props.filterText2}
                        ref="filterTextInput2"
                        onChange={this.handleChange2}
                    />
                </p>
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
                    data={this.props.data}
                />
                <ShowText
                    filterText1={this.state.filterText1}
                    filterText2={this.state.filterText2}
                />
            </div>
        );
    }
});

var data = {
    placeholders: {
        placeholderInput1: 'Text 1',
        placeholderInput2: 'Text 2',    
    }
};

React.render(<Container data={data} />, document.getElementById('content') );
