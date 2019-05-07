import React, { Component } from 'react';
import PropTypes from "prop-types";
import Checkbox from "./checkbox";
import {connect} from "react-redux";
import * as Actions from "../actions";

//**********************************************************************
class WrappedCheckbox extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        toggle: PropTypes.func.isRequired,
        checkedStates: PropTypes.object.isRequired
    };

    //******************************************************************
    onChange = () => {
        this.props.toggle(this.props.name);
    };

    //******************************************************************
    checked = () => {
        return this.props.checkedStates[this.props.name];
    };

    //******************************************************************
    render() {
        return (
            <Checkbox name={this.props.name} onChange={this.onChange} checked={this.checked()}>{this.props.children}</Checkbox>
        );
    }
}

//**********************************************************************
function mapStateToProps(state) {
    return {
        checkedStates: state.checkedStates
    };
}

//**********************************************************************
function mapDispatchToProps(dispatch) {
    return {
        toggle: (name) => dispatch(Actions.toggleCheckedState(name))
    };
}

const QCheck = connect(mapStateToProps, mapDispatchToProps)(WrappedCheckbox);
export default QCheck;
