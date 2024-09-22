import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { addGoods } from '../../redux/goods/operations';
import * as Yup from 'yup';
import { useEffect, useId } from 'react';
import styles from './AddProduct.module.css';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  price: Yup.number().required('Required').positive('Price must be positive'),
  code: Yup.number().required('Required'),
  precode: Yup.number().required('Required'),
  pcsGood: Yup.boolean().required('Required'),
  idSection: Yup.number(),
  idTemplate: Yup.number(),
  barcodeCoding: Yup.string(),
  description: Yup.string(),
  before_validity: Yup.number(),
  type: Yup.string(),
  // image: Yup.array().of(Yup.string()),
  image: Yup.string(),
  weight: Yup.number(),
  taraWeight: Yup.number(),
});

const initialValues = {
  name: '',
  price: 0,
  code: 0,
  precode: 0,
  pcsGood: false,
  idSection: 0,
  idTemplate: 0,
  barcodeCoding: '',
  description: '',
  before_validity: 0,
  type: '',
  image: '',
  weight: 1,
  taraWeight: 0,
};

const AddProduct = ({ onClose }) => {
  const productNameId = useId();
  const productPriceId = useId();
  const productCodeId = useId();
  const productPrecodeId = useId();
  const productPcsGoodId = useId();
  const productIdSectionId = useId();
  const productIdTemplateId = useId();
  const productBarcodeCodingId = useId();
  const productDescriptionId = useId();
  const productBeforeValidityId = useId();
  const productTypeId = useId();
  const productImageId = useId();
  const productWeightId = useId();
  const productTaraWeightId = useId();

  const dispatch = useDispatch();

  const loadSavedValues = () => {
    const savedValues = localStorage.getItem('addProductForm');
    return savedValues ? JSON.parse(savedValues) : initialValues;
  };

  const handleSubmit = (values, actions) => {
    dispatch(addGoods({ databaseId: 1, goodsData: values }));
    localStorage.removeItem('addProductForm');
    onClose();
  };

  return (
    <Formik
      initialValues={loadSavedValues()}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setValues }) => {
        // Зберігаємо дані в localStorage при зміні полів
        useEffect(() => {
          localStorage.setItem('addProductForm', JSON.stringify(values));
        }, [values]);
        return (
          <Form className={styles.form}>
            <div>
              <label htmlFor={productNameId}>Name</label>
              <Field type="text" name="name" id={productNameId} />
              <ErrorMessage name="name" component="span" />
            </div>
            <div>
              <label htmlFor={productPriceId}>Price</label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="price"
                id={productPriceId}
              />
              <ErrorMessage name="price" component="span" />
            </div>
            <div>
              <label htmlFor={productCodeId}>Code</label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="code"
                id={productCodeId}
              />
              <ErrorMessage name="code" component="span" />
            </div>
            <div>
              <label htmlFor={productPrecodeId}>Precode</label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="precode"
                id={productPrecodeId}
              />

              <ErrorMessage name="precode" component="span" />
            </div>
            <div>
              <label htmlFor={productPcsGoodId}>By weight or piece</label>
              <Field
                className={styles.check}
                type="checkbox"
                name="pcsGood"
                id={productPcsGoodId}
              />
              <ErrorMessage name="pcsGood" component="span" />
            </div>
            <div>
              <label htmlFor={productIdSectionId}>Id section</label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="idSection"
                id={productIdSectionId}
              />
              <ErrorMessage name="idSection" component="span" />
            </div>
            <div>
              <label htmlFor={productIdTemplateId}>Id template</label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="idTemplate"
                id={productIdTemplateId}
              />
              <ErrorMessage name="idTemplate" component="span" />
            </div>
            <div>
              <label htmlFor={productBarcodeCodingId}>Barcode</label>
              <Field
                type="text"
                name="barcodeCoding"
                id={productBarcodeCodingId}
              />
              <ErrorMessage name="barcodeCoding" component="span" />
            </div>
            <div>
              <label htmlFor={productDescriptionId}>Description</label>
              <Field
                as="textarea"
                rows="3"
                name="description"
                id={productDescriptionId}
              />
              <ErrorMessage name="description" component="span" />
            </div>
            <div>
              <label htmlFor={productBeforeValidityId}>Before validity</label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="before_validity"
                id={productBeforeValidityId}
              />
              <ErrorMessage name="before_validity" component="span" />
            </div>
            <div>
              <label htmlFor={productTypeId}>Type</label>
              <Field type="text" name="type" id={productTypeId} />
              <ErrorMessage name="type" component="span" />
            </div>
            <div>
              <label htmlFor={productImageId}>Image</label>
              <Field type="text" name="image" id={productImageId} />
              <ErrorMessage name="image" component="span" />
            </div>
            <div>
              <label htmlFor={productWeightId}>Weight</label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="weight"
                id={productWeightId}
              />
              <ErrorMessage name="weight" component="span" />
            </div>
            <div>
              <label htmlFor={productTaraWeightId}>Tara weight</label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="taraWeight"
                id={productTaraWeightId}
              />
              <ErrorMessage name="taraWeight" component="span" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProduct;
