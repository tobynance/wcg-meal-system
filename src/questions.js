import React, { Component } from 'react';
import Checkbox from "./components/checkbox";
import QInput from "./components/qinput";
import {connect} from "react-redux";
import * as Actions from "./actions";
import QCheck from "./components/qcheck";

//**********************************************************************
class QuestionsComponent extends Component {
    //******************************************************************
    render() {
        return (
            <div className="questions">
                <ol>
                    <li>
                        <strong>Please enter your name:</strong><br/>
                        <QInput name="name"/>
                    </li>
                    <li>
                        <strong>Please select the average number of meals per week you want
                            to eat this cycle (Dec-Feb, 13 weeks total).</strong>
                        <br/>
                        To help, we've listed the estimated anticipated workload based on the past round.<br/>
                        <QCheck name="nmeals1">1 meal/week (4 assist/cleans or 2 cooks)</QCheck>
                        <QCheck name="nmeals2">2 meal/week (7 assist/cleans or 3.5 cooks)</QCheck>
                        <QCheck name="nmeals3">3 meal/week (10 assist/cleans or 5 cooks)</QCheck>
                        <QCheck name="nmeals4">4 meal/week (13 assist/cleans or 6.5 cooks)</QCheck>
                        <QCheck name="nmeals5">5 meal/week (13 assist/cleans or 6.5 cooks)</QCheck>
  
                      <QCheck name="nmeals0-Volunteer">
                            I'm not planning on being in the meal system this round,
                            but I'd like to volunteer to cook 2 meals this cycle. (Thank you!)
                        </QCheck>
                    </li>
                    <li>
                        <strong>NEW-ISH--ONE CLEAN PER CYCLE (if necessary): </strong>
                        <br/>
                        In recent cycles we have sometimes experienced a significant lack of cleaners, and eventually asked everyone in the meal system to pick up
one clean shift, which was a huge help. We may not need it this round, but it's very hard to predict. So if we can go ahead and collect the data, only to be used if necessary, that would be very helpful! Like last time, if 
    you prefer cooking and assiting only, please check this box:
                        <br/>
                        <QCheck name="noclean">
                            <span>
                            I prefer to clean once at most.{" "}
                            </span>
                        </QCheck>
                    </li>
                    <li>
                        <strong>Please schedule my shifts together if possible (cook & clean, or assist & clean).</strong>
                        <br/>
                        Please note that cleaning done during your normal cook or assist shift does not count towards your cleaning shift. You are still expected to complete a full cleaning shift with your cleaning partner, staying until the kitchen and dining room are clean.
                        <br/>
                        <QCheck name="shiftstogether">Yes, I am a glutton for punishment!</QCheck>
                    </li>
                    <li>
                        <strong>Please select how much you prefer doing the three
            different kinds of shifts. </strong> (In the future we are hoping to use this information to automate shift assignments.)
                        <br/>
                        Please mark the task(s) you prefer the most as a 5, and the task(s) you
                        prefer the least as 1.
                        <br/>
                        1 := I strongly prefer not to do this task.
                        <br/>
                        3 := Feel free to assign me some of this task if the meal system needs it.
                        <br/>
                        5 := I typically sign up for / strongly prefer to be assigned this task.
                        <br/>
                        You can assign different tasks the same number.
                        <br/>
                        <div className="checkbox-group" style={{display: "flex", alignItems: "center"}}>
                            <span style={{paddingRight: "10px", width: "50px"}}>cook:</span>
                            <QCheck name="ncook1">1</QCheck>
                            <QCheck name="ncook2">2</QCheck>
                            <QCheck name="ncook3">3</QCheck>
                            <QCheck name="ncook4">4</QCheck>
                            <QCheck name="ncook5">5</QCheck>
                        </div>

                        <div className="checkbox-group" style={{display: "flex", alignItems: "center"}}>
                            <span style={{paddingRight: "10px", width: "50px"}}>assist:</span>
                            <QCheck name="nassist1">1</QCheck>
                            <QCheck name="nassist2">2</QCheck>
                            <QCheck name="nassist3">3</QCheck>
                            <QCheck name="nassist4">4</QCheck>
                            <QCheck name="nassist5">5</QCheck>
                        </div>

                        <div className="checkbox-group" style={{display: "flex", alignItems: "center"}}>
                            <span style={{paddingRight: "10px", width: "50px"}}>clean:</span>
                            <QCheck name="nclean1">1</QCheck>
                            <QCheck name="nclean2">2</QCheck>
                            <QCheck name="nclean3">3</QCheck>
                            <QCheck name="nclean4">4</QCheck>
                            <QCheck name="nclean5">5</QCheck>
                        </div>
                    </li>
                    <li>
                        <strong>Are you a co-housing kid (age 15-22)?</strong>
                        <br/>
                        <QCheck name="gardenerkid">Yes, I am a co-housing kid.</QCheck>
                    </li>
                    <li>
                        <strong> Garden team </strong> -- please get in touch wtih Sarah to figure out the gardener credit for this round.
                    </li>
                    <li>
                        <strong>Cooks Only: Please schedule the following person as my assistant, if possible:</strong>
                        <br/>
                        <QInput name="ckassist" placeholder="any"/>
                    </li>
                    <li>
                        <strong>Cooks Only: Because of a birthday/special occasion, I would like to cook on the following date, if possible:</strong>
                        <br/>
                        <QInput name="ckdate" placeholder="none"/>
                    </li>
                    <li>
                        <strong>Cooks Only: Do you strongly prefer to cook on Sundays?</strong> (Sundays will be apportioned as equally as possible.)
                        <br/>
                        <QCheck name="cksunday">Yes, I strongly prefer to cook on Sundays, but I understand that there aren't necessarily enough to go around.</QCheck>
                    </li>
                    <li>
                        <strong>Allergies and Sensitivities at WCG. </strong> Last quarter we rolled out a slightly-modified dinner sign-up sheet that inlcudes allergies and sensitivities. If you have any <strong>changes</strong> please select the following that apply to your family. (Apologies for not having the edits from the last round included yet!)
                        <br/>
                        <div className="checkbox-group" style={{display: "flex", alignItems: "center"}}>
                            <QCheck name="dye">artificial dye</QCheck>
                            <QCheck name="avocado">avocado</QCheck>
                            <QCheck name="banana">banana</QCheck>
                            <QCheck name="cilantro">cilantro</QCheck>
                            <QCheck name="coconut">coconut</QCheck>
                            <QCheck name="dairy">dairy</QCheck>
                            <QCheck name="eggs">eggs</QCheck>
                            <QCheck name="fish">fish</QCheck>
                            <QCheck name="gluten">gluten/wheat</QCheck>
                            <QCheck name="mango">mango</QCheck>
                            <QCheck name="nuts">nuts</QCheck>
                            <QCheck name="pork">pork</QCheck>
                            <QCheck name="shellfish">shellfish</QCheck>
                            <QCheck name="soy">soy</QCheck>
                            <QCheck name="sugar">added sugar</QCheck>
                        </div>
                    </li>
                    <li>
                        <strong>Any comments or questions?</strong>
                        <br/>
                        <QInput name="comments" style={{width: "700px"}}/>
                    </li>
                    <li>
                        <strong>Please CROSS OUT the days and shifts for which you are UNAVAILABLE.</strong>
                        <br/>
                        Please select dates for which you are definitely <strong>unable</strong> to work.
                        <br/>
                        <br/>
{//                            Note that the days around holidays
//                            will only be put on the meal schedule if
//                            enough folks show that they are available. Please be sure to mark yourself
//                            as <strong>unavailable</strong> if you would not eat (or want to
//                            work) on/near the holidays.
//                        <br/>
//                        <br/>
}                        You can use these controls to help auto fill the form below.
                        <br/>
    <Checkbox checked={this.props.neverCook} onChange={this.props.toggleNeverCook} id="allco">Never Cook</Checkbox>
    <Checkbox checked={this.props.neverAssist} onChange={this.props.toggleNeverAssist} id="allas">Never Assist</Checkbox>
    <Checkbox checked={this.props.neverClean} onChange={this.props.toggleNeverClean} id="allcl">Never Clean</Checkbox>
                        <br/>
    <strong> EVERYONE: Please provide some availability for cleaning shift. </strong> If you selected the tick box above, we'll only assign one, at most.
                    </li>
                </ol>
            </div>
        );
    }
}

//**********************************************************************
function mapStateToProps(state) {
    return {
        neverCook: state.neverCook,
        neverAssist: state.neverAssist,
        neverClean: state.neverClean
    };
}

//**********************************************************************
function mapDispatchToProps(dispatch) {
    return {
        toggleNeverCook: () => dispatch(Actions.toggleNeverCook()),
        toggleNeverAssist: () => dispatch(Actions.toggleNeverAssist()),
        toggleNeverClean: () => dispatch(Actions.toggleNeverClean()),
    };
}

const Questions = connect(mapStateToProps, mapDispatchToProps)(QuestionsComponent);
export default Questions;
