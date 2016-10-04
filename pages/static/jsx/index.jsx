import React from 'react';
import {render} from 'react-dom';
import 'babel-polyfill';


//import { browserHistory } from 'react-router'
//import { syncHistoryWithStore } from 'react-router-redux'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Root from './components/index.jsx'
import configureStore from './store/configureStore'
//import rootReducer from './reducers'
import axios from 'axios'


document.getElementById('loading').style.display = 'none';

const store = configureStore();
//console.log('rootReducer');
//console.log(rootReducer());
//console.log('END');
//const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <Root />
    </Provider>,
  document.getElementById('root')
);

store.dispatch({
    type: 'DEPLOYMENTS',
    payload: axios.get('http://192.168.7.55:8000/api/v1/deployments/')
});

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