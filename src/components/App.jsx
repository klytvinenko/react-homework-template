import { Component } from "react";
import { Section } from "./Section";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics";
import React from 'react';
//import { Notification } from './Notification'; 

export class App extends Component {

    state = {
      good: 0,
      neutral: 0,
      bad: 0
    }

  handleFeedback = option => {
    this.setState(prevState => {
      return {
        [option] : prevState[option] + 1,
      };
    });
  };

  countTotalFeedback = () => {

    const {good, neutral, bad} = this.state

    return good + neutral + bad; 
  }

  countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = this.state
    const total = good + neutral + bad

    if (total === 0) {
      return 0;
    }
    return Math.round((good / total) * 100);
  }


  render() {
    const {good, neutral, bad} = this.state;
    const total = good + neutral + bad;
    
    return (
      <div>
        <Section title = {'Please leave feedback'}></Section>
        <FeedbackOptions options = {Object.keys(this.state)} onLeaveFeedback={this.handleFeedback}></FeedbackOptions>

        { total > 0 ? (
          <Section title={'Statistics'}>
          <Statistics
            good={good} 
            neutral={neutral} 
            bad={bad} 
            total={this.countTotalFeedback()} 
            positivePercentage={this.countPositiveFeedbackPercentage()}
          ></Statistics>
        </Section>
        ) : (
           //<Notification message={'There is no feedback'}></Notification>
           console.log("error")
        ) }
        
      </div>
    );
  }
}
