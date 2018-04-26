import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./index.css";

class TextRotator extends Component {
  static displayName = "TextRotator";

  static propTypes = {
    className: PropTypes.string,
    updateIntervalTime: PropTypes.number,
  };

  static defaultProps = {
    updateIntervalTime: 4000,
  };

  state = {
    previousIndex: undefined,
    currentIndex: 0,
  };

  updateInterval = undefined;

  render() {
    return (
      <div className={classnames("text", this.props.className)}>
        <p>Your personal </p>
        <p>{this.renderWords(this.props.words)}</p>
      </div>
    );
  }

  componentDidMount() {
    setInterval(this.changeWord, this.props.updateIntervalTime);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  changeWord = () => {
    let { previousIndex, currentIndex } = this.state;
    const maxLength = this.props.words.length;
    previousIndex = (previousIndex + 1) % maxLength;
    currentIndex = (currentIndex + 1) % maxLength;

    this.setState({
      previousIndex,
      currentIndex,
    });
  };

  renderWords(words = []) {
    return words.map((word, index) => {
      return (
        <span
          className={classnames("word", {
            "current-word": index === this.state.currentIndex,
          })}
          key={index}
        >
          {this.renderWord(word, index)}
        </span>
      );
    });
  }

  renderWord(word = "", wordIndex) {
    const { previousIndex, currentIndex } = this.state;
    const letterClass =
      wordIndex === previousIndex
        ? "out"
        : wordIndex === currentIndex
          ? "in"
          : "behind";

    return word.split("").map((letter, index) => {
      return (
        <span className={classnames("letter", letterClass)} key={index}>
          {letter}
        </span>
      );
    });
  }
}

export default TextRotator;
