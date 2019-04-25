import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

//**********************************************************************
export default class Checkbox extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        checked: PropTypes.bool,
        onChange: PropTypes.func,
        enabled: PropTypes.bool,
        ariaLabel: PropTypes.string
    };

    static defaultProps = {
        id: null,
        name: null,
        enabled: true,
        ariaLabel: null,
        title: ""
    };

    state = {
        checked: false
    };

    //******************************************************************
    handleClick = () => {
        if (!this.isDisabled()) {
            const value = !this.isChecked();
            if (this.props.onChange) {
                this.props.onChange(value);
            }
            else {
                this.setState({checked: value});
            }
        }
    };

    //******************************************************************
    isDisabled = () => {
        // return bool indicating if disabled (this is not the same as unchecked!)
        return !this.props.enabled;
    };

    //******************************************************************
    isChecked = () => {
        // return a bool representing if we are checked or not
        if (this.props.checked == null) {
            return this.state.checked;
        }
        else {
            return this.props.checked;
        }
    };

    //******************************************************************
    isCheckedToString = () => {
        // return a string representing if we are checked or not
        if (this.isChecked()) {
            return "true";
        }
        return "false";
    };

    //******************************************************************
    isDisabledToString = () => {
        // return a string representing if we are enabled or not
        if (this.isDisabled()) {
            return "true";
        }
        return "false";
    };

    //******************************************************************
    handleKeyUp = (e) => {
        // if it is the spacebar, swallow it and toggle
        if (e.key === ' ') {
            e.preventDefault();
            this.handleClick();
        }
    };

    //******************************************************************
    handleKeyDown = (e) => {
        // Swallow a spacebar event, handled in this.handleKeyUp
        if (e.key === ' ') {
            e.preventDefault();
        }
    };

    //******************************************************************
    getStyle() {
        const style = {
            backgroundRepeat: "no-repeat",
            userSelect: "none",
            backgroundColor: "white",
            width: "33px",
            minWidth: "33px",
            height: "33px",
            minHeight: "33px",
            border: "1px solid #BBBBBB",
            cursor: 'pointer',
            marginRight: "5px",
            fontSize: "28px",
            paddingLeft: "5px",
            ...this.props.style
        };
        if (this.isDisabled()) {
            style.backgroundColor = "#EEEEEE";
            style.cursor = "not-allowed";
        }
        if (!this.isChecked()) {
            style.backgroundImage = "none";
        }
        // else {
        //     if (this.isDisabled()) {
        //         style.backgroundImage = `url(${CDN_URL}img/checkmark-disabled.png)`;
        //     }
        //     else {
        //         style.backgroundImage = `url(${CDN_URL}img/checkmark-enabled.png)`;
        //     }
        // }
        return style;
    }

    //******************************************************************
    render() {
        const name = this.props.name || this.props.id;
        let style = this.getStyle();
        const checkContent = this.isChecked() ? "✓" : null;
        const checkbox = (
            <Fragment>
                <input name={name} type="hidden" value="1"/>
                <div tabIndex="0"
                     id={this.props.id}
                     className="checkbox"
                     title={this.props.title || null}
                     aria-label={this.props.ariaLabel}
                     aria-checked={this.isCheckedToString()}
                     aria-disabled={this.isDisabledToString()}
                     role="checkbox"
                     style={style}
                     onKeyDown={this.handleKeyDown}
                     onKeyUp={this.handleKeyUp}
                     onClick={this.handleClick}>{checkContent}</div>
            </Fragment>
        );

        return (
          <div className="checkbox-wrapper" style={{display: "flex", alignItems: "center"}}>
              {checkbox}
              {this.props.children}
          </div>
        );
    }
}
