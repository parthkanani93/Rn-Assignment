import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';
import {useIsFocused} from '@react-navigation/native';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import {colors, styles} from '../themes';
import CHeader from '../components/common/CHeader';
import strings from '../i18n/strings';
import {AddIcon, DeleteIcon, EditIcon} from '../assets/svg';
import {moderateScale} from '../common/constants';
import CText from '../components/common/CText';
import {StackNav} from '../navigation/NavigationKeys';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteProductAction,
  getProductAction,
} from '../redux/action/homeAction';
import CLoader from '../components/common/CLoader';
import {showPopupWithOkAndCancel} from '../utils/helpers';

export default function HomeScreen({navigation}) {
  const iconScale = moderateScale(22);
  const product = useSelector(state => state.home.products);
  const isLoading = useSelector(state => state.home.loader);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && fetchProducts();
  }, [isFocused]);

  const fetchProducts = async () => {
    dispatch(getProductAction());
  };

  const onPressAdd = () =>
    navigation.navigate(StackNav.AddProductScreen, {isEdit: false});

  const onPressEdit = item =>
    navigation.navigate(StackNav.AddProductScreen, {isEdit: true, item});

  const onPressDetail = item =>
    navigation.navigate(StackNav.ProductDetailScreen, {item});

  const onPressDelete = id => {
    showPopupWithOkAndCancel(
      strings.deleteProduct,
      strings.areYouSureToDeleteProduct,
      () => dispatch(deleteProductAction(id)),
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressDetail(item)}
        style={localStyles.productContainer}>
        <CText type={'B20'}>{item.title}</CText>
        <CText type={'M16'} numberOfLines={2}>
          {item.description}
        </CText>
        <View style={localStyles.priceContainer}>
          <CText type={'S20'} numberOfLines={2}>
            {'₹'} {item?.price}
          </CText>
          <View style={styles.rowCenter}>
            <TouchableOpacity
              onPress={() => onPressEdit(item)}
              style={styles.ph5}>
              <EditIcon width={iconScale} height={iconScale} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressDelete(item?.id)}
              style={styles.ph5}>
              <DeleteIcon width={iconScale} height={iconScale} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderEmptyContainer = () => {
    return (
      <View style={localStyles.emptyContainer}>
        {!product.length && !isLoading && (
          <CText type={'B18'} align={'center'}>
            {strings.noProductsFound}
          </CText>
        )}
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader leftIcon title={strings.home} />
      <View style={styles.flex}>
        <FlashList
          data={product}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={5}
          ListEmptyComponent={<RenderEmptyContainer />}
          contentContainerStyle={localStyles.flatListContainer}
        />
        <TouchableOpacity
          onPress={onPressAdd}
          style={localStyles.addButtonStyle}>
          <AddIcon width={moderateScale(24)} height={moderateScale(24)} />
        </TouchableOpacity>
      </View>
      {isLoading && <CLoader />}
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  productContainer: {
    ...styles.flex,
    ...styles.mv10,
    gap: moderateScale(7),
  },
  priceContainer: {
    ...styles.rowSpaceBetween,
  },
  addButtonStyle: {
    position: 'absolute',
    bottom: moderateScale(25),
    right: moderateScale(20),
    backgroundColor: colors.black,
    borderRadius: moderateScale(30),
    height: moderateScale(55),
    width: moderateScale(55),
    ...styles.center,
  },
  flatListContainer: {
    ...styles.ph20,
    ...styles.pb90,
  },
  emptyContainer: {
    ...styles.p20,
  },
});
