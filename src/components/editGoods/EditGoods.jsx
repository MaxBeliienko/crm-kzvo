import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { updateGoods } from '../../redux/goods/operations';
import * as Yup from 'yup';
import { useId } from 'react';
import styles from '../addProduct/AddProduct.module.css';

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
  image: Yup.array().of(Yup.string()),
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
    description: description,
    before_validity: before_validity,
    type: type,
    image: image,
    weight: weight,
    taraWeight: taraWeight,
  };

  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(
      updateGoods({ databaseId: 1, goodsId: product.id, goodsData: values })
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
          <label htmlFor={productNameId}>Name</label>
          <Field type="text" name="name" id={productNameId} />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label htmlFor={productPriceId}>Price</label>
          <Field type="number" name="price" id={productPriceId} />
          <ErrorMessage name="price" component="span" />
        </div>
        <div>
          <label htmlFor={productCodeId}>Code</label>
          <Field type="number" name="code" id={productCodeId} />
          <ErrorMessage name="code" component="span" />
        </div>
        <div>
          <label htmlFor={productPrecodeId}>Precode</label>
          <Field type="number" name="precode" id={productPrecodeId} />

          <ErrorMessage name="precode" component="span" />
        </div>
        <div>
          <label htmlFor={productPcsGoodId}>By weight or piece</label>
          <Field type="boolean" name="pcsGood" id={productPcsGoodId} />
          <ErrorMessage name="pcsGood" component="span" />
        </div>
        <div>
          <label htmlFor={productIdSectionId}>Id section</label>
          <Field type="number" name="idSection" id={productIdSectionId} />
          <ErrorMessage name="idSection" component="span" />
        </div>
        <div>
          <label htmlFor={productIdTemplateId}>Id template</label>
          <Field type="number" name="idTemplate" id={productIdTemplateId} />
          <ErrorMessage name="idTemplate" component="span" />
        </div>
        <div>
          <label htmlFor={productBarcodeCodingId}>Barcode</label>
          <Field
            type="string"
            name="barcodeCoding"
            id={productBarcodeCodingId}
          />
          <ErrorMessage name="barcodeCoding" component="span" />
        </div>
        <div>
          <label htmlFor={productDescriptionId}>Description</label>
          <Field
            as="textarea"
            cols="20"
            rows="5"
            name="description"
            id={productDescriptionId}
          />
          <ErrorMessage name="description" component="span" />
        </div>
        <div>
          <label htmlFor={productBeforeValidityId}>Before validity</label>
          <Field
            type="number"
            name="before_validity"
            id={productBeforeValidityId}
          />
          <ErrorMessage name="before_validity" component="span" />
        </div>
        <div>
          <label htmlFor={productTypeId}>Type</label>
          <Field type="string" name="type" id={productTypeId} />
          <ErrorMessage name="type" component="span" />
        </div>
        <div>
          <label htmlFor={productImageId}>Image</label>
          <Field type="file" name="image" id={productImageId} />
          <ErrorMessage name="image" component="span" />
        </div>
        <div>
          <label htmlFor={productWeightId}>Weight</label>
          <Field type="number" name="weight" id={productWeightId} />
          <ErrorMessage name="weight" component="span" />
        </div>
        <div>
          <label htmlFor={productTaraWeightId}>Tara weight</label>
          <Field type="number" name="taraWeight" id={productTaraWeightId} />
          <ErrorMessage name="taraWeight" component="span" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default EditGoods;
