import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../redux/categories/operations';
import { selectCategories } from '../../redux/categories/selectors';
import { useState, useId, useEffect } from 'react';
import { handleFileChange } from '../../utils/handleFileChange';
import * as Yup from 'yup';
import styles from './EditCategory.module.css';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  sectionId: Yup.number().required('Required'),
  images: Yup.array().of(Yup.string()),
});

const EditCategory = ({ onClose, category }) => {
  const categoryNameId = useId();
  const categorySectionId = useId();
  const categoryImageId = useId();

  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

  const { name, sectionId } = category;

  const initialValues = {
    name: name,
    sectionId: sectionId,
    images: [],
  };

  // Перевірка унікальності sectionId
  const isSectionIdUnique = sectionId => {
    return !categories.some(
      category =>
        category.sectionId === sectionId &&
        category.sectionId !== category.sectionId
    );
  };

  const [images, setImages] = useState([]);

  const handleSubmit = (values, actions) => {
    const sectionId = values.sectionId;
    if (!isSectionIdUnique(sectionId)) {
      alert('Такий sectionId вже існує');
      return;
    }
    const resultValues = { ...values, images: images };
    dispatch(updateCategory({ categoryData: resultValues }));
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
          <label htmlFor={categoryNameId}>Name</label>
          <Field type="text" name="name" id={categoryNameId} />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label htmlFor={categorySectionId}>Section id</label>
          <Field type="number" name="sectionId" id={categorySectionId} />
          <ErrorMessage name="sectionId" component="span" />
        </div>
        <div>
          <label htmlFor={categoryImageId}>Images</label>
          <Field
            type="file"
            name="images"
            id={categoryImageId}
            accept="image/*"
            onChange={event => handleFileChange(event, setImages)}
          />
          <ErrorMessage name="images" component="span" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default EditCategory;
