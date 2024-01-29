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

export default function DebugCreateMonth({createMonthFunction}){
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
        <View as="form" name={new Date().toLocaleDateString()} role="form" onSubmit={createMonthFunction}>
        <Flex direction="row" justifyContent="center">
          <TextField
            className="form-field"
            mode="numeric"
            name="value"
            placeholder="Spending Limit"
            label="Max Spending"
            labelHidden
            variation="quiet"
            required
            hasError = {hasError}
            errorMessage="Whole Numbers. Keep it simple!"
            onChange = {validateInputValue}
          />
          <Button type="submit" variation="primary" disabled={isDisabled}>
            Create Month
          </Button>
        </Flex>
      </View>
    );
}