import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Image,
    useWindowDimensions,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Button,
    Pressable,
    ScrollView,
    FlatList,
} from "react-native";

export default function Home() {
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const windowFontScale = useWindowDimensions().fontScale;
    const windowScale = useWindowDimensions().scale;

    const restaurants = [
        { name: "A1", status: "B1", pic: require("../../assets/dp.png") },
        { name: "A2", status: "B2", pic: require("../../assets/dp.png") },
        { name: "A3", status: "B3", pic: require("../../assets/dp.png") },
        { name: "A4", status: "B4", pic: require("../../assets/dp.png") },
        { name: "A5", status: "B5", pic: require("../../assets/dp.png") },
        { name: "A6", status: "B6", pic: require("../../assets/dp.png") },
        { name: "A7", status: "B7", pic: require("../../assets/dp.png") },
        { name: "A8", status: "B8", pic: require("../../assets/dp.png") },
        { name: "A9", status: "B9", pic: require("../../assets/dp.png") },
        { name: "A10", status: "B10", pic: require("../../assets/dp.png") },
    ];

    const name = "username";

    const renderItem = ({ item }) => (
        <Pressable
            onPress={() => {
                console.log(item.name);
            }}
        >
            <View
                style={[
                    {
                        padding: 15,
                        marginBottom: 7,
                        margin: 2,
                        borderRadius: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "white",
                    },
                    {
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    },
                ]}
            >
                <Image
                    source={item.pic}
                    style={{ height: 55, width: 55, borderRadius: 10 }}
                />
                <View style={{ padding: 10 }}>
                    <Text>Name: {item.name}</Text>
                    <Text>Status: {item.status}</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    flex: 1,
                    backgroundColor: "#f3f5f9",
                }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <StatusBar backgroundColor="#ad8840" />

                        <View style={[styles.header, { width: windowWidth }]}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    position: "absolute",
                                    left: 0,
                                    verticalAlign: "middle",
                                    paddingTop: 15,
                                    paddingLeft: 10,
                                    color: "black",
                                }}
                            >
                                WELCOME BACK!!{"\n"}
                                {name}
                            </Text>
                            <View
                                style={{
                                    alignSelf: "flex-end",
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}
                            >
                                <Image
                                    source={require("../../assets/favicon.png")}
                                    styles={{
                                        border: 2,
                                        borderColor: "black",
                                    }}
                                />
                            </View>

                            <View style={{ height: windowHeight, padding: 5 }}>
                                <FlatList
                                    data={restaurants}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around",
    },

    logo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderColor: "black",
        borderWidth: 2,
    },

    center: {
        paddingTop: "40%",
        alignItems: "center",
        backgroundColor: "#f74449",
    },

    h1: {
        paddingTop: 10,
        alignItems: "center",
    },

    input: {
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#431213",
        color: "white",
    },
    lable: {
        fontSize: 18,
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingRight: 10,
        fontWeight: "bold",
        marginBottom: 2,
    },
    button1: {
        width: 270,
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#ffbf00",
        marginTop: 12,
        justifyContent: "center",
    },
    header: {
        borderBottomColor: "black",
        borderBottomWidth: 2,
        position: "absolute",
        top: 0,
        left: 0,
        height: 60,
    },
});
