import React from "react";
import {
  Button,
  Flex,
  TextField,
} from "@aws-amplify/ui-react";

export default function CreateExpense({createExpenseFunction}){
    const [isDisabled, setIsDisabled] = React.useState(true);
    function validateInputValue(event){
      const digitRgx = /^[0-9\b]+$/;
      // If input is blank or failed regex, ignore
      if(!event.currentTarget.value || !digitRgx.test(event.currentTarget.value)){
        setIsDisabled(true);
      }else{
        setIsDisabled(false);
      }
    }
    return (
      <Flex 
        direction="row" 
        justifyContent="center"
        as="form" 
        role="form" 
        rowStart="4"
        rowEnd="5"
        margin="10px"
        height="50px"
        onSubmit={createExpenseFunction}
      >
        <TextField
          className="form-field"
          margin="0px"
          mode="numeric"
          name="value"
          placeholder="Expense Value"
          label="Expense Value"
          labelHidden
          variation="quiet"
          required
          onChange = {validateInputValue}
        />
        <TextField
          className="form-field"
          margin="0px"
          name="description"
          placeholder="Expense Description"
          label="Expense Description"
          labelHidden
          variation="quiet"
          required
        />
        <Button type="submit" id="expense-submit-button" variation="primary" disabled={isDisabled}>
          Create Expense
        </Button>
      </Flex>
    );
}