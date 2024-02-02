import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import UpdateMonthSettings from "./UpdateMonthSettings";

//Unit test UpdateMonthSettings
//Elements: Input, Update Button
//On submitting Update Button, trigger updateFunction 

describe("Unit test UpdateMonthSettings", () => {
  //Input 'Max Spending'
  test("Input 'Max Spending' should exist", async () =>{
    render(<UpdateMonthSettings />);
    const valueElement = screen.getByLabelText(/Max Spending/i);
    expect(valueElement).toBeTruthy();
  });
  test("Input 'Max Spending' should change value", async () =>{
    render(<UpdateMonthSettings />);
    const user = userEvent.setup();
    const valueElement = screen.getByLabelText(/Max Spending/i);
    await user.click(valueElement);
    await user.keyboard("112233");
    expect(valueElement.value).toBe("112233");
  });
  test("Input 'Max Spending' should exist", async () =>{
    render(<UpdateMonthSettings />);
    const valueElement = screen.getByText(/Update/i);
    expect(valueElement).toBeTruthy();
  });
  test("Button 'Create Expense' should enable/disable when form is filled correctly/incorrectly" , async () =>{
    render(<UpdateMonthSettings />);
    const user = userEvent.setup();
    const valueElement = screen.getByLabelText(/Max Spending/i);
    await user.click(valueElement);
    //valid
    await user.keyboard("112233");
    const submitBtn = screen.getByText(/Update/i);
    expect(submitBtn.getAttribute("disabled")).toBe(null);
    //invalid
    await user.keyboard("aabbcc");
    expect(submitBtn.getAttribute("disabled")).toBe("");        
});    
  test("Button 'Create Expense' should execute testSubmitFunc" , async () =>{
    let testSubmitOutput;
    const testSubmitFunc = (data) => {
        testSubmitOutput = "success!";
    };
    render(<UpdateMonthSettings updateFunction={testSubmitFunc}/>);
    const user = userEvent.setup();
    const valueElement = screen.getByLabelText(/Max Spending/i);
    await user.click(valueElement);
    //valid
    await user.keyboard("112233");
    const submitBtn = screen.getByText(/Update/i);
    await user.click(submitBtn);
    expect(testSubmitOutput).toBe("success!");
  });  
})