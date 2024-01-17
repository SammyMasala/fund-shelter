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
export declare type ExpenseCreateFormInputValues = {
    name?: string;
    description?: string;
    image?: string;
};
export declare type ExpenseCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExpenseCreateFormOverridesProps = {
    ExpenseCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ExpenseCreateFormProps = React.PropsWithChildren<{
    overrides?: ExpenseCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ExpenseCreateFormInputValues) => ExpenseCreateFormInputValues;
    onSuccess?: (fields: ExpenseCreateFormInputValues) => void;
    onError?: (fields: ExpenseCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ExpenseCreateFormInputValues) => ExpenseCreateFormInputValues;
    onValidate?: ExpenseCreateFormValidationValues;
} & React.CSSProperties>;
export default function ExpenseCreateForm(props: ExpenseCreateFormProps): React.ReactElement;
