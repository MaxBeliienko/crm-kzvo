import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addGoods } from '../../redux/goods/operations';
import { selectGoods } from '../../redux/goods/selectors';
import * as Yup from 'yup';
import { useEffect, useId, useState } from 'react';
import styles from './AddProduct.module.css';
import { handleFileChange } from '../../utils/handleFileChange';
import { useTranslation } from 'react-i18next';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  price: Yup.number().required('Required').positive('Price must be positive'),
  code: Yup.number().required('Required'),
  precode: Yup.string()
    .matches(/^\d{1,6}$/, 'Too long!')
    .required('Required'),
  idSection: Yup.number(),
  idTemplate: Yup.number(),
  barcodeCoding: Yup.string().required('Required'),
  description: Yup.string(),
  before_validity: Yup.number(),
  type: Yup.string(),
  image: Yup.array().of(Yup.string()),
  weight: Yup.number(),
  taraWeight: Yup.number(),
});

const initialValues = {
  name: '',
  price: 0,
  code: 0,
  precode: 0,
  idSection: 0,
  idTemplate: 0,
  barcodeCoding: '',
  description: '',
  before_validity: 0,
  type: 'кг',
  image: [],
  weight: 1,
  taraWeight: 0,
};

const AddProduct = ({ onClose }) => {
  const productNameId = useId();
  const productPriceId = useId();
  const productCodeId = useId();
  const productPrecodeId = useId();
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

  const { t } = useTranslation();

  const goods = useSelector(selectGoods);

  // Перевірка унікальності preCode
  const isPreCodeUnique = precode => {
    return !goods.some(product => product.precode === precode);
  };

  // Перевіряємо значення полів форми з localStorage
  const loadSavedValues = () => {
    const savedValues = localStorage.getItem('addProductForm');
    return savedValues ? JSON.parse(savedValues) : initialValues;
  };

  // Стан для зображень
  const [images, setImages] = useState([]);

  const handleSubmit = (values, actions) => {
    const preсode = values.precode;
    if (!isPreCodeUnique(preсode)) {
      alert('Такий precode вже існує!!!');
      return;
    }
    const resultValues = { ...values, image: null };
    dispatch(
      addGoods({
        goodsData: resultValues,
        imageBase64: images[0],
      })
    );
    localStorage.removeItem('addProductForm');
    onClose();
  };

  return (
    <Formik
      initialValues={loadSavedValues()}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, resetForm }) => {
        // Зберігаємо дані в localStorage при зміні полів
        useEffect(() => {
          localStorage.setItem('addProductForm', JSON.stringify(values));
        }, [values]);
        return (
          <Form className={styles.form}>
            <div>
              <label htmlFor={productNameId}>
                {t('description.product.Name')}
              </label>
              <Field type="text" name="name" id={productNameId} />
              <ErrorMessage name="name" component="span" />
            </div>
            <div>
              <label htmlFor={productPriceId}>
                {t('description.product.Price')}
              </label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="price"
                id={productPriceId}
              />
              <ErrorMessage name="price" component="span" />
            </div>

            <div>
              <label htmlFor={productPrecodeId}>
                {t('description.product.Precode')}
              </label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="precode"
                id={productPrecodeId}
              />

              <ErrorMessage name="precode" component="span" />
            </div>
            <div>
              <label htmlFor={productCodeId}>
                {t('description.product.Code')}
              </label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="code"
                id={productCodeId}
              />
              <ErrorMessage name="code" component="span" />
            </div>
            <div>
              <label htmlFor={productIdSectionId}>
                {t('description.product.IdSection')}
              </label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="idSection"
                id={productIdSectionId}
              />
              <ErrorMessage name="idSection" component="span" />
            </div>
            <div>
              <label htmlFor={productIdTemplateId}>
                {t('description.product.IdTemplate')}
              </label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="idTemplate"
                id={productIdTemplateId}
              />
              <ErrorMessage name="idTemplate" component="span" />
            </div>
            <div>
              <label htmlFor={productBarcodeCodingId}>
                {t('description.product.Barcode')}
              </label>
              <Field
                type="text"
                name="barcodeCoding"
                id={productBarcodeCodingId}
              />
              <ErrorMessage name="barcodeCoding" component="span" />
            </div>
            <div>
              <label htmlFor={productDescriptionId}>
                {t('description.product.Description')}
              </label>
              <Field
                as="textarea"
                rows="3"
                name="description"
                id={productDescriptionId}
              />
              <ErrorMessage name="description" component="span" />
            </div>
            <div>
              <label htmlFor={productBeforeValidityId}>
                {t('description.product.BeforeValidity')}
              </label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="before_validity"
                id={productBeforeValidityId}
              />
              <ErrorMessage name="before_validity" component="span" />
            </div>
            <div>
              <div id={productTypeId}>{t('description.product.Type')}</div>
              <div
                role="group"
                aria-labelledby="my-radio-group"
                className={styles['radio-group']}
              >
                <label>
                  <Field
                    type="radio"
                    name="type"
                    value="кг"
                    checked={values.type === 'кг'}
                    onChange={() => setFieldValue('type', 'кг')}
                  />
                  {t('description.product.Weighted')}
                </label>
                <label htmlFor={`${productTypeId}-piece`}>
                  <Field
                    type="radio"
                    name="type"
                    id={`${productTypeId}-piece`}
                    value="1"
                    checked={values.type === '1'}
                    onChange={() => setFieldValue('type', '1')}
                  />
                  {t('description.product.ByPiece')}
                </label>
              </div>
              <ErrorMessage name="type" component="span" />
            </div>

            <div>
              <label htmlFor={productImageId}>
                {t('description.product.Image')}
              </label>
              <Field
                type="file"
                name="image"
                id={productImageId}
                accept="image/*"
                onChange={event => handleFileChange(event, setImages)}
              />
              <ErrorMessage name="image" component="span" />
            </div>
            <div style={{ display: 'none' }}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`preview-${index}`}
                  style={{ width: '100px', height: '100px' }}
                />
              ))}
            </div>
            <div>
              <label htmlFor={productWeightId}>
                {t('description.product.Weight')}
              </label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="weight"
                id={productWeightId}
              />
              <ErrorMessage name="weight" component="span" />
            </div>
            <div>
              <label htmlFor={productTaraWeightId}>
                {t('description.product.TaraWeight')}
              </label>
              <Field
                type="number"
                className={styles['custom-number-input']}
                name="taraWeight"
                id={productTaraWeightId}
              />
              <ErrorMessage name="taraWeight" component="span" />
            </div>
            <button type="submit">{t('description.product.Submit')}</button>
            <button
              type="button"
              onClick={() => {
                resetForm();
              }}
            >
              {t('description.product.Reset')}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProduct;
