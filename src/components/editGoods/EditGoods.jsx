import { Formik, Form, Field } from 'formik';
import { useId } from 'react';

const EditGoods = ({ product, onSubmit }) => {
  const goodsNameId = useId();
  const goodsImageId = useId();
  const goodsPrecodeId = useId();
  const goodsPriceId = useId();
  const goodsWeightId = useId();
  const goodsTaraWeightId = useId();

  const { name, precode, price, image, weight, taraWeight } = product;

  return (
    <Formik
      initialValues={{
        name: name,
        image: image,
        precode: precode,
        price: price,
        weight: weight,
        teraWeight: taraWeight,
      }}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      <Form>
        <label htmlFor={goodsNameId}>Name</label>
        <Field type="text" name="name" id={goodsNameId} />
        <label htmlFor={goodsPrecodeId}>Precode</label>
        <Field type="number" name="precode" id={goodsPrecodeId} />
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
};

export default EditGoods;
