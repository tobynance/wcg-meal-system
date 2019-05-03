import React, { Component } from 'react';
import Questions from "./questions";
import Calendar from "./calendar";

//**********************************************************************
export default class App extends Component {
    render() {
        const submitButtonStyle = {
            margin: "20px",
            height: "34px",
            width: "100px",
            fontSize: "18px"
        };
        return (
            <div style={{margin: "auto", maxWidth: "1400px"}}>
                <header>
                    <h1>Welcome to the WCG Meal System entry form.</h1>
                </header>
                <p>Come and enjoy the beginning of spring (we hope!) with your neighbors in the common house.</p>
                <p>As usual, please submit a form for <strong>every person</strong>, not as a couple.</p>
                <form action="http://www.winslowcohousing.org/meals/cgi-bin/test_handler.php" method="POST" name="scheduleinfo">
                    <Questions/>
                    <Calendar/>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button style={submitButtonStyle}>Submit</button>
                    </div>
                </form>

            </div>
        );
    }
}
