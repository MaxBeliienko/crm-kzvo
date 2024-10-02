import styles from './AddDevice.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addDatabaseConnection } from '../../redux/devices/operations';
import { useState, useId, useEffect } from 'react';
import * as Yup from 'yup';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  databaseName: Yup.string().required('Required'),
  databaseIp: Yup.string().required('Required'),
});

const AddDevice = ({ onClose }) => {
  const deviceNameId = useId();
  const deviceDatabaseName = useId();
  const deviceDatabaseIp = useId();
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    databaseName: '',
    databaseIp: '',
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(addDatabaseConnection({ databaseData: values }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor={deviceNameId}>Name</label>
          <Field type="text" name="name" id={deviceNameId} />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label htmlFor={deviceDatabaseName}>Database name</label>
          <Field type="text" name="databaseName" id={deviceDatabaseName} />
          <ErrorMessage name="databaseName" component="span" />
        </div>
        <div>
          <label htmlFor={deviceDatabaseIp}>Database IP</label>
          <Field type="text" name="databaseIp" id={deviceDatabaseIp} />
          <ErrorMessage name="databaseIp" component="span" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default AddDevice;
