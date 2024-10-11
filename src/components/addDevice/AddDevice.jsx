import styles from './AddDevice.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { addDatabaseConnection } from '../../redux/devices/operations';
import { useId } from 'react';
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
    const url = `jdbc:mysql://${values.databaseIp}/${values.databaseName}`;
    const dataToSend = {
      name: values.name,
      url,
      username: 'root',
      password: '12345',
      columns: [
        {
          position: 0,
          name: 'default_column',
          active: true,
        },
      ],
    };

    dispatch(addDatabaseConnection({ databaseData: dataToSend }));
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
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
