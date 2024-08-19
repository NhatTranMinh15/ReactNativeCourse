import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootStackParamList } from "../../App";
import { useAuth } from "../contexts/AuthContext";
import { ITextInput } from "../types/TextInput";
import Background from "../components/Background";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles/SignInStyle";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sign In'>;

interface SignInScreenProps {
    navigation: SignInScreenNavigationProp;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
    const { user, login } = useAuth();

    const [email, setEmail] = useState<ITextInput>({
        value: 'userA',
        error: '',
    });
    const [password, setPassword] = useState<ITextInput>({
        value: '123456',
        error: '',
    });

    async function onPressSignIn() {
        const result = await login(email.value, password.value)
        if (result === 0) {
            setEmail({ value: email.value, error: 'Failed to Sign In' })
        }
    }

    if (user) {
        return <>
            {navigation.navigate("Main")}
        </>
    } else {
        return (
            <Background>
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: 20,
                        flex: 1,
                        flexDirection: 'column'
                    }}>
                    <View style={{ alignContent: 'center', flex: 0.2 }}>
                        <View style={styles.changeLanguageContent}>
                            <Text
                                style={styles.languageItem}
                                onPress={() => {
                                    Alert.alert("Change to English")
                                }}>
                                English
                            </Text>
                            <Text
                                style={styles.languageItem}
                                onPress={() => {
                                    Alert.alert("Change to Vietnamese")
                                }}>
                                Tiếng Việt
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignContent: 'center', flex: 0.5 }}>
                        <Logo />
                        <TextInput
                            placeholder={'Email'}
                            returnKeyType="next"
                            value={email.value}
                            onChangeText={(text: string) => setEmail({ value: text, error: '' })}
                            error={!!email.error}
                            errorText={email.error}
                            autoCapitalize="none"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                        />
                        <TextInput
                            placeholder={'Password'}
                            returnKeyType="done"
                            value={password.value}
                            onChangeText={(text: string) => setPassword({ value: text, error: '' })}
                            error={!!password.error}
                            errorText={password.error}
                            secureTextEntry
                        />
                        <View style={styles.forgotPassword}>
                            <TouchableOpacity>
                                <Text style={styles.forgot}>{'Forgot your password?'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Button mode="contained" onPress={() => { onPressSignIn(); }}>
                            <Text>{'Login'}</Text>
                        </Button>
                        {/* <View style={styles.row}>
                            <Text>{'Don’t have an account?'} </Text>
                            <TouchableOpacity onPress={() => navigation.replace('SignUpScreen')}>
                                <Text style={styles.link}>{'Sign up'}</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                    <View style={{ alignContent: 'center', flex: 0.2 }}>
                    </View>
                </View>
            </Background>
        )
    }
}

export default SignInScreen;