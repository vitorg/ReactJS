/** @jsx React.DOM */

var Input = React.createClass({
    handleChange: function() {
        this.props.setStateInputsIndexVal(
            this.props.index, this.refs.input.getDOMNode().value
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
        var List = [];
        for(var i=0; i<this.props.inputs.length; i++) {
            List.push(
                (function() {
                    return (
                        <Input 
                            placeholder={this.props.placeholders[i].text}
                            value={this.props.inputs[i].value}
                            index={i}
                            key={i}
                            setStateInputsIndexVal={this.props.setStateInputsIndexVal}
                        />
                    );
                }).call(this)
            );
        } //note: the "call(this)" override the 'this' of the anonimous function with the external 'this'

        return (
            <form style={{border: '1px solid green', padding: '10px', margin: '10px'}}>
                <p style={{color: 'green'}}>InsertText</p>
                <span>Insert your text: </span>
                {List}
            </form>
        );
    }
});

var Text = React.createClass({
    render: function() {
        return (
            <p><strong>input_{this.props.index}:</strong> <span>{this.props.value}</span></p>
        );
    }
});

var ShowText = React.createClass({
    render: function() {
        var i = 0;
        var List = this.props.inputs.map(function(input) {
            return (
                <Text key={++i} index={i} value={input.value}/>
            );
        });
        return (
            <div style={{border: '1px solid red', padding: '10px', margin: '10px'}}>
                <p style={{color: 'red'}}>ShowText</p>
                <p>You inserted:</p>
                {List}
            </div>
        );
    }
});


var Container = React.createClass({
    getInitialState: function() {
        var arr = [];
        for(var i=0; i< 5; i++)
            arr.push({value: ''});
        return {
            inputs: arr
        };
    },
    getDefaultProps: function() {
        var arr = [];
        for(var i=0; i< 5; i++)
            arr.push({text: 'Text ' + (i+1)});
        return {
            placeholders: arr
        };
    },
    setStateInputsIndexVal: function(index, value) {
        var arrTmp = this.state.inputs;
        arrTmp[index].value = value;
        this.setState({
            inputs: arrTmp
        });
    },

    render: function() {
        return (
            <div style={{border: '1px solid gray', padding: '10px'}}>
                <p style={{color: 'gray'}}>Container</p>
                <InsertText
                    inputs={this.state.inputs}
                    setStateInputsIndexVal={this.setStateInputsIndexVal}
                    placeholders={this.props.placeholders}
                />
                <ShowText
                    inputs={this.state.inputs}
                />
            </div>
        );
    }
});


React.render(<Container/>, document.getElementById('content') );