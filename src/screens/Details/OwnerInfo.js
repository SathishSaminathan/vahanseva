import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import Basic from './OwnerInfo/Basic';
import Attachments from './OwnerInfo/Attachments';
import { Colors } from '../../constants/ThemeConstants';
import TextComponent from '../../components/Shared/TextComponent';

const initialLayout = {width: Dimensions.get('window').width};

const OwnerInfo = (props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Basic', title: 'Basic'},
    {key: 'Attachments', title: 'Documents'},
  ]);

  const renderScene = SceneMap({
    Basic: () => <Basic {...props} />,
    Attachments: () => <Attachments {...props} />,
  });

  const renderLabel = ({route}) => (
    <TextComponent
      style={{
        fontFamily: 'ProximaNova-Bold',
        fontSize: 15,
        color: Colors.tabText,
      }}>
      {route.title}
    </TextComponent>
  );

  const renderHeader = (props) => (
    <TabBar
      indicatorStyle={{
        backgroundColor: Colors.primaryLightThemeColor,
        height: 1.5,
      }}
      style={{backgroundColor: Colors.accDividerColor}}
      renderLabel={renderLabel}
      {...props}
    />
  );
  return (
    <View
      style={{
        flex: 1,
      }}>
      <TabView
        navigationState={{index, routes}}
        renderTabBar={renderHeader}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};
export default OwnerInfo;
