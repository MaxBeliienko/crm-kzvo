import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateGoods } from '../../redux/goods/operations';
import * as Yup from 'yup';
import { useId, useState } from 'react';
import styles from '../addProduct/AddProduct.module.css';
import { handleFileChange } from '../../utils/handleFileChange';
import { useTranslation } from 'react-i18next';
import { selectGoods } from '../../redux/goods/selectors';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  price: Yup.number().required('Required').positive('Price must be positive'),
  code: Yup.number().required('Required'),
  precode: Yup.string()
    .matches(/^\d{1,6}$/, 'Too long!')
    .required('Required'),
  pcsGood: Yup.boolean().required('Required'),
  idSection: Yup.number(),
  idTemplate: Yup.number(),
  barcodeCoding: Yup.string(),
  description: Yup.string(),
  before_validity: Yup.number(),
  type: Yup.string(),
  image: Yup.array().of(Yup.string()),
  // image: Yup.string(),
  weight: Yup.number(),
  taraWeight: Yup.number(),
});

const EditGoods = ({ product, onClose }) => {
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

  // Функція для зміни роздільника в price
  const formatPriceWithDot = value => {
    if (typeof value === 'string') {
      return value.replace(',', '.');
    }
    return value;
  };

  // Функція для нормалізації числа перед відправкою (щоб було з крапкою)
  const normalizePrice = value => {
    if (typeof value === 'string') {
      return value.replace(',', '.');
    }
    return value;
  };

  const {
    name,
    precode,
    price,
    image,
    weight,
    taraWeight,
    code,
    pcsGood,
    type,
    before_validity,
    description,
    barcodeCoding,
    idSection,
    idTemplate,
  } = product;

  const initialValues = {
    name: name,
    price: price,
    code: code,
    precode: precode,
    pcsGood: pcsGood,
    idSection: idSection,
    idTemplate: idTemplate,
    barcodeCoding: barcodeCoding,
    description: description || '',
    before_validity: before_validity,
    type: type,
    image: '',
    weight: weight,
    taraWeight: taraWeight,
  };

  const dispatch = useDispatch();

  const { t } = useTranslation();
  const goods = useSelector(selectGoods);

  // Локальний стан для зображень
  const [images, setImages] = useState([]);

  const isPreCodeUnique = (precode, product) => {
    return !goods.some(
      item => item.precode === precode && item.id !== product.id
    );
  };

  const handleSubmit = (values, actions) => {
    const priceValue =
      typeof values.price === 'string'
        ? values.price.replace(',', '.')
        : values.price;

    const normalizedPrice = parseFloat(priceValue);

    if (isNaN(normalizedPrice) || normalizedPrice <= 0) {
      alert('Будь ласка, введіть коректну ціну.');
      return;
    }

    const type = values.pcsGood ? 1 : 'кг';
    const preсode = values.precode;
    if (!isPreCodeUnique(preсode, product)) {
      alert('Такий precode вже існує!!!');
      return;
    }
    const resultValues = {
      ...values,
      price: normalizedPrice,
      image: images,
      type,
    };

    dispatch(
      updateGoods({
        databaseId: 1,
        goodsId: product.id,
        goodsData: resultValues,
      })
    );
    onClose();
  };

  return (
    <Formik
      initialValues={{
        ...initialValues,
        price: formatPriceWithDot(initialValues.price),
      }}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setValues, setFieldValue }) => {
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
                type="text"
                name="price"
                id={productPriceId}
                className={styles['custom-number-input']}
                onChange={e => {
                  const value = e.target.value
                    .replace(/[^\d.]/g, '')
                    .replace(/(\..*)\..*/g, '$1');
                  setValues({
                    ...values,
                    price: value,
                  });
                }}
              />
              <ErrorMessage name="price" component="span" />
            </div>

            <div>
              <label htmlFor={productPrecodeId}>
                {t('description.product.Precode')}
              </label>
              <Field
                type="number"
                name="precode"
                id={productPrecodeId}
                className={styles['custom-number-input']}
              />

              <ErrorMessage name="precode" component="span" />
            </div>
            <div>
              <label htmlFor={productCodeId}>
                {t('description.product.Code')}
              </label>
              <Field
                type="number"
                name="code"
                id={productCodeId}
                className={styles['custom-number-input']}
              />
              <ErrorMessage name="code" component="span" />
            </div>
            <div>
              <label htmlFor={productIdSectionId}>
                {t('description.product.IdSection')}
              </label>
              <Field
                type="number"
                name="idSection"
                id={productIdSectionId}
                className={styles['custom-number-input']}
              />
              <ErrorMessage name="idSection" component="span" />
            </div>
            <div>
              <label htmlFor={productIdTemplateId}>
                {t('description.product.IdTemplate')}
              </label>
              <Field
                type="number"
                name="idTemplate"
                id={productIdTemplateId}
                className={styles['custom-number-input']}
              />
              <ErrorMessage name="idTemplate" component="span" />
            </div>
            <div>
              <div id={productPcsGoodId}>
                {t('description.product.PcsGood')}
              </div>
              <div
                role="group"
                aria-labelledby="my-radio-group"
                className={styles['radio-group']}
              >
                <label>
                  <Field
                    type="radio"
                    name="pcsGood"
                    value="false"
                    checked={values.pcsGood === false}
                    onChange={() => setValues({ ...values, pcsGood: false })}
                  />
                  {t('description.product.Weighted')}
                </label>
                <label htmlFor={`${productPcsGoodId}-piece`}>
                  <Field
                    type="radio"
                    name="pcsGood"
                    id={`${productPcsGoodId}-piece`}
                    value="true"
                    checked={values.pcsGood === true}
                    onChange={() => setValues({ ...values, pcsGood: true })}
                  />
                  {t('description.product.ByPiece')}
                </label>
              </div>
              <ErrorMessage name="pcsGood" component="span" />
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
                cols="300"
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
                name="before_validity"
                id={productBeforeValidityId}
                className={styles['custom-number-input']}
              />
              <ErrorMessage name="before_validity" component="span" />
            </div>
            <div>
              <label htmlFor={productTypeId}>
                {t('description.product.Type')}
              </label>
              <Field type="text" name="type" id={productTypeId} />
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
            {/* <div style={{ display: 'none' }}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`preview-${index}`}
                  style={{ width: '100px', height: '100px' }}
                />
              ))}
            </div> */}
            <div>
              <label htmlFor={productWeightId}>
                {t('description.product.Weight')}
              </label>
              <Field type="number" name="weight" id={productWeightId} />
              <ErrorMessage name="weight" component="span" />
            </div>
            <div>
              <label htmlFor={productTaraWeightId}>
                {t('description.product.TaraWeight')}
              </label>
              <Field type="number" name="taraWeight" id={productTaraWeightId} />
              <ErrorMessage name="taraWeight" component="span" />
            </div>
            <button type="submit">{t('description.product.Submit')}</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditGoods;
