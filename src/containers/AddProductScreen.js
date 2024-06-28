import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import CHeader from '../components/common/CHeader';
import strings from '../i18n/strings';
import KeyBoardAvoidWrapper from '../components/common/KeyBoardAvoidWrapper';
import {styles} from '../themes';
import CInput from '../components/common/CInput';
import CButton from '../components/common/CButton';
import {showPopupWithOk, validateField} from '../utils/helpers';
import {
  addProductAction,
  updateProductAction,
} from '../redux/action/homeAction';
import CLoader from '../components/common/CLoader';

export default function AddProductScreen({navigation, route}) {
  const isLoading = useSelector(state => state.home.loader);
  const isEdit = route.params?.isEdit;
  const item = route.params?.item;
  const dispatch = useDispatch();
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
  const [productTitleError, setProductTitleError] = useState('');
  const [productDescriptionError, setProductDescriptionError] = useState('');
  const [productPriceError, setProductPriceError] = useState('');
  const [productMaterialsError, setProductMaterialsError] = useState('');
  const [productAdjectiveError, setProductAdjectiveError] = useState('');

  const onChangeProductTitle = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterProductTitle);
    setProductTitle(val);
    setProductTitleError(msg);
  };

  const onChangeProductDescription = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterProductDescription);
    setProductDescription(val);
    setProductDescriptionError(msg);
  };
  const onChangeProductPrice = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterProductPrice);
    setProductPrice(val);
    setProductPriceError(msg);
  };
  const onChangeProductMaterials = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterProductMaterials);
    setProductMaterials(val);
    setProductMaterialsError(msg);
  };
  const onChangeProductAdjective = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterProductAdjective);
    setProductAdjective(val);
    setProductAdjectiveError(msg);
  };

  const onPressAddProduct = () => {
    if (
      !productTitle ||
      !productDescription ||
      !productPrice ||
      !productMaterials ||
      !productAdjective ||
      productTitleError ||
      productDescriptionError ||
      productPriceError ||
      productMaterialsError ||
      productAdjectiveError
    ) {
      onChangeProductTitle(productTitle);
      onChangeProductDescription(productDescription);
      onChangeProductMaterials(productMaterials);
      onChangeProductAdjective(productAdjective);
      onChangeProductPrice(productPrice);
      return;
    }

    if (isEdit) {
      dispatch(
        updateProductAction(
          item?.id,
          {
            id: item?.id,
            title: productTitle,
            description: productDescription,
            price: productPrice,
            material: productMaterials,
            adjective: productAdjective,
          },
          successAdd,
        ),
      );
    } else {
      dispatch(
        addProductAction(
          {
            title: productTitle,
            description: productDescription,
            price: productPrice,
            material: productMaterials,
            adjective: productAdjective,
          },
          successAdd,
        ),
      );
    }
  };

  const successAdd = desc => {
    if (!isLoading) {
      showPopupWithOk(strings.appTitle, desc, () => navigation.goBack());
    }
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
          _errorText={productTitleError}
        />
        <CInput
          label={strings.productDescription}
          placeholder={strings.enterProductDescription}
          toGetTextFieldValue={onChangeProductDescription}
          _value={productDescription}
          _errorText={productDescriptionError}
          multiline
        />
        <CInput
          label={strings.productMaterials}
          placeholder={strings.enterProductMaterials}
          toGetTextFieldValue={onChangeProductMaterials}
          _value={productMaterials}
          _errorText={productMaterialsError}
        />
        <CInput
          label={strings.adjective}
          placeholder={strings.addProduct}
          toGetTextFieldValue={onChangeProductAdjective}
          _value={productAdjective}
          _errorText={productAdjectiveError}
        />
        <CInput
          label={strings.productPrice}
          placeholder={strings.enterProductPrice}
          toGetTextFieldValue={onChangeProductPrice}
          _value={productPrice}
          keyBoardType={'number-pad'}
          _errorText={productPriceError}
        />
      </KeyBoardAvoidWrapper>
      <CButton
        title={isEdit ? strings.save : strings.add}
        onPress={onPressAddProduct}
        containerStyle={styles.m20}
      />
      {isLoading && <CLoader />}
    </CSafeAreaView>
  );
}
