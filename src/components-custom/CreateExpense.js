import React from "react";
import {
  Button,
  Flex,
  TextField,
  View,
} from "@aws-amplify/ui-react";

if (process.env.NODE_ENV !== 'test') {
  import ('@aws-amplify/ui-react/styles.css');
}

export default function CreateExpense({createExpenseFunction}){
    const [hasError, setHasError] = React.useState(true);
    const [isDisabled, setIsDisabled] = React.useState(true);
    function validateInputValue(event){
      const digitRgx = /^[0-9\b]+$/;
      // If input is blank or failed regex, ignore
      if(!digitRgx.test(event.currentTarget.value)){
        setHasError(true);
        setIsDisabled(true);
      }else{
        setHasError(false);
        setIsDisabled(false);
      }
    }
    return (
        <View as="form" role="form" onSubmit={createExpenseFunction}>
        <Flex direction="row" justifyContent="center">
          <TextField
            mode="numeric"
            name="value"
            placeholder="Expense Value"
            label="Expense Value"
            labelHidden
            variation="quiet"
            required
            hasError = {hasError}
            errorMessage="Whole Numbers. Keep it simple!"
            onChange = {validateInputValue}
          />
          <TextField
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
      </View>
    );
}