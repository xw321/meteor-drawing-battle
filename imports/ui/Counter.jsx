import React, { Component } from "react";


let action = [
  "10 seconds left",
  "9 seconds left",
  "8 seconds left",
  "7 seconds left",
  "6 seconds left",
  "5 seconds left",
  "4 seconds left",
  "3 seconds left",
  "2 seconds left",
  "1 seconds left",
  "Times up"
];
let n = action.length;


export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.timer = this.timer.bind(this);
    this.getText = this.getText.bind(this);
    this.state = {
      intervalId: 0,
      currentCount: 0,
      verb: "10 seconds left"
    };
  }

  componentDidMount() {
    var intervalId = setInterval(this.timer, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
    console.log("mount");
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
    this.setState({ currentCount: 0 });
  }

  timer() {
    // setState method is used to update the state
    //console.log("timer");
    if (this.state.currentCount === n - 1) {
    
      this.setState({ currentCount: n - 1 });
      
      let text0 = this.getText();
      this.setState({ verb: text0 });
    } else {
      this.setState({ currentCount: this.state.currentCount + 1 });
      let text0 = this.getText();
      this.setState({ verb: text0 });
    }
  }

  getText() {
    let index = this.state.currentCount;
    return action[index];
    
  }

  render() {
    return (
      
        

      <div>
        <h2 className="text-center subtitle">
              
          <span className="text-center subtitle2 bg-dark">
                &nbsp;{this.state.verb}&nbsp;
          </span>
        </h2>{" "}
      </div>

          
        
        
    );
  }
}


