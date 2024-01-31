import React from "react";
import {
  Button,
  CheckboxField,
  Grid,
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
      const form = new FormData(event.target);
      const isReset = form.get("reset");
      const data = {
        maxSpending: form.get("value"),        
      }
      if(!isReset){
        updateFunction(data);
      }else{
        updateFunction(data);
        // resetFunction(data);
      }
    }

    return (
        <Grid 
          as="form" 
          role="form"
          templateRows="1fr 1fr"
          templateColumns="1fr 1fr"
          onSubmit={submitFunction}
        >
          <TextField
            columnStart="1"
            columnEnd="3"
            // columnEnd="2"
            rowStart="1"
            rowEnd="2"
            mode="numeric"
            name="value"
            placeholder="Spending Limit"
            label="Max Spending"
            variation="quiet"
            required
            onChange = {validateInputValue}
          />
          {/* <CheckboxField
            columnStart="2"
            columnEnd="3"
            rowStart="1"
            rowEnd="2"
            color="#FF0000"
            margin="5px 25px 5px 25px"
            label="Reset: Deletes current month"
            name="reset"
            value="yes"
            size="large"
          /> */}
          <Button 
            columnStart="1"
            columnEnd="3"
            rowStart="2"
            rowEnd="3"
            margin="10px"
            type="submit" 
            variation="primary" 
            disabled={isDisabled}
          >
            UPDATE
          </Button>
      </Grid>
    );
}