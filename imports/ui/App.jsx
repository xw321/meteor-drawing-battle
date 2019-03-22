import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import NavBar from "./NavBar.jsx";
import Top from "./Top.jsx";
//import CanvasPaint from "./CanvasPaint.jsx";
import Players from "./Players.jsx";
import { withTracker } from "meteor/react-meteor-data";
import "../../client/main.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div div className="title" col-md-12>
      <div>
        
        <h1>Drawing Battle</h1>
        
      </div>

      {Meteor.user() ? <Players /> : 
        <div>
          <div className="frontText">
          Try your drawing skills by imitating the sketch
          </div>
          
          <p><img src={"imgs/6.jpeg"} height="85%" width="100%" alt="frontpage"/></p>
          <div className="frontText2">
          By Xun and Yan
          </div>

        </div>}
    
    </div>

  );
};

// const PlayComponent = () => {
//   return (
//     <div>
//       <div>
//         <h1>Painting Battle Play</h1>
//       </div>

//       {Meteor.user() ? <CanvasPaint /> : <div>Please login to play!</div>}
//     </div>
//   );
// };

const TopComponent = () => (
  <div>
    <h2>Top Players</h2>
    {<Top />}
  </div>
);

const NotFoundPage = () => (
  <div>
    <h2>Opps...Page not found</h2>
    <div />
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            {/* <Route exact path="/play/" component={PlayComponent} /> */}
            <Route exact path="/top" component={TopComponent} />
            <Route component={NotFoundPage} />
          </Switch>
          <br />
        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);
