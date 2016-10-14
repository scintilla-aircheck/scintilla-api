import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { deployments } from './actions/deployments'
import { addReading } from './actions/readings'

import 'babel-polyfill';

import Root from './containers/root.jsx'
import configureStore from './store/configureStore'

document.getElementById('loading').style.display = 'none';

const store = configureStore();

render(
    <Provider store={store}>
        <Root />
    </Provider>,
  document.getElementById('root')
);

store.dispatch(deployments());

var socket = null;
function createSocket() {
    socket = new WebSocket('ws://' + window.location.host + '/socket');
    if (socket) {
        socket.onmessage = function(e) {
            console.log(e.data);
            store.dispatch(addReading(JSON.parse(e.data)));
            //store.dispatch({
            //    type: 'ADD_READING',
            //    reading: JSON.parse(e.data)
            //})
        };
        // When the backend reloads, the connection will be lost.
        // This will reopen it after a bit of a cooldown period.
        socket.onclose = function(e) {
            if (e.code === 1006) {
                window.setTimeout(createSocket, 2000);
            }
        };
    }
}
createSocket();

/*store.dispatch({
    type: 'DEPLOYMENTS',
    payload: axios.get('http://localhost:8000/api/v1/deployments/')
});*/

//store.dispatch({
//    type: 'READINGS',
//    payload: axios.get('http://localhost:8000/api/v1/readings/?deployment_id=')
//}); // TODO get readings by deployment

/*
render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
*/


/*
var data = {
    deployments: [
        {
            name: 'Power Plant'
        },
        {
            name: 'Laser Factory'
        }
    ]
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.data};
    }

    componentDidMount() {
        console.log('Dashboard:: props.deployments:');
        console.log(this.props.data.deployments);
        //this.setState({data: this.props.data});
        console.log('Dashboard:: state.deployments:');
        console.log(this.state.data.deployments);
    }

    render() {
        return (
            <div className="dashboard">
                <div className="header_spacer"></div>
                <div className="header">
                    <Deployments deployments={this.state.data.deployments} />
                </div>
            </div>
        );
    }
}

class Deployments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {deployments: this.props.deployments};
    }

    componentDidMount() {
        console.log('Deployments:: props.deployments:');
        console.log(this.props.deployments);
        console.log('Deployments:: state.deployments:');
        console.log(this.state.deployments);
        //this.setState({deployments: this.props.deployments});
    }

    render() {
        var deploymentNodes = this.state.deployments.map(function(deployment) {
            return (
                <Deployment key={deployment.name} deployment={deployment}>

                </Deployment>
            )
        });
        return (
            <div className="deployments_list">
                {deploymentNodes}
            </div>
        );
    }
}

class Deployment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {deployment: this.props.deployment};
    }

    componentDidMount() {
        console.log('Deployment:: props.deployment:');
        console.log(this.props.deployment);
        console.log('Deployment:: state.deployment:');
        console.log(this.state.deployment);
        //this.setState({deployment: this.props.deployment});
    }

    render() {
        return (
            <div className="deployment">
                {this.state.deployment.name}
            </div>
        );
    }
}



render(<Dashboard data={data} />, document.getElementById('root'));

*/

/*
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:[]};
    }

    componentDidMount() {
        this.setState({data: data});
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
}

class CommentList extends React.Component {
    render() {
        var commentNodes = this.props.data.map(function(comment){
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            )
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

class CommentForm extends React.Component {
    render() {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
}

class Comment extends React.Component {
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
}

class App extends React.Component {
    render () {
        return (
            <CommentBox data={data} />,
            document.getElementById('content')
        );
    }
}

render(<CommentBox data={data} />, document.getElementById('root'));
*/