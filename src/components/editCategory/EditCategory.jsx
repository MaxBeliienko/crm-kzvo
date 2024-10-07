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
  sectionId: Yup.number().nullable(),
  images: Yup.array().of(Yup.string()),
});

const EditCategory = ({ onClose, category }) => {
  const categoryNameId = useId();
  const categorySectionId = useId();
  const categoryImageId = useId();

  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

  const { name, id } = category;

  const initialValues = {
    name: name,
    sectionId: id,
    images: [],
  };

  // Перевірка унікальності sectionId
  const isSectionIdUnique = sectionId => {
    return !categories.some(
      category => category.id === sectionId && category.id !== id
    );
  };

  const [images, setImages] = useState([]);

  const handleSubmit = (values, actions) => {
    let { sectionId, name } = values;
    sectionId = sectionId ? parseInt(sectionId, 10) : undefined;
    if (sectionId && !isSectionIdUnique(sectionId)) {
      alert('Такий sectionId вже існує');
      return;
    }
    const resultValues = {
      id: sectionId || id,
      name,
      parentCategoryId: 0,
      images: null,
    };
    dispatch(
      updateCategory({
        databaseId: 1,
        sectionId: id,
        categoryData: resultValues,
      })
    );
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
