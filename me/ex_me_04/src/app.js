/** @jsx React.DOM */

var Message = function(msg) {
    return msg;
};
var Container = React.createClass({
    getInitialState: function() {
        return {
            input1: 123
        };
    },
    setInput1: function(value) {
        this.setState({
            input1: value
        });
    },
    propTypes: {
        //You can declare that a prop is a specific JS primitive. By default, these are all optional (to be required, use ".isRequired" at the end).
        optionalArray: React.PropTypes.array,
        optionalBool: React.PropTypes.bool,
        optionalFunc: React.PropTypes.func,
        optionalNumber: React.PropTypes.number,
        optionalObject: React.PropTypes.object,
        optionalString: React.PropTypes.string,

        // You can ensure that your prop is limited to specific values by treating it as an enum.
        optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

        // An object that could be one of many types (to be required, use ".isRequired" at the end)
        optionalUnion: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.instanceOf(Message)
        ]),

        // An array of a certain type
        optionalArrayOfNumbers: React.PropTypes.arrayOf(React.PropTypes.number),

        // An object with property values of a certain type
        optionalObjectOfNumbers: React.PropTypes.objectOf(React.PropTypes.number),

        // An object taking on a particular shape
        optionalObjectWithShape: React.PropTypes.shape({
            color: React.PropTypes.string,
            fontSize: React.PropTypes.number
        }),

        // You can chain any of the above with `isRequired` to make sure a warning is shown if the prop isn't provided.
        requiredFunc: React.PropTypes.func.isRequired,
    },

    render: function() {
        return (
            <div style={{border: '1px solid gray', padding: '10px'}}>
                <p style={{color: 'gray'}}>{"Go to \"React.render(<Container\" and comment \"requiredFunc={function(){}}\" and others."}</p>
                <p>{"Then refresh the page and see the console warnings"}</p>
                <p style={{color: 'red'}}>
                    <strong>{"To see the warnings is needed the lib \"react-with-addons-0.13.3.js\" instead of \"react-0.13.3.js\""}</strong>
                </p>
            </div>
        );
    }
});


React.render(<Container
        optionalArray={[1,2]}
            //optionalArray={123}
        //optionalBool={true}
            optionalBool={"true"}
        optionalFunc={function(){}}
            //optionalFunc={{}}
        optionalNumber={123}
            //optionalNumber={"123"}
        optionalObject={{}}
            //optionalObject={false}
        optionalString={"string"}
            //optionalString={123}
        optionalEnum={'News'}
            //optionalEnum={'Other'}

        optionalUnion={new Message("Hello")}
            //optionalUnion={Message}
            //optionalUnion={function(){}}
            //optionalUnion={false}

        optionalArrayOfNumbers={[1,2,3]}
            //optionalArrayOfNumbers={['a','b','c']}

        optionalObjectOfNumbers={{a:1,b:2,c:3}}
            //optionalObjectOfNumbers={{a:'1',b:2,c:3}}

        optionalObjectWithShape={{color:'red',fontSize:11}}
            //optionalObjectWithShape={{color:'red',fontSize:'11'}}

        requiredFunc={function(){}}
            //
    />, 
    document.getElementById('content') );