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
import { getMonthRecord } from "../../graphql/queries";
import { updateMonthRecord } from "../../graphql/mutations";
const client = generateClient();
export default function MonthRecordUpdateForm(props) {
  const {
    id: idProp,
    monthRecord: monthRecordModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    startDate: "",
    maxSpending: "",
    currentSpending: "",
  };
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [maxSpending, setMaxSpending] = React.useState(
    initialValues.maxSpending
  );
  const [currentSpending, setCurrentSpending] = React.useState(
    initialValues.currentSpending
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = monthRecordRecord
      ? { ...initialValues, ...monthRecordRecord }
      : initialValues;
    setStartDate(cleanValues.startDate);
    setMaxSpending(cleanValues.maxSpending);
    setCurrentSpending(cleanValues.currentSpending);
    setErrors({});
  };
  const [monthRecordRecord, setMonthRecordRecord] =
    React.useState(monthRecordModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMonthRecord.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMonthRecord
        : monthRecordModelProp;
      setMonthRecordRecord(record);
    };
    queryData();
  }, [idProp, monthRecordModelProp]);
  React.useEffect(resetStateValues, [monthRecordRecord]);
  const validations = {
    startDate: [{ type: "Required" }],
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
          startDate,
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
            query: updateMonthRecord.replaceAll("__typename", ""),
            variables: {
              input: {
                id: monthRecordRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MonthRecordUpdateForm")}
      {...rest}
    >
      <TextField
        label="Start date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={startDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              startDate: value,
              maxSpending,
              currentSpending,
            };
            const result = onChange(modelFields);
            value = result?.startDate ?? value;
          }
          if (errors.startDate?.hasError) {
            runValidationTasks("startDate", value);
          }
          setStartDate(value);
        }}
        onBlur={() => runValidationTasks("startDate", startDate)}
        errorMessage={errors.startDate?.errorMessage}
        hasError={errors.startDate?.hasError}
        {...getOverrideProps(overrides, "startDate")}
      ></TextField>
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
              startDate,
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
              startDate,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || monthRecordModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || monthRecordModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
