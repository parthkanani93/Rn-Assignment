import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import {colors, styles} from '../themes';
import CHeader from '../components/common/CHeader';
import strings from '../i18n/strings';
import {AddIcon, DeleteIcon, EditIcon} from '../assets/svg';
import {moderateScale} from '../common/constants';
import CText from '../components/common/CText';
import {StackNav} from '../navigation/NavigationKeys';

export default function HomeScreen({navigation}) {
  const iconScale = moderateScale(22);

  const onPressAdd = () =>
    navigation.navigate(StackNav.AddProductScreen, {isEdit: false});
  const onPressEdit = item =>
    navigation.navigate(StackNav.AddProductScreen, {isEdit: true, item});
  const onPressDetail = item =>
    navigation.navigate(StackNav.ProductDetailScreen, {item});

  const products = [
    {
      createdAt: 1719549298,
      title: 'Intelligent Frozen Computer',
      description:
        'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
      price: '546.00',
      material: 'Rubber',
      adjective: 'Handmade',
      id: '1',
    },
    {
      createdAt: 1719549238,
      title: 'Awesome Steel Computer',
      description:
        'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
      price: '378.00',
      material: 'Soft',
      adjective: 'Ergonomic',
      id: '2',
    },
    {
      createdAt: 1719549178,
      title: 'Handmade Rubber Ball',
      description:
        'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
      price: '504.00',
      material: 'Bronze',
      adjective: 'Licensed',
      id: '3',
    },
    {
      createdAt: 1719549118,
      title: 'Unbranded Frozen Bacon',
      description:
        'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
      price: '413.00',
      material: 'Metal',
      adjective: 'Fantastic',
      id: '4',
    },
  ];

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressAdd} style={styles.ph5}>
        <AddIcon width={moderateScale(24)} height={moderateScale(24)} />
      </TouchableOpacity>
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
            <TouchableOpacity style={styles.ph5}>
              <DeleteIcon width={iconScale} height={iconScale} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader leftIcon title={strings.home} />
      <View style={styles.flex}>
        <FlashList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={5}
          contentContainerStyle={styles.ph20}
        />
        <TouchableOpacity
          onPress={onPressAdd}
          style={localStyles.addButtonStyle}>
          <AddIcon width={moderateScale(24)} height={moderateScale(24)} />
        </TouchableOpacity>
      </View>
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
    right: moderateScale(25),
    backgroundColor: colors.black,
    borderRadius: moderateScale(30),
    height: moderateScale(55),
    width: moderateScale(55),
    ...styles.center,
  },
});
