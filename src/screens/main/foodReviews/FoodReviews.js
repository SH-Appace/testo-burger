import React, { useState } from "react";
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../../components/AppBar";
import { GlobalStyle, Color, Font, Window } from "../../../globalStyle/Theme";
import Icon from '../../../core/Icon';
import { Data, FoodReviewsData, RecommededFoodData, PublicReviewsData } from "./FoodReviewsDetails";
import { ProgressBar, Colors } from 'react-native-paper';
import styles from "./FoodReviewsStyle";

const StarIcon = ({ item }) => {
    return (
        <View style={{ paddingHorizontal: 0, paddingVertical: 14, justifyContent: 'center', alignSelf: 'center' }}>
            <Icon iconFamily={'AntDesign'} style={styles.starIconStyle} name={item.starIcon} />
        </View>
    )
}

const ProgressBarData = ({ item }) => {
    return (
        <View >
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ fontSize: 16, fontFamily: Font.Urbanist_SemiBold, lineHeight: 22.4, color: Color.secondary }}>{item.num}</Text>
                <View style={{ paddingLeft: 10, paddingVertical: 12 }}>
                    <ProgressBar progress={item.progress} style={{ backgroundColor: '#E0E0E0', height: 6, borderRadius: 100 }} color={Color.primary} width={200} />
                </View>
            </View>
        </View>
    )
}

const RecommededFood = ({ item, setState, state }) => {

    const handleClick = (itemID) => {
        setState(itemID);
    };
    return (
        <TouchableOpacity style={{ ...styles.goalContainer, backgroundColor: state == item.id ? Color.primary : Color.light }}
            onPress={() => handleClick(item.id)}>

            <Icon iconFamily={'AntDesign'} name={item.icon} style={{ ...styles.starIcon, color: state == item.id ? Color.light : Color.primary }} />
            <Text style={{ ...styles.goalsTextStyle, color: state == item.id ? Color.light : Color.primary }}>{item.title}</Text>
        </TouchableOpacity>

    )
}

const PublicReviews = ({ item }) => {
    const [reRenderHeart, setReRenderHeart] = useState(false);

    return (
        <View style={{ flexDirection: 'column', marginTop: 10, paddingVertical: 10 }}>

            <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 48, height: 48 }} source={item.img} />
                    <Text style={{ ...styles.Heading, paddingLeft: 10 }}>{item.head}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {Data.map((item, i) => (<StarIcon item={item} key={i} />))}
                    <Icon iconFamily={'Ionicons'} style={{ paddingLeft: 10 }} color={Color.secondary} size={20} name={item.icon} />
                    <TouchableOpacity style={{}}>
                        <Icon iconFamily={'Ionicons'} name={'ios-ellipsis-horizontal-circle'} size={25} color={Color.secondary} />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={GlobalStyle.BasicTextStyle}>{item.text}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        item.isFav = !item.isFav;
                        setReRenderHeart(!reRenderHeart);
                    }}>
                    <Icon iconFamily={'AntDesign'} size={20} name={item.isFav ? 'heart' : 'hearto'}
                        color={item.isFav ? Color.lightRed : Color.verylightRed} />
                </TouchableOpacity>
                <Text style={styles.num}>{item.num}</Text>
                <Text style={styles.days}>{item.days}</Text>
            </View>

        </View>

    )
}

const FoodViews = ({ }) => {
    const [active, setActive] = useState(1);

    return (
        <SafeAreaView
            style={{ ...GlobalStyle.Container, paddingHorizontal: 0 }}
        >
            <StatusBar
                translucent
                backgroundColor={Color.light}
                barStyle={'dark-content'}
            />
            <View style={{ paddingHorizontal: 20 }}>
                <AppBar
                    center={
                        <Text style={GlobalStyle.AppCenterTextStyle}> Rating & Reviews</Text>
                    }
                />
            </View>
            <ScrollView>
                <View style={{ borderWidth: 0.5, borderColor: Color.grey, marginVertical: 20, marginHorizontal: 20 }}></View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={GlobalStyle.BasicHeading}>4.8</Text>
                        <View style={{ flexDirection: 'row', }}>
                            {Data.map((item, i) => (<StarIcon item={item} key={i} />))}
                        </View>
                        <Text style={{ fontSize: 18, color: Color.darkGray, fontFamily: Font.Urbanist_Medium, lineHeight: 25.2 }}>(4.8k reviews)</Text>
                    </View>
                    <View style={{ borderWidth: 0.6, marginHorizontal: 15, height: 150, borderColor: Color.grey, }}></View>
                    <View style={{}}>
                        {FoodReviewsData.map((item, i) => (<ProgressBarData item={item} key={i} />))}
                    </View>
                </View>

                <View style={{ borderWidth: 0.5, borderColor: Color.grey, marginVertical: 20, marginHorizontal: 20 }}></View>

                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={RecommededFoodData}
                    renderItem={({ item }) => <RecommededFood state={active} setState={setActive} item={item} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                />

                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={PublicReviewsData}
                    renderItem={({ item }) => <PublicReviews state={active} setState={setActive} item={item} />}
                    horizontal={false}
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                />

            </ScrollView>
        </SafeAreaView >
    )
}

export default FoodViews;