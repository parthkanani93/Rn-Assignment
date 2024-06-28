import {ScrollView} from 'react-native';
import React from 'react';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import CText from '../components/common/CText';
import {styles} from '../themes';
import CHeader from '../components/common/CHeader';

export default function ProductDetailScreen({navigation, route}) {
  const item = route.params?.item;
  return (
    <CSafeAreaView>
      <CHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.p20}>
        <CText type={'B20'}>{item.title}</CText>
        <CText type={'M16'} style={styles.mt10}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
          }
        </CText>
        <CText type={'S20'} style={styles.mt10} numberOfLines={2}>
          {'₹320'}
        </CText>
      </ScrollView>
    </CSafeAreaView>
  );
}
