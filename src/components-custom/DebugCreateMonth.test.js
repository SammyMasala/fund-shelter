import { render, screen } from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import DebugCreateMonth from './DebugCreateMonth';

//UNIT TEST: DebugCreateMonth.js
//1. Month form: Max Spending, READ ONLY Current time 
//2. Submit button: Submits Max Spending, executes submit function 

describe("Unit Test DebugCreateMonth component", () => {
    //Input 'Max Spending'
    test("Input 'DebugCreateMonth' should exist", async () =>{
        render(<DebugCreateMonth />);
        const valueElement = screen.getByLabelText(/Max Spending/);
        expect(valueElement).toBeTruthy();
    });
    test("Input 'Spending Limit' should change value", async () =>{
        render(<DebugCreateMonth />);
        const user = userEvent.setup();
        const valueElement = screen.getByLabelText(/Max Spending/);
        await user.click(valueElement);
        await user.keyboard("112233");
        expect(valueElement.value).toBe("112233");
    });

    //Button 'Create Month'
    test("Button 'Create Month' should exist", async() =>{
        render(<DebugCreateMonth />);
        const submitBtn = screen.getByText(/Create Month/);
        expect(submitBtn).toBeTruthy();
    })
    test("Button 'Create Month' should enable/disable when form is filled correctly/incorrectly" , async () =>{
        render(<DebugCreateMonth />);
        const user = userEvent.setup();
        const valueElement = screen.getByLabelText(/Max Spending/);
        await user.click(valueElement);
        //valid
        await user.keyboard("112233");
        const submitBtn = screen.getByText(/Create Month/);
        expect(submitBtn.getAttribute("disabled")).toBe(null);
        //invalid
        await user.keyboard("aabbcc");
        expect(submitBtn.getAttribute("disabled")).toBe("");        
    });    
    test("Button 'Create Expense' should execute testSubmitFunc" , async () =>{
        let testSubmitOutput;
        const testSubmitFunc = (event) => {
            event.preventDefault();
            testSubmitOutput = "success!";
        };
        render(<DebugCreateMonth createMonthFunction={testSubmitFunc}/>);
        const user = userEvent.setup();
        const valueElement = screen.getByLabelText(/Max Spending/);
        await user.click(valueElement);
        //valid
        await user.keyboard("112233");
        const submitBtn = screen.getByText(/Create Month/);
        await user.click(submitBtn);
        expect(testSubmitOutput).toBe("success!");
    });  
});

