import React, { Component } from 'react';
import PropTypes from "prop-types";
import Input from "./input";
import {connect} from "react-redux";
import * as Actions from "../actions";

//**********************************************************************
class WrappedInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        setInputValue: PropTypes.func.isRequired,
        inputValues: PropTypes.object.isRequired
    };

    //******************************************************************
    onChange = (e) => {
        this.props.setInputValue(this.props.name, e.target.value);
    };

    //******************************************************************
    value = () => {
        return this.props.inputValues[this.props.name];
    };

    //******************************************************************
    render() {
        return (
            <Input onChange={this.onChange} value={this.value()} {...this.props}/>
        );
    }
}

//**********************************************************************
function mapStateToProps(state) {
    return {
        inputValues: state.inputValues
    };
}

//**********************************************************************
function mapDispatchToProps(dispatch) {
    return {
        setInputValue: (name, value) => dispatch(Actions.setInputValue(name, value))
    };
}

const QInput = connect(mapStateToProps, mapDispatchToProps)(WrappedInput);
export default QInput;
