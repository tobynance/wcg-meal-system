import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RadioButton from "./radio-button";

//**********************************************************************
describe('RadioButton', () => {
    //******************************************************************
    it('renders properly unselected', () => {
        const index = 0;
        const text = "Some text for a RadioButton";

        const component = shallow(
            <RadioButton
                key={index}
                style={{ marginTop: "10px" }}
                selected={false}
                onClick={() => null}>
                {text}
            </RadioButton>
        );

        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('label').text()).toBe(text);
        expect(component.find('div.selected').length).toBe(0);
    });

    //******************************************************************
    it('renders properly selected', () => {
        const index = 0;
        const text = "Some text for a RadioButton";

        const component = shallow(
            <RadioButton
                key={index}
                style={{ marginTop: "10px" }}
                selected={true}
                onClick={() => null}>
                {text}
            </RadioButton>
        );

        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('div.selected').length).toBe(1);
    });
});
