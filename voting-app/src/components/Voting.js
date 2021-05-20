import React, { Component } from "react";
import * as Ably from "ably";
import "./voting.css";
import Dashboard from './Dashboard';

let realTime = null;
let myVotingChannel= null;
class Voting extends Component {
  state = {
    cards: [
      { id: 1, name: "Before 10am", value: "barcelona" },
      { id: 2, name: "Between 12-2pm", value: "realMadrid" },
      { id: 3, name: "After 2pm", value: "juventus" },
    ],
    flipped: null,
  };

  componentDidMount(){
    realTime = new Ably.Realtime({ authUrl: "/publish" });
    realTime.connection.once("connected", () => {
       // create the channel object
       myVotingChannel = realTime.channels.get("Voting-App");
    });
  }
  clickHandler = (card) => {
    if (this.state.flipped) {
      return;
    }

    
      myVotingChannel.publish("vote", card.value, (err) => {
        console.log("err", err);
      });

    this.setState({
      flipped: card,
    });
  };
  componentWillUnmount(){
    realTime.connection.off();
  }
  render() {
    const hasVoted = !!this.state.flipped;
    return (
      <React.Fragment>
        <h1 className="voting-heading">What should be the timing for tomorrow's class?</h1>
        <div className="voting-main">
          {this.state.cards.map((card) => {
            return (
              <section key={card.id} className="card-container">
                <div
                  className={`card ${
                    this.state.flipped === card ? "flipped" : ""
                  } ${hasVoted ? "remove-mouse-pointer" : "pointer"}`}
                  onClick={() => this.clickHandler(card)}
                >
                  <div className="front">{card.name}</div>
                  <div className="back">Thanks for voting </div>
                </div>
              </section>
            );
          })}
        </div>
        <button className="refresh-btn" onClick={()=>this.setState({flipped:null})}>Vote Again</button>
        <p><strong>You can vote again by clicking this button to see this demo working.</strong></p>
        <Dashboard/>
      </React.Fragment>
    );
  }
}

export default Voting;