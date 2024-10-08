import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  addCategoryWithId,
} from '../../redux/categories/operations';
import { selectCategories } from '../../redux/categories/selectors';
import { useState, useId } from 'react';
import { handleFileChange } from '../../utils/handleFileChange';
import * as Yup from 'yup';
import styles from './AddCategory.module.css';
import { useTranslation } from 'react-i18next';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  sectionId: Yup.number().nullable(),
  parentCategoryId: Yup.number(),
  images: Yup.array().of(Yup.string()),
});

const initialValues = {
  name: '',
  sectionId: '',
  parentCategoryId: '',
  images: [],
};

const AddCategory = ({ onClose }) => {
  const categoryNameId = useId();
  const categorySectionId = useId();
  const categoryImageId = useId();
  const categoryParentCategoryId = useId();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

  // Перевірка унікальності sectionId
  const isSectionIdUnique = sectionId => {
    return !categories.some(category => category.id === sectionId);
  };

  const [images, setImages] = useState([]);

  const handleSubmit = (values, actions) => {
    let { sectionId, name, parentCategoryId } = values;
    sectionId = sectionId ? parseInt(sectionId, 10) : undefined;
    if (sectionId && !isSectionIdUnique(sectionId)) {
      alert('Такий sectionId вже існує');
      return;
    }

    // const resultValues = { ...values, images: images };
    const resultValues = {
      id: sectionId || undefined,
      name,
      parentCategoryId,
      images: null,
    };

    if (sectionId) {
      dispatch(
        addCategoryWithId({ categoryData: { ...resultValues, id: sectionId } })
      );
    } else {
      dispatch(addCategory({ categoryData: resultValues }));
    }
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
          <label htmlFor={categoryNameId}>
            {t('description.categories.Name')}
          </label>
          <Field type="text" name="name" id={categoryNameId} />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label htmlFor={categorySectionId}>
            {t('description.categories.SectionId')}
          </label>
          <Field
            type="number"
            name="sectionId"
            id={categorySectionId}
            className={styles['custom-number-input']}
          />
          <ErrorMessage name="sectionId" component="span" />
        </div>
        <div>
          <label htmlFor={categoryParentCategoryId}>
            {t('description.categories.ParentId')}
          </label>
          <Field
            type="number"
            name="parentCategoryId"
            id={categoryParentCategoryId}
            className={styles['custom-number-input']}
          />
          <ErrorMessage name="parentCategoryId" component="span" />
        </div>
        <div>
          <label htmlFor={categoryImageId}>
            {t('description.categories.Images')}
          </label>
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

export default AddCategory;
