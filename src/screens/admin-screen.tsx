import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import useSWR from "swr";
import { getAllUserUrl, UserFetcher } from "../services/user-service";
import { UserModel } from "../models/user";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
type AdminScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Admin'>;

interface AdminScreenProps {
    navigation: AdminScreenNavigationProp;
}

const AdminScreen: React.FC<AdminScreenProps> = ({ navigation }) => {
    const { user } = useAuth();
    const { data: userData } = useSWR(getAllUserUrl, UserFetcher);
    const users: UserModel[] = userData;
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ marginTop: 20, alignItems: 'center', marginBottom: 0 }} >
                <Text style={{ fontSize: 20 }}>
                    All Users
                </Text>
            </View>
            {user && userData ?

                <View style={styles.container}>
                    <FlatList
                        data={users}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.username}>{item.username}</Text>
                                <Text>{`${item.firstName} ${item.lastName}`}</Text>
                                <Text>{item.email}</Text>
                                <Text>{`Age: ${item.age}`}</Text>
                                <Text>{`Role: ${item.role}`}</Text>
                            </View>
                        )}
                    />
                </View>
                :
                <View>
                    <Text style={{ flex: 1 }}>Welcome Guest</Text>
                    <Button title="Login" onPress={() => navigation.navigate("Sign In")}>
                        <Text>Log in</Text>
                    </Button>
                </View>
            }
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    listContainer: {
        padding: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export { AdminScreen };