import React, {useState} from 'react';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import CHeader from '../components/common/CHeader';
import strings from '../i18n/strings';
import KeyBoardAvoidWrapper from '../components/common/KeyBoardAvoidWrapper';
import {styles} from '../themes';
import CInput from '../components/common/CInput';
import CButton from '../components/common/CButton';
import {showPopupWithOk} from '../utils/helpers';

export default function AddProductScreen({navigation, route}) {
  const isEdit = route.params?.isEdit;
  const item = route.params?.item;
  const [productTitle, setProductTitle] = useState(item?.title || '');
  const [productDescription, setProductDescription] = useState(
    item?.description || '',
  );
  const [productPrice, setProductPrice] = useState(item?.price || '');
  const [productMaterials, setProductMaterials] = useState(
    item?.material || '',
  );
  const [productAdjective, setProductAdjective] = useState(
    item?.adjective || '',
  );

  const onChangeProductTitle = val => setProductTitle(val);
  const onChangeProductDescription = val => setProductDescription(val);
  const onChangeProductPrice = val => setProductPrice(val);
  const onChangeProductMaterials = val => setProductMaterials(val);
  const onChangeProductAdjective = val => setProductAdjective(val);

  const onPressAddProduct = () => {
    if (!productTitle) {
      showPopupWithOk(strings.appTitle, strings.plsEnterProductTitle);
      return;
    }

    if (!productDescription) {
      showPopupWithOk(strings.appTitle, strings.plsEnterProductDescription);
      return;
    }
    if (!productPrice) {
      showPopupWithOk(strings.appTitle, strings.plsEnterProductPrice);
      return;
    }

    console.log('onPressAddProduct');
  };

  return (
    <CSafeAreaView>
      <CHeader title={isEdit ? strings.editProduct : strings.addProduct} />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.ph20}>
        <CInput
          label={strings.productTitle}
          placeholder={strings.enterProductTitle}
          toGetTextFieldValue={onChangeProductTitle}
          _value={productTitle}
        />
        <CInput
          label={strings.productDescription}
          placeholder={strings.enterProductDescription}
          toGetTextFieldValue={onChangeProductDescription}
          _value={productDescription}
          multiline
        />
        <CInput
          label={strings.productMaterials}
          placeholder={strings.enterProductMaterials}
          toGetTextFieldValue={onChangeProductMaterials}
          _value={productMaterials}
        />
        <CInput
          label={strings.adjective}
          placeholder={strings.addProduct}
          toGetTextFieldValue={onChangeProductAdjective}
          _value={productAdjective}
        />
        <CInput
          label={strings.productPrice}
          placeholder={strings.enterProductPrice}
          toGetTextFieldValue={onChangeProductPrice}
          _value={productPrice}
          keyBoardType={'number-pad'}
        />
      </KeyBoardAvoidWrapper>
      <CButton
        title={isEdit ? strings.save : strings.add}
        onPress={onPressAddProduct}
        containerStyle={styles.m20}
      />
    </CSafeAreaView>
  );
}
