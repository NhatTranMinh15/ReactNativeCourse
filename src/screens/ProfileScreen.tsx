import React from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import useSWR from "swr";
import { getUserUrl, updateUser, UserFetcher } from "../services/UserService";
import { UserUpdateModel } from "../models/UserModel";
import { useFormik } from "formik";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface ProfileScreenProps {
    navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const { user, logout } = useAuth();

    const formik = useFormik({
        initialValues: {
            age: 0,
            firstName: "",
            lastName: ""
        },
        // validationSchema: null,
        onSubmit: async (values) => {
            if (!formik.dirty) {
                return;
            }
            const data: UserUpdateModel = {
                age: values.age,
                firstName: values.firstName,
                lastName: values.lastName
            };
            await updateUser(data)
                .then(() => {
                    Alert.alert("Update User Success")
                    mutate()
                })
                .catch((error: unknown) => {
                    console.log(error);
                    Alert.alert("Failed to Update User")
                });
        },
    });

    const { data: userData, isLoading, mutate } = useSWR(user ? getUserUrl : null, UserFetcher, {
        onSuccess: (response) => {
            console.log("profile ", response);
            formik.setFieldValue("age", response.age);
            formik.setFieldValue("firstName", response.firstName);
            formik.setFieldValue("lastName", response.lastName);
        },
        revalidateOnFocus: true,
        revalidateOnMount: true,
        revalidateOnReconnect: true
    })

    const { handleSubmit, handleChange, values } = formik;

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{
                marginTop: 20,
                alignItems: 'center',
                marginBottom: 0
            }} >
                <Text style={{ fontSize: 20 }}>
                    Your Profile
                </Text>
            </View>
            {isLoading ? (

                <ActivityIndicator size="large" color="#0000ff" />
            )
                : (
                    <>
                        {user && userData ? (
                            <>
                                <View style={styles.container}>
                                    <View style={styles.form}>
                                        <Text style={{ fontSize: 20 }}>
                                            Your Role Is: {userData.role.toUpperCase()}
                                        </Text>
                                        <Text style={styles.label}>Username</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter Username"
                                            editable={false}
                                            selectTextOnFocus={false}
                                            value={userData.username}
                                        />
                                        <Text style={styles.label}>Email</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter Email"
                                            value={userData.email}
                                            editable={false}
                                            selectTextOnFocus={false}
                                        />
                                        <Text style={styles.label}>First Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter First Name"
                                            value={values.firstName}
                                            onChangeText={handleChange('firstName')}
                                        />
                                        <Text style={styles.label}>Last Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter last Name"
                                            value={values.lastName}
                                            onChangeText={handleChange('lastName')}
                                        />
                                        <Text style={styles.label}>Age</Text>
                                        <TextInput
                                            type={"number"}
                                            style={styles.input}
                                            placeholder="Age"
                                            value={values.age.toString()}
                                            onChangeText={handleChange('age')}
                                        />
                                        <TouchableOpacity style={styles.info_button} onPress={() => handleSubmit()}>
                                            <Text style={styles.buttonText}>Change</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.red_button} onPress={() => logout()}>
                                            <Text style={styles.buttonText}>Logout</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text style={{ flex: 1 }}>Welcome Guest</Text>
                                <Button title="Login" onPress={() => navigation.navigate("Sign In")}>
                                    <Text>Log in</Text>
                                </Button>
                            </>
                        )}
                    </>
                )
            }
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "scroll"
    },
    form: {
        width: '80%',
        overflow: "scroll"
    },
    label: {
        fontSize: 20,
        marginTop: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    info_button: {
        marginTop: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    red_button: {
        marginTop: 20,
        backgroundColor: '#DD0000',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        alignSelf: "center"
    },
});

export { ProfileScreen };