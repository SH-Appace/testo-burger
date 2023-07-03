import React, {useEffect, useState} from 'react';
import {
  Text,
  StatusBar,
  useWindowDimensions,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AppBar from '../../../components/AppBar';
import {GlobalStyle, Font, Window, Color} from '../../../globalStyle/Theme';
import {TabView} from 'react-native-tab-view';
import {TabBar} from 'react-native-tab-view';
import styles from './OrderStyle';
import {
  activeOrderReq,
  cancelOrderReq,
  completeOrderReq,
} from '../../../apis/order';
import {useSelector} from 'react-redux';
import {Modal} from 'react-native-paper';
import Button from '../../../components/Button';
import {
  ActiveOrderSvg,
  CancelOrderSvg,
  CompleteOrderSvg,
  EmptyOrderSvg,
} from '../../../assets/svgs/OrderSvgs';
import {SkypeIndicator} from 'react-native-indicators';
import BottomPopupReorder from '../../../components/BottomPopupReorder';
import {ManuIcon} from '../../../assets/svgs/SocialIconsSvgs';
import {useBackButton} from '../../../hooks';

const ActiveRoute = ({setVisible, orders, setPopupData}) => {
  let navigation = useNavigation();
  return (
    <View
      style={{
        marginVertical: 10,
        // backgroundColor: Color.light,
        marginHorizontal: Window.fixPadding * 2,
      }}>
      {orders.length > 0 ? (
        orders.map((item, index) => (
          <View style={styles.orderBox}>
            <TouchableOpacity
              onPress={() => {
                setPopupData(item.details);
                setVisible(true);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: Window.width / 4.5,
                  width: Window.width / 4.5,
                  borderRadius: Window.width / 15,
                  marginRight: 15,
                  backgroundColor: Color.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActiveOrderSvg width={Window.width / 7.5} />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.BasicHeading}>#{item.id}</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 5,
                  }}>
                  <Text style={styles.BottomMoreText}>
                    {item.details.length} Item{item.details.length > 1 && `s`}
                  </Text>
                  <Text style={styles.lineStyle}> | </Text>
                  <Text style={styles.BottomMoreText}>
                    Status: {item.order_status}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 0,
                    marginBottom: 10,
                  }}>
                  <Text style={styles.BottomMoreText}>
                    Discount: ${item.coupon_discount_amount}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.priceStyle}>${item.order_amount}</Text>

                  <View style={styles.statusBox}>
                    <Text
                      style={[
                        styles.conditionstyle,
                        {color: Color.light, textTransform: 'capitalize'},
                      ]}>
                      {item.payment_status}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={GlobalStyle.TopBorderStyle} />
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CancelOrder', {orderId: item.id})
                }
                style={{...styles.selectButtomStyle}}>
                <Text
                  style={{
                    ...styles.buttonTextStlye,
                    color: Color.primary,
                  }}>
                  Cancel Order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '90%',
          }}>
          <EmptyOrderSvg
            width={Window.width / 1.5}
            height={Window.height / 3}
          />
          <Text
            style={{
              color: Color.secondary,
              fontFamily: Font.Urbanist_Bold,
              fontSize: 22,
              marginTop: 22,
            }}>
            Empty
          </Text>
          <Text
            style={{
              color: Color.secondary,
              fontFamily: Font.Urbanist_Regular,
              fontSize: 16,
              textAlign: 'center',
              marginTop: 12,
            }}>
            You do not have an processing order at this time
          </Text>
        </View>
      )}
    </View>
  );
};

