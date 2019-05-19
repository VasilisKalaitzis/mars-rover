import React, { Component } from "react";
import Rover from "../Rover";

class Layout extends Component {
  // this is a helper and should be in a util directory
  initializeArray(columns, rows) {
    // create an array filled with 0
    var newArray = new Array(rows);
    var columnInstance = new Array(columns);
    for (var i = 0; i < columns; i++) {
      columnInstance[i] = 0;
    }
    for (var i = 0; i < rows; i++) {
      newArray[i] = columnInstance.slice(0);
    }
    return newArray;
  }

  renderContent() {
    const { columns, rows, rovers } = this.props;

    var plateauMap = this.initializeArray(columns + 1, rows + 1);
    // fill the spaces occupied by rovers
    for (let i = 0; i < rovers.length; i++) {
      // check if the rover is still alive
      if (rovers[i].length === 3) {
        plateauMap[rows - rovers[i][1]][rovers[i][0]] = 1;
      }
    }

    const styles = {
      width: 100 / (this.props.columns + 1) + "%",
      height: 100 / (this.props.rows + 1) + "%"
    };

    return (
      <React.Fragment>
        {plateauMap.map(row => {
          return row.map((block, index) => {
            return (
              <div className="inline-block" style={styles}>
                <div
                  className="plateau-block color-pallete3 block-padding fill-height"
                  key={"plateau-block-" + index}
                >
                  {block === 1 && <Rover />}
                </div>
              </div>
            );
          });
        })}
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className={"plateau-container " + this.props.container_class}>
        {this.renderContent()}
      </div>
    );
  }
}

export default Layout;
