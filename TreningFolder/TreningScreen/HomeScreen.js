import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {categories, user, workoutPlans, workouts} from '../data';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import AppText from '../components/AppText';
import Spacing from '../constants/Spacing';
import IconButton from '../components/IconButton';
import SectionHeader from '../components/SectionHeader';
import Workout from '../components/Workout';
import Rating from 'react-native-easy-rating';
import Screen from '../components/Screen';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const getToken = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('token'));
      console.log(value);
      return value;
    } catch (e) {
      // error reading value
    }
  };
  const getworkouts = async () => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:3000/api/workout/getAll',
        {
          headers: {Authorization: 'Bearer ' + (await getToken())},
        },
      );
      console.log(response.data);
      setWorkouts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getworkouts();
  }, []);

  const navigation = useNavigation();
  const user = {
    profile: 'test',
  };
  return (
    <Screen
      style={{
        backgroundColor: 'black',
      }}>
      <ScrollView
        style={{
          paddingHorizontal: Spacing.padding.base,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                source={require('../assets/images/recipewindow.png')}
                style={{width: 65, height: 65}}
              />
            </TouchableOpacity>
            <View
              style={{
                marginLeft: Spacing.margin.base,
              }}></View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#1C1C1E',
            paddingVertical: Spacing.padding.sm,
            paddingHorizontal: Spacing.padding.base,
            borderRadius: Spacing.borderRadius.base,
            marginVertical: Spacing.margin.xl,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Search Workouts.."
            placeholderTextColor={Colors.text}
            style={{
              fontSize: FontSize.base,
              width: '80%',
            }}
          />
          <IconButton
            name="options-outline"
            style={{
              backgroundColor: 'orange',
            }}
          />
        </View>
        <SectionHeader title="Featured Workouts" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          pagingEnabled
          snapToInterval={270 + Spacing.margin.lg}>
          {workouts.map(workout => (
            <Workout
              onPress={() =>
                navigation.navigate('PlanOverview', {workout: workout})
              }
              workout={workout}
              key={workout.id}
            />
          ))}
        </ScrollView>
        <SectionHeader title="Trending Plans" />
        {workouts.map(plan => (
          <TouchableOpacity
            style={{
              padding: Spacing.padding.sm,
              marginBottom: Spacing.margin.base,
              backgroundColor: '#1C1C1E',
              borderRadius: Spacing.borderRadius.base,
              flexDirection: 'row',
            }}
            key={plan.id}>
            <Image
              source={{uri: plan.image}}
              style={{
                width: 100,
                height: 100,
                borderRadius: Spacing.borderRadius.base,
              }}
            />
            <View
              style={{
                marginLeft: Spacing.margin.base,
                justifyContent: 'space-between',
              }}>
              <AppText
                style={{
                  fontFamily: Font['poppins-semiBold'],
                }}>
                {plan.name}
              </AppText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppText
                  style={{
                    marginLeft: Spacing.margin.base,
                  }}>
                  {plan.duration} | {plan.location}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Rating
                  rating={plan.rating}
                  max={5}
                  iconWidth={20}
                  iconHeight={20}
                />
                <AppText
                  style={{
                    marginLeft: Spacing.margin.sm,
                  }}>
                  {plan.rating}
                </AppText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;