const CompletedRoute = ({setVisible, orders, setPopupData, onShowPopup}) => {
  let navigation = useNavigation();
  return (
    <View
      style={{
        marginVertical: 10,
        // backgroundColor: Color.light,
        marginHorizontal: Window.fixPadding * 2,
      }}>
      {orders.length > 0 ? (
        orders.map((item, index) => (
          <View style={styles.orderBox}>
            <TouchableOpacity
              onPress={() => {
                setPopupData(item.details);
                setVisible(true);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: Window.width / 4.5,
                  width: Window.width / 4.5,
                  borderRadius: Window.width / 15,
                  marginRight: 15,
                  backgroundColor: '#859B5D',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CompleteOrderSvg width={Window.width / 7.5} />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.BasicHeading}>#{item.id}</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Text style={styles.BottomMoreText}>
                    {item.details.length} Item{item.details.length > 1 && `s`}
                  </Text>
                  <Text style={styles.lineStyle}> | </Text>
                  <Text style={styles.BottomMoreText}>
                    Discount: ${item.coupon_discount_amount}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.priceStyle}>${item.order_amount}</Text>

                  <View
                    style={[styles.statusBox, {backgroundColor: '#859B5D'}]}>
                    <Text
                      style={[
                        styles.conditionstyle,
                        {color: Color.light, textTransform: 'capitalize'},
                      ]}>
                      {item.order_status}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={GlobalStyle.TopBorderStyle} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OrderReview', {
                    item: item,
                  })
                }
                style={{...styles.selectButtomStyle}}>
                <Text
                  style={{
                    ...styles.buttonTextStlye,
                    color: Color.primary,
                  }}>
                  Leave a Review
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onShowPopup();
                  setPopupData(item.details);
                }}
                style={{
                  ...styles.selectButtomStyle,
                  backgroundColor: Color.primary,
                }}>
                <Text
                  style={{
                    ...styles.buttonTextStlye,
                    color: Color.light,
                  }}>
                  Order Again
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '90%',
          }}>
          <EmptyOrderSvg
            width={Window.width / 1.5}
            height={Window.height / 3}
          />
          <Text
            style={{
              color: Color.secondary,
              fontFamily: Font.Urbanist_Bold,
              fontSize: 22,
              marginTop: 22,
            }}>
            Empty
          </Text>
          <Text
            style={{
              color: Color.secondary,
              fontFamily: Font.Urbanist_Regular,
              fontSize: 16,
              textAlign: 'center',
              marginTop: 12,
            }}>
            You do not have an completed order at this time
          </Text>
        </View>
      )}
    </View>
  );
};

const CancelledRoute = ({setVisible, orders, setPopupData}) => {
  const [active, setActive] = useState(1);
  let navigation = useNavigation();

  return (
    <View
      style={{
        marginVertical: 10,
        // backgroundColor: Color.light,
        marginHorizontal: Window.fixPadding * 2,
      }}>
      {orders.length > 0 ? (
        orders.map((item, index) => (
          <View style={styles.orderBox}>
            <TouchableOpacity
              onPress={() => {
                setPopupData(item.details);
                setVisible(true);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: Window.width / 4.5,
                  width: Window.width / 4.5,
                  borderRadius: Window.width / 15,
                  marginRight: 15,
                  backgroundColor: '#C0161B',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CancelOrderSvg width={Window.width / 7.5} />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.BasicHeading}>#{item.id}</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Text style={styles.BottomMoreText}>
                    {item.details.length} Item{item.details.length > 1 && `s`}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.priceStyle}>${item.order_amount}</Text>

                  <View
                    style={[
                      styles.statusBox,
                      {
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: '#F75555',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.conditionstyle,
                        {
                          color: '#F75555',
                          textTransform: 'capitalize',
                        },
                      ]}>
                      {item.order_status}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '90%',
          }}>
          <EmptyOrderSvg
            width={Window.width / 1.5}
            height={Window.height / 3}
          />
          <Text
            style={{
              color: Color.secondary,
              fontFamily: Font.Urbanist_Bold,
              fontSize: 22,
              marginTop: 22,
            }}>
            Empty
          </Text>
          <Text
            style={{
              color: Color.secondary,
              fontFamily: Font.Urbanist_Regular,
              fontSize: 16,
              textAlign: 'center',
              marginTop: 12,
            }}>
            You do not have an cancelled order at this time
          </Text>
        </View>
      )}
    </View>
  );
};

const renderScene = props => {
  switch (props.route.key) {
    case 'active':
      return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <ActiveRoute
            setVisible={props.route.setVisible}
            orders={props.route.orders}
            setPopupData={props.route.setPopupData}
            {...props}
          />
        </ScrollView>
      );
    case 'completed':
      return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <CompletedRoute
            setVisible={props.route.setVisible}
            orders={props.route.orders}
            setPopupData={props.route.setPopupData}
            onShowPopup={props.route.onShowPopup}
            {...props}
          />
        </ScrollView>
      );
    case 'cancelled':
      return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <CancelledRoute
            setVisible={props.route.setVisible}
            orders={props.route.orders}
            setPopupData={props.route.setPopupData}
            {...props}
          />
        </ScrollView>
      );
    default:
      return null;
  }
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: Color.primary,
      color: Color.brightRed,
      height: 4,
      borderRadius: 4,
    }}
    labelStyle={{
      color: Color.black,
      fontSize: 14,
      fontFamily: Font.Urbanist_SemiBold,
      textTransform: 'capitalize',
    }}
    style={{
      backgroundColor: '#F9F9F9',
      marginHorizontal: Window.fixPadding * 2,
      elevation: 0,
    }}
    activeColor={Color.primary}
    inactiveColor={Color.lightGray}
  />
);

