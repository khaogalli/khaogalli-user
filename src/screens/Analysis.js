import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ContributionGraph, LineChart } from "react-native-chart-kit";
import { stats } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ route, navigation }) {
  const username = route.params.username;
  const [refreshing, setRefreshing] = useState(false);
  const [statis, setStatis] = useState({
    item_frequency: [],
    total_orders: 0,
    total_revenue: 0,
    orders_per_hour_by_day: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    orders_per_day: {},
  });
  const name = username;
  const [selectedDay, setSelectedDay] = useState(0);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const AOV = statis.total_spent / statis.total_orders;

  const getData = async () => {
    setRefreshing(true);
    try {
      let res = await stats();
      setStatis(res.data);
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  commitsData = Object.keys(statis.orders_per_day).map((date) => {
    return { date: date, count: statis.orders_per_day[date] };
  });

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );
  return (
    <>
      <StatusBar backgroundColor="#ad8840" />
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.userName}>{name}</Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text>Total Orders</Text>
            <Text>Total Expense</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={{ fontSize: 24, color: "#e26a00" }}>
              {statis.total_orders}
            </Text>
            <Text style={{ fontSize: 24, color: "#e26a00" }}>
              {statis.total_spent}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text>Average Order Value</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={{ fontSize: 24, color: "#e26a00" }}>
              {AOV.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.container_day}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                selectedDay === days.indexOf(day) &&
                  styles.selectedDayContainer,
              ]}
              onPress={() => {
                setSelectedDay(days.indexOf(day));
              }}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay === days.indexOf(day) && styles.selectedDayText,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ paddingTop: 20, marginBottom: 10 }}>
          <LineChart
            data={{
              labels: [
                "8",
                "9",
                "10",
                "11",
                "12",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
              ],
              datasets: [
                {
                  data: statis.orders_per_hour_by_day[selectedDay].slice(8, 21),
                },
              ],
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "3",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              borderRadius: 16,
            }}
          />
        </View>
        <View>
          <ContributionGraph
            values={commitsData}
            endDate={new Date()}
            numDays={120}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "3",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  container_day: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    backgroundColor: "#f4f4f4",
  },
  userName: {
    fontSize: 28,
    position: "absolute",
    left: 0,
    verticalAlign: "middle",
    paddingTop: 5,
    paddingLeft: 10,
    color: "black",
  },
  container: {
    flex: 1,
  },
  topView: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  selectedDayContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#e26a00",
  },
  dayText: {
    fontSize: 16,
    color: "black",
  },
  selectedDayText: {
    fontWeight: "bold",
    color: "#e26a00",
  },
});
