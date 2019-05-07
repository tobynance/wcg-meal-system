import React, { Component } from 'react';
import Questions from "./questions";
import Calendar from "./calendar";
import {connect} from "react-redux";
import * as Actions from "./actions";

//**********************************************************************
class AppComponent extends Component {
    render() {
        const submitButtonStyle = {
            margin: "20px",
            height: "34px",
            width: "100px",
            fontSize: "18px"
        };
        const clearButtonStyle = {
            userSelect: "none",
            paddingTop: "5px",
            backgroundColor: "#CCCCCC",
            textAlign: "center",
            border: "1px solid black",
            cursor: "pointer",
            margin: "20px",
            height: "28px",
            width: "100px",
            fontSize: "18px"
        };

        return (
            <div style={{margin: "auto", maxWidth: "1400px"}}>
                <header>
                    <h1>Welcome to the WCG Meal System entry form.</h1>
                </header>
                <p>Come and enjoy the beginning of spring (we hope!) with your neighbors in the common house.</p>
                <p>
                    As usual, please submit a form for <strong>every person</strong>, not as a couple.
                    You will have the option of leaving the form filled out after you submit to make that easier.
                </p>
                <form action="http://www.winslowcohousing.org/meals/cgi-bin/test_handler.php" method="POST" name="scheduleinfo">
                    <Questions/>
                    <Calendar/>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button style={submitButtonStyle}>Submit</button>
                        <div onClick={this.props.clearForm} style={clearButtonStyle}>Clear</div>
                    </div>
                </form>

            </div>
        );
    }
}

//**********************************************************************
function mapStateToProps(state) {
    return {};
}

//**********************************************************************
function mapDispatchToProps(dispatch) {
    return {
        clearForm: () => dispatch(Actions.clear())
    };
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default App;