const Order = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const isFocused = useIsFocused();
  const {auth} = useSelector(state => ({...state}));
  useEffect(() => {
    setLoading(true);
    Promise.all([
      activeOrderReq(auth.token),
      completeOrderReq(auth.token),
      cancelOrderReq(auth.token),
    ]).then(res => {
      const timer = setTimeout(async () => {
        setRoutes([
          {
            key: 'active',
            title: 'Processing',
            setVisible: setVisible,
            orders: res[0],
            setPopupData: setPopupData,
          },
          {
            key: 'completed',
            title: 'Completed',
            setVisible: setVisible,
            orders: res[1],
            setPopupData: setPopupData,
            onShowPopup: onShowPopup,
          },
          {
            key: 'cancelled',
            title: 'Cancelled',
            setVisible: setVisible,
            orders: res[2],
            setPopupData: setPopupData,
          },
        ]);
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    });
  }, [isFocused]);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const onShowPopup = () => {
    setOpenPopup(true);
  };
  const onClosePopup = () => {
    setOpenPopup(false);
  };
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={{backgroundColor: '#F9F9F9', flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={loading ? '#555555' : '#F9F9F9'}
        barStyle={loading ? 'light-content' : 'dark-content'}
        showHideTransition={'fade'}
      />
      <View style={{marginHorizontal: Window.fixPadding * 2}}>
        <AppBar
          left={
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <ManuIcon />
            </TouchableOpacity>
          }
          center={<Text style={GlobalStyle.AppCenterTextStyle}>Orders</Text>}
        />
      </View>
      {routes.length > 0 && (
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      )}

      <Popup visible={visible} setVisible={setVisible} popupData={popupData} />
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#000000AA',
          }}>
          <SkypeIndicator size={50} color={Color.grey} />
        </View>
      )}
      <BottomPopupReorder
        ref={target => (popupRef = target)}
        onTouchOutside={onClosePopup}
        openPopup={openPopup}
        itemData={popupData}
      />
    </SafeAreaView>
  );
};
const Popup = ({visible, setVisible, popupData}) => {
  const hideModal = () => {
    setVisible(false);
  };
  const containerStyle = {
    marginHorizontal: 20,

    borderRadius: 40,
    backgroundColor: Color.light,
  };

  return (
    <Modal
      theme={{
        colors: {
          backdrop: '#000000AA',
        },
      }}
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}>
      <View
        style={{
          paddingVertical: 40,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: Font.Urbanist_Bold,
            // lineHeight: 24,
            color: Color.secondary,
            marginBottom: 20,
          }}>
          Food Items
        </Text>
        {popupData &&
          popupData.map((item, index) => (
            <>
              <View style={{flexDirection: 'row', marginTop: 0}}>
                <Image
                  style={{width: 80, height: 80, borderRadius: 15}}
                  // source={{uri: item.food_details.image}}
                  source={require('../../../assets/images/pics/foodBg.png')}
                  resizeMode="cover"
                />
                <View style={{flexDirection: 'column', flex: 1}}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      marginLeft: 10,
                      flexDirection: 'row',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: Color.secondary,
                        fontFamily: Font.Urbanist_Bold,
                        width: 150,
                      }}>
                      {item.quantity > 1 && `x${item.quantity} `}
                      {item.food_details.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: Color.primary,
                        fontFamily: Font.Urbanist_Bold,
                      }}>
                      ${item.food_details.price}
                    </Text>
                  </View>
                  {item.add_ons.map((x, i) => (
                    <View
                      style={{
                        justifyContent: 'space-between',
                        marginLeft: 10,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          ...GlobalStyle.BasicTextStyle,
                          color: '#8A94A3',
                          fontSize: 14,
                        }}>
                        {x.quantity > 1 && `x${x.quantity} `}
                        {x.name}
                      </Text>
                      <Text
                        style={{
                          ...GlobalStyle.BasicTextStyle,
                          color: '#8A94A3',
                          fontSize: 13,
                        }}>
                        ${x.price}
                      </Text>
                    </View>
                  ))}
                  {item.variation.map((x, i) =>
                    x.values.map((variation, index) => (
                      <View
                        style={{
                          justifyContent: 'space-between',
                          marginLeft: 10,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            ...GlobalStyle.BasicTextStyle,
                            color: '#8A94A3',
                            fontSize: 14,
                          }}>
                          {item.quantity > 1 && `x${item.quantity} `}
                          {variation.label}
                        </Text>
                        <Text
                          style={{
                            ...GlobalStyle.BasicTextStyle,
                            color: '#8A94A3',
                            fontSize: 13,
                          }}>
                          ${variation.optionPrice}
                        </Text>
                      </View>
                    )),
                  )}
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor:
                    popupData.length === 1
                      ? 'transparent'
                      : index + 1 === popupData.length
                      ? 'transparent'
                      : '#EEEEEE',
                  marginVertical: 20,
                }}
              />
            </>
          ))}

        <Button theme="primary" text="OK" onPressFunc={() => hideModal()} />
      </View>
    </Modal>
  );
};
export default Order;
