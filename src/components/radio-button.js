import React from 'react';
import PropTypes from 'prop-types';

//**********************************************************************
export default class RadioButton extends React.Component {
    //******************************************************************
    static propTypes = {
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        id: PropTypes.string,
        style: PropTypes.object
    };

    //******************************************************************
    static defaultProps = {
        style: {}
    };

    //******************************************************************
    handleKeyUp = (e) => {
        // if it is the spacebar or Enter, swallow it and toggle
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onClick();
        }
    };

    //******************************************************************
    handleKeyDown = (e) => {
        // Swallow a spacebar or Enter, handled in this.handleKeyUp
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
        }
    };

    //******************************************************************
    render() {
        let wrapperStyle = {
            display: "flex",
            alignItems: "center",
            ...this.props.style
        };

        const radioButtonStyle = {
            backgroundColor: "#F8F8F8",
            position: "relative",
            border: "1px solid #B0BEC5",
            borderRadius: "50%",
            width: "33px",
            height: "33px",
            minWidth: "33px",
            minHeight: "33px",
            marginRight: "10px"
        };

        const dotStyle = {
            position: "absolute",
            boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.55)",
            borderRadius: "50%",
            backgroundColor: "black",
            width: "15px",
            height: "15px",
            minWidth: "15px",
            minHeight: "15px",
            top: "9px",
            left: "9px"
        };

        let selectedDiv = null;
        if (this.props.selected) {
            selectedDiv = <div className="selected" style={dotStyle}/>
        }

        return (
          <div className='radio-choice' style={wrapperStyle} onClick={this.props.onClick}>
              <div
                id={this.props.id}
                tabIndex="0"
                role="radio"
                aria-checked={this.props.selected}
                style={radioButtonStyle}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}>
                  {selectedDiv}
              </div>
              <label
                htmlFor={this.props.id}
                style={{cursor: 'inherit'}}>
                  {this.props.children}
              </label>
          </div>
        );
    }
}
