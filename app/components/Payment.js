import React, { useRef } from "react";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Payment() {
    const navigation = useNavigation();
    const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  return (
    <View style={{ marginHorizontal: 15 }}>
      <Paystack
        paystackKey="pk_test_910a1dd19ec7d1317ef322222e622ee9d6dae51c"
        paystackSecretKey="sk_test_f342121d5e7ac8d2cfd677c799addd6f053a8e05"
        billingEmail="okechukwuchenna@gmail.com"
        amount={10000}
        billingName="Okechukwu Uchenna"
        billingMobile="09014214236"
        currency='NGN'
        onCancel={(e) => {
            console.log(e);
        }}
        onSuccess={(res) => {
            console.log(res);
        }}
        ref={paystackWebViewRef}
      />
      <TouchableOpacity
        onPress={() => paystackWebViewRef.current.startTransaction()}
        style={styles.paystack}
      >
        <Text style={styles.pay}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  paystack: {
    
    minWidth: "60%",
    backgroundColor: "#F9A826",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  pay: {
    color: "white",
  },
});
