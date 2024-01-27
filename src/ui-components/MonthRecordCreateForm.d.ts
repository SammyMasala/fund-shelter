/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MonthRecordCreateFormInputValues = {
    maxSpending?: number;
    currentSpending?: number;
};
export declare type MonthRecordCreateFormValidationValues = {
    maxSpending?: ValidationFunction<number>;
    currentSpending?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MonthRecordCreateFormOverridesProps = {
    MonthRecordCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    maxSpending?: PrimitiveOverrideProps<TextFieldProps>;
    currentSpending?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MonthRecordCreateFormProps = React.PropsWithChildren<{
    overrides?: MonthRecordCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MonthRecordCreateFormInputValues) => MonthRecordCreateFormInputValues;
    onSuccess?: (fields: MonthRecordCreateFormInputValues) => void;
    onError?: (fields: MonthRecordCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MonthRecordCreateFormInputValues) => MonthRecordCreateFormInputValues;
    onValidate?: MonthRecordCreateFormValidationValues;
} & React.CSSProperties>;
export default function MonthRecordCreateForm(props: MonthRecordCreateFormProps): React.ReactElement;
