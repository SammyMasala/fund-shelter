import { render, screen } from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import ExpensesList from './ExpensesList';

//Unit Test: Expenses List
//Elements: List entry Expense
//Expense contains Value, Description, Delete Button

describe("Unit Test ExpensesList", () => {
    test("List should contain Expense entries", async () => {        
        const testData = [
            {
                id: "one",
                value: 200,
                description: "testdescone"
            },{
                id: "two",
                value: 300,
                description: "testdesctwo"
            }
        ]
        render(<ExpensesList expenseData={testData} deleteExpenseFunction={""}/>);
        //Entry value
        const entryValueElement = screen.getByText(200);
        expect(entryValueElement).toBeTruthy();
        //Entry description
        const entryDescElement = screen.getByText(/testdescone/) 
        expect(entryDescElement).toBeTruthy();       
    });
    
    test("Delete Button on entries should work", async () => {
        let testDeleteOutput;
        const testDeleteFunction = (event) => {
            testDeleteOutput = "success!";
        };
        const user = userEvent.setup();

        const testData = [{            
                id: "one",
                value: 200,
                description: "testdescone"
            }, {
                id: "two",
                value: 300,
                description: "testdesctwo"
            }
        ]
        render(<ExpensesList expenseData={testData} deleteExpenseFunction={testDeleteFunction}/>);
        const deleteBtn = screen.getAllByText(/Delete expense/);
        await user.click(deleteBtn[0]);
        expect(testDeleteOutput).toBe("success!");
    });

});