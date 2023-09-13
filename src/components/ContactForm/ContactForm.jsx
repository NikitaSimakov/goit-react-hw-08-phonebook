import { useState } from 'react';
// import { Button } from '@mui/material';
import { Button } from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contact/thunks';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { selectContacts } from 'redux/selectors';
import { Notify } from 'notiflix';
import css from './ContactForm.module.scss';
import 'yup-phone-lite';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');
  const [isActive, setIsActive] = useState(false);

  const initialValues = {
    name: '',
    number: '',
  };

  const schema = yup.object().shape({
    name: yup.string().min(2).required(),
    number: yup
      .string()
      .phone('IN', 'Please enter a valid phone number in format +15501234567'),
  });
  // const handleInputChange = event => {
  //   const { name, value } = event.currentTarget;
  //   if (name === 'name') setName(value);
  //   if (name === 'number') setNumber(value);
  // };

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   if (contacts.some(contact => contact.name.includes(name)))
  //     return Notify.failure(`Contact ${name} is already in phonebook!`);
  //   dispatch(addContact({ name, number }));
  //   reset();
  // };
  const handleSubmit = ({ name, number }, { resetForm }) => {
    resetForm();
    if (contacts.some(contact => contact.name.includes(name)))
      return Notify.failure(`Contact ${name} is already in phonebook!`);
    dispatch(addContact({ name, number }));
    modalClose();
    return Notify.success(
      `The contact ${name} was successfully added to the phone book!`
    );
  };

  const modalOpen = () => setIsActive(true);
  const modalClose = () => setIsActive(false);

  // const reset = () => {
  //   setName('');
  //   setNumber('');
  // };

  return (
    <>
      {isActive && (
        <section className={css.addContact}>
          <div className={css.container}>
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              <Form className={css.form}>
                <h1 className={css.title}>Add new contact</h1>
                <div className={css.labelWrapper}>
                  <label className={css.label}>
                    <p className={css.labelName}>Name</p>
                    <Field
                      className={css.input}
                      type="text"
                      name="name"
                      placeholder="Homer Simpson"
                    />
                    <ErrorMessage name="name" />
                  </label>
                  <label className={css.label}>
                    <p className={css.labelName}>Number</p>
                    <Field
                      className={css.input}
                      type="tel"
                      name="number"
                      placeholder="+15501234567"
                    />
                    <ErrorMessage name="number" />
                  </label>
                  <Button buttonType={'submit'}>Add contact</Button>
                </div>
                <button
                  onClick={modalClose}
                  className={css.closeButton}
                  type="button"
                >
                  X
                </button>
              </Form>
            </Formik>
          </div>
        </section>
      )}
      <button onClick={modalOpen} className={css.openButton} type="button">
        Add contact
      </button>
    </>
  );
};

export default ContactForm;