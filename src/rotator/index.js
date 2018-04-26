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
    currentIndex: 0,
  };

  updateInterval = undefined;

  render() {
    return (
      <div className={classnames("text", this.props.className)}>
        <p>Your personal </p>
        <p>{this.renderWords(this.props.words, this.state.currentIndex)}</p>
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
    let { currentIndex } = this.state;
    const maxLength = this.props.words.length;
    currentIndex = (currentIndex + 1) % maxLength;

    this.setState({
      currentIndex,
    });
  };

  renderWords(words = [], currentIndex = 0) {
    const previousIndex = (currentIndex - 1) % words.length;
    return words.map((word, index) => {
      return (
        <span
          className={classnames("word", {
            "current-word": index === currentIndex,
          })}
          key={index}
        >
          {this.renderWord(word, index, currentIndex, previousIndex)}
        </span>
      );
    });
  }

  renderWord(word = "", wordIndex, currentIndex, previousIndex) {
    const letterClass =
      wordIndex === previousIndex
        ? "out"
        : wordIndex === currentIndex
          ? "in"
          : undefined;
    console.log("letterClass: ", letterClass);
    const things = {
      out: {
        animationClass: "out",
        getDelay: index => index * 80,
      },
      in: {
        animationClass: "in",
        getDelay: index => 340 + index * 80,
        className: "behind",
      },
      default: {
        animationClass: "out",
        getDelay: () => 0,
      },
    };

    const letterInfo =
      wordIndex === previousIndex
        ? things.out
        : wordIndex === currentIndex
          ? things.in
          : things.default;

    return word.split("").map((letter, index) => {
      return (
        <Letter
          key={index}
          letter={letter}
          delay={letterInfo.getDelay(index)}
          className={letterInfo.className}
          animationClass={letterInfo.animationClass}
        />

        // <span className={classnames("letter", letterClass)} key={index}>
        //   {letter}
        // </span>
      );
    });
  }
}

class Letter extends Component {
  static displayName = "Letter";

  static propTypes = {
    letter: PropTypes.string.isRequired,
    className: PropTypes.string,
    animationClass: PropTypes.string,
    delay: PropTypes.number,
  };

  state = {
    animationClass: undefined,
  };

  render() {
    const className = this.state.animationClass
      ? this.state.animationClass
      : this.props.className;

    return (
      <span className={classnames("letter", className)}>
        {this.props.letter}
      </span>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.className !== prevProps.className) {
      this.updateClassName(this.props);
    }
  }

  componentDidMount() {
    this.updateClassName(this.props);
    // setTimeout(() => {
    //   console.log("applying class: ", this.props.className);
    //   this.setState({
    //     animationClass: this.props.className,
    //   });
    // }, this.props.delay);
  }

  updateClassName(props = this.props) {
    setTimeout(() => {
      console.log("applying animationClass: ", props.animationClass);
      this.setState({
        animationClass: props.animationClass,
      });
    }, props.delay);
  }
}

export default TextRotator;
