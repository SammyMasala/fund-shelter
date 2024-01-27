/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createMonthRecord } from "../graphql/mutations";
const client = generateClient();
export default function MonthRecordCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    maxSpending: "",
    currentSpending: "",
  };
  const [maxSpending, setMaxSpending] = React.useState(
    initialValues.maxSpending
  );
  const [currentSpending, setCurrentSpending] = React.useState(
    initialValues.currentSpending
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMaxSpending(initialValues.maxSpending);
    setCurrentSpending(initialValues.currentSpending);
    setErrors({});
  };
  const validations = {
    maxSpending: [{ type: "Required" }],
    currentSpending: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          maxSpending,
          currentSpending,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createMonthRecord.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MonthRecordCreateForm")}
      {...rest}
    >
      <TextField
        label="Max spending"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxSpending}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              maxSpending: value,
              currentSpending,
            };
            const result = onChange(modelFields);
            value = result?.maxSpending ?? value;
          }
          if (errors.maxSpending?.hasError) {
            runValidationTasks("maxSpending", value);
          }
          setMaxSpending(value);
        }}
        onBlur={() => runValidationTasks("maxSpending", maxSpending)}
        errorMessage={errors.maxSpending?.errorMessage}
        hasError={errors.maxSpending?.hasError}
        {...getOverrideProps(overrides, "maxSpending")}
      ></TextField>
      <TextField
        label="Current spending"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={currentSpending}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              maxSpending,
              currentSpending: value,
            };
            const result = onChange(modelFields);
            value = result?.currentSpending ?? value;
          }
          if (errors.currentSpending?.hasError) {
            runValidationTasks("currentSpending", value);
          }
          setCurrentSpending(value);
        }}
        onBlur={() => runValidationTasks("currentSpending", currentSpending)}
        errorMessage={errors.currentSpending?.errorMessage}
        hasError={errors.currentSpending?.hasError}
        {...getOverrideProps(overrides, "currentSpending")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
