import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchEngineData,
  updatePlateauState
} from "../../actions/spaceEngineActions";

import DialogBox from "../DialogBox";
import "../../css/SpaceEngine.css";

class SpaceEngine extends Component {
  componentWillMount() {
    this.props.fetchEngineData();
  }

  startOperation = feedback => {
    switch (feedback.action) {
      case "send_rovers_wo_animation":
        // output string doesn't need to be re-initialized as
        // it is the result of the rovers!
        var rovers = [];

        // break input lines into an array with actions
        var orders = feedback.text.split("\n");
        // get plateau's size
        var plateau = orders[0].split(" ");

        // while more lines exist, add rovers
        for (let i = 1; i < orders.length; i = i + 2) {
          // assign new hover
          let currentRover = rovers.length;

          let newHover = orders[i].split(" ");
          // check if input is correct
          if (newHover.length === 3) {
            rovers.push(newHover);
            this.updateRovers(rovers);

            // move hover
            let movement = orders[i + 1].split("");
            for (let j = 0; j < movement.length; j++) {
              rovers[currentRover] = this.handleMovement(
                plateau,
                rovers[currentRover],
                movement[j]
              );
              this.updateRovers(rovers);

              // check if the handleMovement returned an error
              if (rovers[currentRover].length !== 3) {
                break;
              }
            }
          } else {
            console.log("Error: Invalid Rover: " + newHover);
            rovers.push([-1, -1, "S", "Error: Invalid Rover!"]);
            this.updateRovers(rovers);
          }
        }

        break;
      default:
        break;
    }
  };

  updateRovers(roversArray) {
    // We could keep the output's previous state and update only the last rover.
    // However, looping through every rover every time increases this function's versatility!
    // As a result, this function can be used even if the rovers move without an order

    // Join both dimensions of the array
    let newPlateauState = roversArray.join("\n");
    // Replace comma separator
    newPlateauState = newPlateauState.replace(/,/g, " ");

    this.props.updatePlateauState(roversArray, newPlateauState);
  }

  handleMovement(plateau, rover, movement) {
    var orientation = ["W", "S", "E", "N"];
    var orientationTrans = { W: 0, S: 1, E: 2, N: 3 };

    switch (movement) {
      case "L":
        // change the orientation by +1 (based on the orientation array, anticlockewise)
        rover[2] =
          orientation[
            (orientation.length + (orientationTrans[rover[2]] + 1)) % 4
          ];
        break;
      case "R":
        // change the orientation by -1 (based on the orientation array, anticlockewise)
        rover[2] =
          orientation[
            (orientation.length + (orientationTrans[rover[2]] - 1)) % 4
          ];
        break;
      case "M":
        // going towards N or E or S or W
        let currentOrientation = rover[2];
        // moving on X or on Y axis
        let axis = orientationTrans[currentOrientation] % 2;
        // explanation:
        // if it is moving West, then the translation is 0 and the axis is 0. We are moving our 0 axis by 0-0-1
        // if it is moving South, then the translation is 1 and the axis is 1. We are moving our 1 axis by 1-1-1
        // if it is moving East, then the translation is 2 and the axis is 0. We are moving our 0 axis by 2-0-1
        // if it is moving North, then the translation is 3 and the axis is 1. We are moving our 1 axis by 3-1-1
        // we also want this to be string so that we can keep manipulate it with replace and split
        rover[axis] =
          "" +
          (parseInt(rover[axis]) +
            (orientationTrans[currentOrientation] - axis - 1));

        // Check if it got out of bounds, also we need to keep X and Y values so that we
        // can retrieve it
        if (rover[axis] < 0 || rover[axis] > plateau[axis]) {
          console.log("Error: Rover fell off the cliff: " + rover);
          rover[3] = "Error: Rover fell off the plateau";
        }
        break;
      default:
        break;
    }
    return rover;
  }
  render() {
    return (
      <div className="main-layout-grid">
        <div className="main-container">{/* <RoverHandler /> */}</div>

        {/* INPUT BOX */}
        <div className="left-dialog">
          {
            <DialogBox
              key="input-dialog"
              container_class="dialog-box color-pallete2 shadow-pallete1"
              onTickle={this.startOperation}
              header="Input"
              body={[
                {
                  value: "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM",
                  type: "textbox",
                  name: "commands"
                }
              ]}
              footer={[
                {
                  text: "Start",
                  type: "submit",
                  action: "send_rovers",
                  target_name: "commands"
                },
                {
                  text: "Skip Animation",
                  type: "submit",
                  action: "send_rovers_wo_animation",
                  target_name: "commands"
                }
              ]}
            />
          }
        </div>

        {/* OUTPUT BOX */}
        <div className="right-dialog">
          {
            <DialogBox
              key="output-dialog"
              container_class="dialog-box color-pallete2 shadow-pallete1"
              header="Output"
              body={[
                {
                  text: this.props.output
                }
              ]}
            />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  output: state.spaceEngineReducer.output,
  rovers: state.spaceEngineReducer.rovers
});

export default connect(
  mapStateToProps,
  { fetchEngineData, updatePlateauState }
)(SpaceEngine);
