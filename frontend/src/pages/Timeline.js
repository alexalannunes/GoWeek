import React, { Component } from 'react';
import socket from 'socket.io-client';
import api from '../services/api';

import './Timeline.css';
import twitterLogo from '../twitter.svg';

import Tweet from '../components/Tweet';

class Timeline extends Component {
  state = {
    newTweet: '',
    tweets: []
  };

  handleTextareaChange = event => {
    this.setState({ newTweet: event.target.value })
  };

  handleNewTweet = async event => {
    if (event.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem('@GoTwiiter:username');

    await api.post('/tweets', {content, author})

    this.setState({newTweet: ''});    
  }

  subscribeToEvent = () => {
    const io = socket('http://localhost:3000');

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets]});
    });
    io.on('like', data => {
      this.setState({ tweets: this.state.tweets.map(tweet => 
        tweet._id === data._id ? data : tweet
      )});
    });
  }

  async componentDidMount() {
    this.subscribeToEvent();
    const response = await api.get('/tweets');
    this.setState({ tweets: response.data });
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <img src={twitterLogo} alt="Alex" />
        <form>
          <textarea 
            value={this.state.newTweet}
            onChange={this.handleTextareaChange}
            onKeyDown={this.handleNewTweet}
            placeholder="Meu tweet"
          ></textarea>
        </form>

        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Timeline;