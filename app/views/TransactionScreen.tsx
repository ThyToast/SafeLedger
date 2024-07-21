import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import useGetTransaction from "../src/hooks/useGetTransaction";
import { MainType } from "../typings";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as LocalAuthentication from "expo-local-authentication";

type NavProps = NativeStackScreenProps<RootStackParamList, "Transaction">;

const TransactionScreen = ({ navigation }: NavProps) => {
  const { data, loading, onRefresh } = useGetTransaction();
  const totalAmountSpent = data
    ? data?.reduce((sum, data) => sum + data.amount, 0)
    : 0;

  const refreshControl = (
    <RefreshControl
      refreshing={loading}
      onRefresh={onRefresh}
      progressBackgroundColor={"white"}
      tintColor={"white"}
    />
  );

  const renderItem: ListRenderItem<MainType.TransactionType> = ({
    item,
    index,
  }) => {
    const onPress = async () => {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        navigation.navigate("TransactionDetails", {
          date: item.date,
          amount: item.amount,
          description: item.description,
          type: item.type,
          transaction_id: item.transaction_id,
        });
      }
    };

    return (
      <TouchableOpacity key={index} style={styles.item} onPress={onPress}>
        <View style={styles.icon}>
          <FontAwesome5 name="money-bill" size={24} color="black" />
        </View>
        <View>
          <Text style={styles.title}>{item.description}</Text>
          <Text style={styles.amount}>{`$${item.amount}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.bar} />
        <Text
          style={styles.amountSpent}
        >{`Total amount spent: $${totalAmountSpent}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        refreshControl={refreshControl}
      />
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A1045",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  description: {
    fontSize: 24,
  },
  amount: {
    fontSize: 24,
  },
  item: {
    flexDirection: "row",
    columnGap: 16,
    marginBottom: 24,
    padding: 8,
    backgroundColor: "#F4EBD0",
    borderRadius: 16,
  },
  icon: {
    alignSelf: "center",
    backgroundColor: "#81B622",
    padding: 10,
    aspectRatio: 1,
    borderRadius: 32,
    justifyContent: "center",
  },
  amountSpent: {
    fontSize: 20,
    padding: 16,
    fontWeight: "bold",
  },
  list: { paddingHorizontal: 24 },
  headerContainer: {
    backgroundColor: "#EEEDE7",
    alignSelf: "center",
    borderRadius: 16,
    marginVertical: 16,
  },
  bar: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "black",
    height: 20,
  },
});
