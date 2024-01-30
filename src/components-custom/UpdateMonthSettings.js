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

export default function UpdateMonthSettings({updateFunction, resetFunction}){
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

    function submitFunction(event){
      event.preventDefault();
      console.log(event.value);
      event.target.reset();
    }

    return (
        <View as="form" name={new Date().toLocaleDateString()} onSubmit={submitFunction} role="form">
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
            onChange = {validateInputValue}
          />
          <Button type="submit" variation="primary" value="Update" disabled={isDisabled}>
            UPDATE (Keeps existing expenses)
          </Button>
          <Button type="submit" variation="primary" value="Reset" disabled={isDisabled}>
            RESET (Starts a new month. All current data is deleted)
          </Button>
        </Flex>
      </View>
    );
}