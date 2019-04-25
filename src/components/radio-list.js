import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from './radio-button';

//**********************************************************************
export default class RadioList extends React.Component {
    //******************************************************************
    static propTypes = {
        options: PropTypes.array.isRequired,
        selected: PropTypes.number,
        onClick: PropTypes.func,
        outerStyle: PropTypes.object,
        radioStyle: PropTypes.object
    };

    //******************************************************************
    getStyles() {
        const styles = {};
        styles.outer = {
            ...this.props.outerStyle
        };
        styles.radio = {
            marginBottom: '10px',
            cursor: 'pointer',
            ...this.props.radioStyle
        };
        return styles;
    };

    //******************************************************************
    render() {
        const styles = this.getStyles();
        return (
            <div style={styles.outer}>
                {this.props.options.map((option, index) => (
                    <RadioButton
                        key={index}
                        style={styles.radio}
                        selected={index === this.props.selected}
                        onClick={(e) => this.props.onClick(index, e)}
                    >
                        {option}
                    </RadioButton>
                ))}
            </div>
        )
    }
}
