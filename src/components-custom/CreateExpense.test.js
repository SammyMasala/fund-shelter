import { render, screen } from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import CreateExpense from './CreateExpense';

//UNIT TEST: CreateExpense.js
//1. Expense form: Expense value, Expense description
//2. Submit button: Submits Expense value and Expense description, executes submit function 

describe("Unit Test CreateExpense component", () => {
    //Input 'Expense Value'
    test("Input 'Expense Value' should exist", async () =>{
        render(<CreateExpense />);
        const valueElement = screen.getByLabelText(/Expense Value/);
        expect(valueElement).toBeTruthy();
    });
    test("Input 'Expense Value' should change value", async () =>{
        render(<CreateExpense />);
        const user = userEvent.setup();
        const valueElement = screen.getByPlaceholderText(/Expense Value/);
        await user.click(valueElement);
        await user.keyboard("112233");
        expect(valueElement.value).toBe("112233");
    });

    //Input 'Expanse Description' 
    test("Input 'Expense Description' should exist", async () =>{
        render(<CreateExpense />);
        const valueElement = screen.getByPlaceholderText(/Expense Description/);
        expect(valueElement).toBeTruthy();
    });
    test("Input 'Expense Description' should change value", async () =>{
        render(<CreateExpense />);
        const user = userEvent.setup();
        const valueElement = screen.getByPlaceholderText(/Expense Description/);
        await user.click(valueElement);
        await user.keyboard("aabbcc");
        expect(valueElement.value).toBe("aabbcc");
    });

    //Button 'Create Expense'
    test("Button 'Create Expense' should exist", async() =>{
        render(<CreateExpense />);
        const submitBtn = screen.getByText(/Create Expense/);
        expect(submitBtn).toBeTruthy();
    })
    test("Button 'Create Expense' should enable/disable when form is filled correctly/incorrectly" , async () =>{
        render(<CreateExpense />);
        const user = userEvent.setup();
        const valueElement = screen.getByPlaceholderText(/Expense Value/);
        await user.click(valueElement);
        //valid
        await user.keyboard("112233");
        const submitBtn = screen.getByText(/Create Expense/);
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
        render(<CreateExpense createExpenseFunction={testSubmitFunc}/>);
        const user = userEvent.setup();
        const valueElement = screen.getByPlaceholderText(/Expense Value/);
        await user.click(valueElement);
        //valid
        await user.keyboard("112233{enter}");
        const submitBtn = screen.getByText(/Create Expense/);
        await user.click(submitBtn);
        expect(testSubmitOutput).toBe("success!");
    });  
});

