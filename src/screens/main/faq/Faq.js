import React, {useState} from 'react';
import {
  Text,
  StatusBar,
  useWindowDimensions,
  ScrollView,
  FlatList,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../../../components/AppBar';
import {GlobalStyle, Font, Window, Color} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import {List} from 'react-native-paper';
import {TabBar} from 'react-native-tab-view';
import {TabView, SceneMap} from 'react-native-tab-view';
import TextField from '../../../components/TextFeild';
import {AccordianData, Data, ContactData} from './FaqDetails';

import styles from './FaqStyle';
import {color} from 'react-native-reanimated';
import {useBackButton} from '../../../hooks';

const FaqTabs = ({item, setState, state}) => {
  const handleClick = itemID => {
    setState(itemID);
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.goalContainer,
        backgroundColor: state == item.id ? Color.primary : Color.light,
      }}
      onPress={() => handleClick(item.id)}>
      <Text
        style={{
          ...styles.goalsTextStyle,
          color: state == item.id ? Color.light : Color.primary,
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const ContactDetails = ({item}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 72,
          shadowColor: 'rgba(0,0,0,0.5)',
          borderColor: Color.grey,
          backgroundColor: Color.light,
          shadowOpacity: 0.1,
          shadowRadius: 2.84,
          paddingHorizontal: 20,
          borderWidth: 1,
          borderRadius: 20,
          marginVertical: 12,
          alignItems: 'center',
        }}>
        <Icon
          iconFamily={'MaterialCommunityIcons'}
          name={item.icon}
          size={20}
          color={Color.primary}
        />
        <Text style={{...GlobalStyle.Heading, marginLeft: 10, fontSize: 18}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Accordian = ({item}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion
        id="1"
        style={{backgroundColor: Color.light}}
        titleStyle={{
          color: Color.secondary,
          fontFamily: Font.Urbanist_Bold,
          lineHeight: 21.6,
          fontSize: 16,
        }}
        titleNumberOfLines={2}
        title={item.itemss}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item
          titleStyle={{
            color: Color.darkGray,
            fontSize: 14,
            lineHeight: 19.6,
            fontFamily: Font.Urbanist_Medium,
          }}
          titleNumberOfLines={4}
          title={item.text}
        />
      </List.Accordion>
    </List.Section>
  );
};

const FaqActive = () => {
  const [active, setActive] = useState(1);
  return (
    <ScrollView>
      {/* <View style={{marginVertical: 24}}>
        <FlatList
          data={Data}
          renderItem={({item}) => (
            <FaqTabs state={active} setState={setActive} item={item} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator
          pagingEnabled
          ItemSeparatorComponent={() => <View style={{width: 15}} />}
        />
      </View>*/}
      <TextField placeholder="Search" icon="magnify" />

      <View style={{}}>
        <FlatList
          data={AccordianData}
          renderItem={({item}) => (
            <Accordian state={active} setState={setActive} item={item} />
          )}
          horizontal={false}
          showsHorizontalScrollIndicator
          pagingEnabled
          ItemSeparatorComponent={() => <View style={{width: 15}} />}
        />
      </View>
    </ScrollView>
  );
};

const ContactUsRoute = () => {
  const [active, setActive] = useState(1);

  return (
    <View style={{marginVertical: 0}}>
      <FlatList
        data={ContactData}
        renderItem={({item}) => (
          <ContactDetails state={active} setState={setActive} item={item} />
        )}
        horizontal={false}
        showsHorizontalScrollIndicator
        pagingEnabled
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
      />
    </View>
  );
};

const renderScene = SceneMap({
  faq: FaqActive,
  contactus: ContactUsRoute,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: Color.primary,
      height: 4,
      borderRadius: 100,
      color: Color.brightRed,
    }}
    labelStyle={{
      color: Color.black,
      fontSize: 14,
      fontWeight: '600',
      margin: 'auto',
    }}
    style={{backgroundColor: Color.light}}
    activeColor={Color.primary}
    inactiveColor={Color.lightGray}
  />
);

const Faq = ({route, navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'faq', title: 'Faq'},
    {key: 'contactus', title: 'Contact-us'},
  ]);
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <AppBar
        left={
          <TouchableOpacity
            onPress={() =>
              route.params.fromBurger
                ? navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'BottomTabScreen',
                      },
                    ],
                  })
                : navigation.goBack()
            }>
            <Icon
              iconFamily={'Octicons'}
              name="arrow-left"
              size={25}
              color={Color.tertiary}
            />
          </TouchableOpacity>
        }
        center={<Text style={GlobalStyle.AppCenterTextStyle}>Help Center</Text>}
        // right={
        //   <TouchableOpacity onPress={() => navigation.navigate('ChatOpen')}>
        //     <Icon
        //       iconFamily={'Ionicons'}
        //       name={'ios-ellipsis-horizontal-circle'}
        //       color={Color.secondary}
        //       size={25}
        //     />
        //   </TouchableOpacity>
        // }
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
      <View style={GlobalStyle.borderStyle} />
    </SafeAreaView>
  );
};

export default Faq;
