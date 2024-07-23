import {
  Button,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MAIN_COLORS } from "../constants/colors";
import { MainType } from "../typings";
import useGetTransaction from "../src/hooks/useGetTransaction";
import useBiometricAuthentication from "../src/hooks/useBiometricAuthentication";

type NavProps = NativeStackScreenProps<RootStackParamList, "Transaction">;

const TransactionScreen = ({ navigation }: NavProps) => {
  const { data, loading, onRefresh, error } = useGetTransaction();
  const [isReveal, setIsReveal] = useState(false);
  const { authenticate } = useBiometricAuthentication({});

  const totalSpent = data
    ? data?.reduce((sum, data) => sum + data.amount, 0)
    : 0;

  const totalSpentCensored = totalSpent.toString().replace(/./gi, "*");

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
      authenticate().then((isSuccess) => {
        if (isSuccess) {
          navigation.navigate("TransactionDetails", {
            date: item.date,
            amount: item.amount,
            description: item.description,
            type: item.type,
            transaction_id: item.transaction_id,
          });
        }
      });
    };

    return (
      <TouchableOpacity key={index} style={styles.item} onPress={onPress}>
        <View style={styles.icon}>
          <FontAwesome5 name={"money-bill"} size={24} color={"black"} />
        </View>
        <View>
          <Text style={styles.title}>{item.description}</Text>
          <Text style={styles.amount}>{`$${item.amount}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onPressReveal = async () => {
    if (isReveal) {
      setIsReveal(!isReveal);
      return;
    }

    authenticate().then((isSuccess) => {
      if (isSuccess) {
        setIsReveal(!isReveal);
      }
    });
  };

  const renderHeader = () => {
    const totalSpentText = isReveal ? totalSpent : totalSpentCensored;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.bar} />
        <View style={styles.headerInnerContainer}>
          <Text
            style={styles.amountSpent}
          >{`Total amount spent: $${totalSpentText}`}</Text>
          <TouchableOpacity style={styles.revealIcon} onPress={onPressReveal}>
            <FontAwesome5
              name={isReveal ? "eye-slash" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderError = () => {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome5 name="skull" size={24} color="white" />
        <Text style={styles.errorText}>Oops, something went wrong</Text>
        <Button title="Retry" onPress={onRefresh}></Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!error ? (
        <FlatList
          style={styles.list}
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          refreshControl={refreshControl}
        />
      ) : (
        renderError()
      )}
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAIN_COLORS.BACKGROUND_COLOR,
    justifyContent: "center",
    height: "100%",
  },
  errorContainer: { alignItems: "center", rowGap: 16 },
  errorText: {
    color: "white",
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
  revealIcon: { marginEnd: 16 },
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
  headerInnerContainer: { flexDirection: "row", alignItems: "center" },
  bar: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "black",
    height: 20,
  },
});
