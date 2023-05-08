import React, { useState, useEffect, useCallback } from "react";

interface FormProps {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
interface ErrorType {
  name?: string;
  email?: string;
  password?: string;
}
interface useFormArg {
  initialValues: FormProps;
  onSubmit: (values: FormProps) => void;
  validate: any;
}

function useForm({ 
  initialValues,
  onSubmit,
  validate
}: useFormArg) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorType>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name] : value });
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    // await new Promise((r) => setTimeout(r, 1000));
    setErrors(validate(values));
  }

  const onSubmitting = useCallback(() => {
    if(submitting) {
      if(Object.keys(errors).length === 0) {
        onSubmit(values);
      }
      setSubmitting(false);
    }
  }, [errors, submitting, values, onSubmit])

  useEffect(() => {
    onSubmitting();
  }, [onSubmitting])
  

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit
  }
}

export default useForm;