import React, { Component } from 'react';
import Questions from "./questions";
import Calendar from "./calendar";

//**********************************************************************
export default class App extends Component {
  render() {
    return (
        <div style={{margin: "auto", maxWidth: "1400px"}}>
          <header>
            <h1>Welcome to the WCG Meal System entry form.</h1>
          </header>
          <p>Come and enjoy the beginning of spring (we hope!) with your neighbors in the common house.</p>
          <p>As usual, please submit a form for <strong>every person</strong>, not as a couple. You will have the option of leaving the form filled out after you submit to make that easier.</p>
          <form action="http://www.winslowcohousing.org/meals/cgi-bin/test_handler.php" method="POST" name="scheduleinfo">
            <Questions/>
            <Calendar/>
          </form>

        </div>
    );
  }
}
