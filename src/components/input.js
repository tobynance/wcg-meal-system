import React from 'react';
import PropTypes from 'prop-types';

const inputBackground = "white";
const inputBackgroundDisabled = "#D9D9D9";
const inputBottomBorderDisabled = "#9E9E9E";
const inputBorder = "#B0BEC5";


//**********************************************************************
export default class Input extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        enabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        ariaLabel: PropTypes.string,
        placeholder: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        enabled: true,
        readOnly: false,
        ariaLabel: null,
        style: {}
    };

    //******************************************************************
    getStyle = () => {
        const style = {
            backgroundColor: inputBackground,
            cursor: "text",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: inputBorder,
            height: "30px",
            padding: ".25em 22px .25em 1em",
            ...this.props.style
        };

        if (!this.props.enabled || this.props.readOnly) {
            style.background = inputBackgroundDisabled;
            style.borderBottomColor = inputBottomBorderDisabled;
            style.cursor = "not-allowed";
        }

        return style;
    };

    //******************************************************************
    render() {
        const style = this.getStyle();

        const extraInputProperties = {};
        if (!this.props.enabled) {
            extraInputProperties.disabled = "disabled";
        }
        if (this.props.readOnly) {
            extraInputProperties.readOnly = "readOnly";
        }

        return (
          <input
            type="text"
            id={this.props.id}
            name={this.props.name}
            aria-label={this.props.ariaLabel}
            placeholder={this.props.placeholder}
            style={style}
            {...extraInputProperties} />
        );
    }
}
