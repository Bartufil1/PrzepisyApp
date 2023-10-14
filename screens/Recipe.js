import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { SIZES, FONTS, COLORS, icons } from "../screens/constants";
import axios from "axios";

const HEADER_HEIGHT = 350;

const RecipeCreatorCardDetail = ({ selectedRecipe }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          marginLeft: 20,
        }}
      >
         <Image
          source=
          {{uri:"https://cdn-icons-png.flaticon.com/512/3756/3756555.png"}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}
        >
          Liczba polubien:
        </Text>
        <Text style={{ color: COLORS.white2, ...FONTS.h3 }}>
          {selectedRecipe.aggregateLikes}
        </Text>
      </View>
      <Image
          source=
          {{uri:"https://cdn-icons-png.flaticon.com/512/3632/3632618.png"}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
          }}
          />
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}
        >
          
          Poziom zdrowia:
        </Text>
        <Text style={{ color: COLORS.white2, ...FONTS.h3 }}>
          {selectedRecipe.healthScore}
        </Text>
      </View>
    </View>
  );
};

const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView
        blurType="dark"
        overlayColor=""
        blurAmount={10}
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
        }}
      >
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.transparentBlack9,
        }}
      >
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </View>
    );
  }
};

const Recipe = ({ navigation, route }) => {
let { id } = route.params;
const [data,setData]= useState([]);
const getData= ()=> {
  axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=c0bc41e997cc4c38912e4671df4527ce&includeNutrition=true`).then((response)=>{setData(response.data)
 // console.log(response.data)
  })
  
}
const [isReady,setReady]= useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    getData();
    setReady(true)
  }, []);

  function renderHeaderBar() {
    return (
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          height: 0,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
        }}
      >
        {/* Only viewwable at IOS */}
        <Animated.View
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            right: 0,
            height: 0,
            backgroundColor: COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />
        {/* Header Bar Title only for IOS*/}

        <Animated.View
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            right: 0,
            height: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                  outputRange: [50, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <Text
            style={{
              color: COLORS.lightGray2,
              ...FONTS.body4,
            }}
          >
            Recipe by:
          </Text>
          <Text
            style={{
              color: COLORS.white2,
              ...FONTS.h3,
            }}
          >
            {selectedRecipe?.author?.name}
          </Text>
        </Animated.View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.transparentBlack5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={{uri:"https://cdn-icons-png.flaticon.com/128/892/892646.png"}}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.lightGray,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
          }}
        >
        </TouchableOpacity>
      </View>
    );
  }

  function renderRecipeCardHeader() {
    return (
      <View
        style={{
          marginTop: -1000, //just for ios to reduce the space over the image
          paddingTop: 1000,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Animated.Image
          source={{uri:data.image}}
          resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            width: "200%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            bottom: 10,
            left: 30,
            right: 30,
            height: 80,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 170, 250],
                  outputRange: [0, 0, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <RecipeCreatorCardInfo selectedRecipe={data} />
        </Animated.View>
      </View>
    );
  }

  function renderRecipeInfo() {
    return (
      <View
        style={{
          flexDirection: "column",
          width: SIZES.width,
          paddingHorizontal: 30,
          paddingVertical: 20,
          backgroundColor: COLORS.lightGray,
          borderRadius: SIZES.radius,
          marginVertical: 10,
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <Text style={{ ...FONTS.h2, color: "black" }}>
            {data.title}
          </Text>
          <Text style={{ color: "black", ...FONTS.body4, }}>
            Czas przygotowania: {data.readyInMinutes} minut | Porcja:{" "}
            {data.servings}
          </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
        <Text style={{ ...FONTS.h3, color: "black", textAlign: "center", fontSize: 22 }}>
          Instrukcje przygotowania:
        </Text>
          <Text style={{ ...FONTS.body3 }}>{data.instructions}</Text>
        </View>
      </View>
    );
  }
  

  return isReady && (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={data.extendedIngredients}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderRecipeCardHeader()}
            {renderRecipeInfo()}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 30,
              marginVertical: 5,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                width: 50,
                borderRadius: 5,
                backgroundColor: COLORS.lightGray,
              }}
            >
              <Image
                source={{uri:`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                }}
              >
                {item.name}
              </Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                }}
              >
                {item.amount}
              </Text>
            </View>
          </View>
        )}
      />
      {renderHeaderBar()}
    </View>
  );
};
export default Recipe;
