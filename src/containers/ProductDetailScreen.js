import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import CText from '../components/common/CText';
import {styles} from '../themes';
import CHeader from '../components/common/CHeader';
import strings from '../i18n/strings';

export default function ProductDetailScreen({navigation, route}) {
  const item = route.params?.item;

  const RenderDetailComponent = ({title, description}) => {
    return (
      <View>
        <CText type={'B16'} style={styles.mt10}>
          {title + ': '}
        </CText>
        <CText type={'M16'} style={styles.mt5}>
          {description}
        </CText>
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyles.rootContainer}>
        <CText type={'B20'}>{item.title}</CText>
        <RenderDetailComponent
          title={strings.productDescription}
          description={item?.description}
        />
        <RenderDetailComponent
          title={strings.productMaterials}
          description={item?.material}
        />
        <RenderDetailComponent
          title={strings.adjective}
          description={item?.adjective}
        />
        <RenderDetailComponent
          title={strings.productPrice}
          description={'₹' + item?.price}
        />
      </ScrollView>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  rootContainer: {
    ...styles.ph20,
    ...styles.pv10,
  },
});
