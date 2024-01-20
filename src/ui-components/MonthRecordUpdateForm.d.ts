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
export declare type MonthRecordUpdateFormInputValues = {
    startDate?: string;
    maxSpending?: number;
    currentSpending?: number;
};
export declare type MonthRecordUpdateFormValidationValues = {
    startDate?: ValidationFunction<string>;
    maxSpending?: ValidationFunction<number>;
    currentSpending?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MonthRecordUpdateFormOverridesProps = {
    MonthRecordUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    maxSpending?: PrimitiveOverrideProps<TextFieldProps>;
    currentSpending?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MonthRecordUpdateFormProps = React.PropsWithChildren<{
    overrides?: MonthRecordUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    monthRecord?: any;
    onSubmit?: (fields: MonthRecordUpdateFormInputValues) => MonthRecordUpdateFormInputValues;
    onSuccess?: (fields: MonthRecordUpdateFormInputValues) => void;
    onError?: (fields: MonthRecordUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MonthRecordUpdateFormInputValues) => MonthRecordUpdateFormInputValues;
    onValidate?: MonthRecordUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MonthRecordUpdateForm(props: MonthRecordUpdateFormProps): React.ReactElement;
