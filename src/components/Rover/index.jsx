import React, { Component } from "react";
import { TimelineMax } from "gsap/TweenMax";
import PropTypes from "prop-types";

import "../../css/Assistant.css";

class Assistant extends Component {
  constructor(props) {
    super(props);
    // reference to the DOM node
    this.cubicTimeline = null;
    // reference to the animation
    this.wingsTimeline = null;
  }

  componentWillMount() {
    this.tipsTimer = null;
    this.temporaryTips = null;
  }

  componentDidMount() {
    //initialize cubic movement by value
    if (this.props.info.roaming === 1 && this.cubicTimeline === null) {
      this.cubicMovement();
    }
    //Initializing wing movement
    this.wingsMovement();
  }
  componentDidUpdate() {
    //re-initialize cubic movement by value
    if (this.props.info.roaming === 1 && this.cubicTimeline === null) {
      this.cubicMovement();
    }

    //set timer to clear the normal tips
    // if (this.props.info.tips !== null) {
    //   this.temporaryTips = this.props.info.tips;
    //   clearTimeout(this.tipsTimer);
    //   this.tipsTimer = setTimeout(this.clearTips, 2000);
    // }
  }

  // clearTips() {
  //   this.temporaryTips = null;
  // }

  componentWillUnmount() {
    clearTimeout(this.tipsTimer);
  }

  getCubicClass() {
    if (this.props.info.roaming === 1) {
      return "going-crazy";
    } else {
      return "idle";
    }
  }

  getTips() {
    if (this.props.info.tips !== null) {
      return this.props.info.tips;
    } else {
      return this.props.info.persistent_tips;
    }
  }

  render() {
    const styles = {
      cubicContainerStyle: {
        display: this.props.info.visibility ? "block" : "none"
      }
    };

    const { onTickle } = this.props;

    return (
      <div
        className={"cubic-container cubic-container-" + this.getCubicClass()}
        ref={c => (this.cubicContainer = c)}
        style={styles.cubicContainerStyle}
      >
        <div
          className="cubic"
          ref={c => (this.cubic = c)}
          style={{
            top: this.props.info.positionTop,
            left: this.props.info.positionLeft
          }}
          onClick={() => onTickle(this.props.feedback)}
        >
          <div className="cubic-grid">
            <div className="cubic-body" />
            <div className="cubic-left-wing" ref={c => (this.cubicWing1 = c)} />
            <div
              className="cubic-right-wing"
              ref={c => (this.cubicWing2 = c)}
            />
          </div>
        </div>
      </div>
    );
  }

  cubicMovement() {
    const { roaming } = this.props.info;
    const { cubicContainer, cubic } = this;

    this.cubicTimeline = new TimelineMax({
      onComplete: () =>
        roaming === 1 ? this.cubicMovement() : this.resetPosition()
    });

    this.cubicTimeline.to(cubic, 1.5, {
      top: this.randomHeight(cubicContainer),
      left: this.randomWidth(cubicContainer),
      ease: "Back.easeOut"
    });
  }

  resetPosition() {
    const { positionTop, positionLeft } = this.props.info;
    const { cubicContainer, cubic } = this;

    this.cubicTimeline = new TimelineMax({
      onComplete: () => (this.cubicTimeline = null)
    });
    this.cubicTimeline.to(cubic, 1, {
      top: positionTop,
      left: positionLeft,
      ease: "Back.easeOut"
    });
  }
  wingsMovement() {
    const { cubicWing1, cubicWing2 } = this;
    this.wingsTimeline = new TimelineMax({
      onComplete: () => this.wingsTimeline.restart()
    });
    this.wingsTimeline.to([cubicWing1], 1, {
      skewY: 10,
      ease: "Elastic.easeOut"
    });
    this.wingsTimeline.to([cubicWing2], 1, {
      skewY: -10,
      ease: "Elastic.easeOut"
    });
  }

  randomHeight(container) {
    var height = container.offsetHeight;
    var randomHeight = 200 + Math.floor(Math.random() * (height - 20));
    return randomHeight;
  }
  randomWidth(container) {
    var width = container.offsetWidth;
    var randomWidth = Math.floor(Math.random() * (width - 70));
    return randomWidth;
  }
}

Assistant.defaultProps = {
  info: {
    visibility: 1,
    roaming: 0,
    tips: null,
    persistent_tips: null
  }
};

Assistant.propTypes = {
  info: PropTypes.object
};
export default Assistant;
