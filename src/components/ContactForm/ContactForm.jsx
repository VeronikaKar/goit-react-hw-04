import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useId } from "react";
import ReactInputMask from "react-input-mask";
import s from "./ContactForm.module.css";
import PropTypes from 'prop-types';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be at least 3 characters")
    .max(50, "Name should not exceed 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^\(\d{3}\) \d{3}-\d{4}$/, "Invalid phone number format")
    .required("Phone number is required"),
});

const initialValues = {
  name: "",
  number: "",
};

function ContactForm({ onAdd }) {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    values.id = nanoid();

    onAdd(values);

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={s.form}>
        <label className={s.label} htmlFor={nameFieldId}>
          Name
        </label>
        <div className={s.wrapper}>
          <Field className={s.input} id={nameFieldId} name="name" />
          <ErrorMessage className={s.error} name="name" component="span" />
        </div>
        <label className={s.label} htmlFor={numberFieldId}>
          Number
        </label>
        <div className={s.wrapper}>
          <Field name="number">
            {({ field }) => (
              <ReactInputMask
                {...field}
                mask="(999) 999-9999"
                className={s.input}
                id={numberFieldId}
              />
            )}
          </Field>
          <ErrorMessage className={s.error} name="number" component="span" />
        </div>
        <button className={s.button} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default ContactForm;
