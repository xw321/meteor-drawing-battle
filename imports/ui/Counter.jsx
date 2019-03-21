import React, { Component } from "react";

let n = 15;

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.timer = this.timer.bind(this);
    this.state = {
      intervalId: 0,
      currentCount: 0,
      verb: "Start!"
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

      let text0 = "Time is up!";
      this.setState({ verb: text0 });
    } else {
      this.setState({ currentCount: this.state.currentCount + 1 });
      let text0 = (n - this.state.currentCount).toString() + "  seconds left";
      this.setState({ verb: text0 });
    }
  }

  render() {
    return (
      <div>
        <h2 className="text-center subtitle">
          <span className="text-center subtitle2 bg-dark text-light">
            &nbsp;{this.state.verb}&nbsp;
          </span>
        </h2>{" "}
      </div>
    );
  }
}
