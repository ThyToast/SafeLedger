import React from "react";
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MAIN_COLORS } from "../constants/colors";

type NavProps = NativeStackScreenProps<
  RootStackParamList,
  "TransactionDetails"
>;

const TransactionDetail = ({ route }: NavProps) => {
  const { type, amount, date, description, transaction_id } = route.params;
  const formattedDate = moment(date).format("do MMMM YYYY");

  const isCredit = type === "credit";
  const backgroundColor = isCredit ? "#189AB4" : "#81B622";
  const color = isCredit ? "#05445E" : "#3D550C";

  return (
    <View style={styles.container}>
      <View style={[styles.information, { backgroundColor }]}>
        <View style={styles.circle} />
        <Text style={[styles.text, { color }]}>{transaction_id}</Text>
        <Text style={[styles.text, { color }]}>{description}</Text>
        <Text
          style={[styles.text, { color }]}
        >{`Purchased on: \n${formattedDate}`}</Text>
        <Text
          style={[styles.text, { color }]}
        >{`Transaction type: \n${type}`}</Text>

        <View style={styles.bottomInformation}>
          <Text style={[styles.text, { color }]}>{`$${amount}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAIN_COLORS.BACKGROUND_COLOR,
    height: "100%",
  },
  information: {
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 16,
    rowGap: 16,
    marginTop: 16,
    alignItems: "stretch",
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  circle: {
    height: 24,
    aspectRatio: 1,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 16,
    borderRadius: 12,
  },
  bottomInformation: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    borderBottomEndRadius: 16,
    borderBottomLeftRadius: 16,
  },
});
