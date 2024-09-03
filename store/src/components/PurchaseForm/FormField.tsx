import { forwardRef, Ref } from "react";
import { Box, Input, Text, Flex, Select } from "@chakra-ui/react";
import { COUNTRIES } from "constants/countries";

type FormFieldProps = {
  label: string;
  placeholder: string;
  type?: string;
  gridArea?: { [key: string]: string };
  errors: { message: string } | undefined;
  [prop: string]: unknown;
};

type FormFieldRef = HTMLInputElement | HTMLSelectElement;

const FormField = forwardRef<FormFieldRef, FormFieldProps>((props, ref) => {
  const { label, placeholder, type = "text", gridArea, ...other } = props;

  let errorMessage;
  if (props.errors) {
    errorMessage = props.errors.message;
  }

  return (
    <Box gridArea={gridArea}>
      <Flex justify="space-between">
        <Box
          as="label"
          fontSize="0.75rem"
          fontWeight="bold"
          htmlFor={label}
          display="inline-block"
          mb={2}
          color={props["errors"] ? "inputError" : "white"}
        >
          {label}
        </Box>
        {props.errors && (
          <Text aria-live="polite" color="inputError" fontSize="0.75rem" mb={2}>
            {errorMessage}
          </Text>
        )}
      </Flex>
      {type != "country" ? (
        <Input
          ref={ref as Ref<HTMLInputElement>}
          {...other}
          type={type}
          placeholder={placeholder}
          border="1px solid"
          borderColor={props["errors"] ? "inputError" : "inputBorder"}
          id={label}
        />
      ) : (
        <Select
          ref={ref as Ref<HTMLSelectElement>} // Type assertion here
          {...other}
          placeholder={placeholder}
          border="1px solid"
          borderColor={props["errors"] ? "inputError" : "inputBorder"}
          id={label}
        >
          {COUNTRIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
});

FormField.displayName = "FormField";

export default FormField;
