import React from "react";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import RNFetchBlob from "rn-fetch-blob";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from "react-native";

const ProfilePage = () => {
  const toDate = "2021-09-01";
  const fromDate = "2021-09-01";

  const history = [
    {
      orderID: "123456",
      restaurant: "Gazebo",
      date: "2021-09-01",
      items: [
        { id: "1", name: "Item 1", quantity: 2, amount: 10 },
        { id: "2", name: "Item 2", quantity: 1, amount: 15 },
        { id: "3", name: "Item 3", quantity: 3, amount: 20 },
      ],
    },
    {
      orderID: "123456",
      restaurant: "Gazebo",
      date: "2021-09-01",
      items: [
        { id: "1", name: "Item 1", quantity: 2, amount: 10 },
        { id: "2", name: "Item 2", quantity: 1, amount: 15 },
        { id: "3", name: "Item 3", quantity: 3, amount: 20 },
      ],
    },
    {
      orderID: "123456",
      restaurant: "Gazebo",
      date: "2021-09-01",
      items: [
        { id: "1", name: "Item 1", quantity: 2, amount: 10 },
        { id: "2", name: "Item 2", quantity: 1, amount: 15 },
        { id: "3", name: "Item 3", quantity: 3, amount: 20 },
      ],
    },
  ];

  const icon_path = "../../assets/favicon.png";
  const html = `
    <html>
      <body>
      <img src="${icon_path}" alt="favicon" style="margin-left: auto; margin-right: auto; width: 100; height: 100 radius: 5"/>
        <h1 style="text-align:center">Order Statement</h1>
        <p style="text-align:center; font-size:28" >John Doe</p>
        <p>From: ${fromDate}  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp To: ${toDate}</p>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr  style="background-color: #ffbf00; text-align: center;">    
              <th style="padding: 8px;">Order ID</th>
              <th style="padding: 8px;">Restaurant</th>
              <th style="padding: 8px;">Date</th>
              <th style="padding: 8px;">Items</th>
            </tr>
          </thead>
          <tbody>
            ${history
              .map(
                (order) => `
                  <tr style="text-align:center">
                    <td>${order.orderID}</td>
                    <td>${order.restaurant}</td>
                    <td>${order.date}</td>
                    <td>
                      <ul style="list-style-type: none">
                        ${order.items
                          .map(
                            (item) => `
                              <li>${item.name} | ${item.quantity} | ${item.amount}</li>
                            `
                          )
                          .join("")}
                      </ul>
                    </td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
        
      </body>
    </html>
  `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  const handleChangePassword = () => {
    console.log("Change Password");
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  const handleGeneratePDF = () => {
    generatePdf();
    console.log("PDF generated");
  };

  const orders = () => {
    console.log("Orders");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/download.jpeg")}
        style={styles.profileImage}
      />
      <Text style={{ fontWeight: "900", fontSize: 26 }}>John Doe</Text>
      <Text style={styles.regNumber}>Reg No: 123456</Text>

      <View style={styles.buttonContainer}>
        <Pressable onPress={handleChangePassword}>
          <View
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 5,
              width: 230,
              alignItems: "center",
            }}
          >
            <Text style={styles.name}>Change Password</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={orders}>
          <View
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 5,
              width: 230,
              alignItems: "center",
            }}
          >
            <Text style={styles.name}>Orders</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleGeneratePDF}>
          <View
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 5,
              width: 230,
              alignItems: "center",
            }}
          >
            <Text style={styles.name}>Download History</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={handleLogout}>
          <View
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 5,
              width: 230,
              alignItems: "center",
              backgroundColor: "#ff3c3c",
            }}
          >
            <Text style={styles.name}>Sign Out</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 2,
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
  },
  regNumber: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 10,
  },
});

export default ProfilePage;
