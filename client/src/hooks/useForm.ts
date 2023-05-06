import { error } from "console";
import React, { useState, useEffect, useCallback } from "react";

interface FormProps {
  email?: string;
  password?: string;
}
interface ErrorType {
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
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name] : value });
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
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