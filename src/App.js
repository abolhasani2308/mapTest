import React, { Component } from "react";
import { View, Text, PermissionsAndroid, TouchableOpacity } from "react-native";
import Geolocation from "react-native-geolocation-service";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {}
    };
  }

  componentDidMount() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
      .then(() => {})
      .catch(error => console.warn(error));
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "rgb(11,34,57)"
        }}
      >
        <View
          style={{
            width: 280,
            height: 350,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "rgb(105,231,129)"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "rgb(255,255,255)",
              textAlign: "center"
            }}
          >
            {JSON.stringify(this.state.location, null, 2)}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 280,
            height: 50,
            backgroundColor: "rgb(251,82,82)",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10
          }}
          onPress={() => {
            Geolocation.getCurrentPosition(
              res => {
                this.setState({ location: res });
              },
              error => {
                console.warn(JSON.stringify(error, null, 2));
              },
              {
                enableHighAccuracy: true,
                forceRequestLocation: true,
                timeout: 15000,
                maximumAge: 15000
              }
            );
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "rgb(151,49,49)",
              textAlign: "center"
            }}
          >
            Get Location
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default App;
