import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import AppBar from '../../../components/AppBar';
import Icon from '../../../core/Icon';
import { GlobalStyle, Font, Color, Window } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import TextField from '../../../components/TextFeild';
import { RecentSearches, PopularCuisines, AllCuisines } from './SearchTypeDetails';
import styles from './SearchStyle';

const RecommededFood = ({ item, setState, state }) => {

    const handleClick = (itemID) => {
        setState(itemID);
    };
    return (
        <View style={{}}>
            <TouchableOpacity key={item.id} style={{ ...styles.goalContainer, backgroundColor: state == item.id ? Color.primary : Color.light }}
                onPress={() => handleClick(item.id)} >
                <Text style={{ ...styles.goalsTextStyle, color: state == item.id ? Color.light : Color.primary }}>{item.title}</Text>
            </TouchableOpacity>

        </View>

    )
}

const SearchType = ({ }) => {
    let navigation = useNavigation();
    const [active, setActive] = useState(1);
    return (
        <SafeAreaView style={GlobalStyle.Container}>
            <StatusBar
                translucent
                backgroundColor={Color.light}
                barStyle={'dark-content'}
            />
            <View style={{ marginTop: 10 }}>
                <AppBar
                    center={
                        <View style={{ width: 336, }}>
                            <TextField icon='magnify' placeholder='Search' />
                        </View>
                    }
                />
            </View>
            <ScrollView style={{ marginTop: 24 }}>
                <View style={{}}>
                    <Text style={styles.Heading} >Recent Searches</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                    {
                        RecentSearches.map((item, i) => (
                            <RecommededFood state={active} setState={setActive} item={item} />
                        ))
                    }
                </View>
                <View style={{}}>
                    <Text style={styles.Heading} >Popular Cuisines</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                    {
                        PopularCuisines.map((item, i) => (
                            <RecommededFood state={active} setState={setActive} item={item} />
                        ))
                    }
                </View>
                <View>
                    <Text style={styles.Heading} >All Cuisines</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                    {
                        AllCuisines.map((item, i) => (
                            <RecommededFood state={active} setState={setActive} item={item} />
                        ))
                    }
                </View>
            </ScrollView>

        </SafeAreaView>

    );
};

export default SearchType;
