import { FC, useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import Background from "../components/Background"
import { styles } from "./styles/signin-screen-styles"
import Logo from "../components/Logo"
import TextInput from "../components/TextInput"
import Button from "../components/Button"
import { ITextInput } from "../types/text-input"
import { useAuth } from "../contexts/auth-context"

interface ISignInScreen {
    navigation: any
}

export const SignInScreen: FC<ISignInScreen> = ({ navigation }: any) => {
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
        return navigation.navigate("Home");
    } else {
        return (
            <Background>
                <View style={{ width: '100%', height: '100%', padding: 20, flex: 1, flexDirection: 'column' }}>
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
                            <TouchableOpacity
                            // onPress={() => navigation.replace('ForgotPasswordScreen')}
                            >
                                <Text style={styles.forgot}>{'Forgot your password?'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Button mode="contained" onPress={() => { onPressSignIn(); }}>
                            <Text>{'Login'}</Text>
                        </Button>
                        <View style={styles.row}>
                            <Text>{'Don’t have an account?'} </Text>
                            <TouchableOpacity onPress={() => navigation.replace('SignUpScreen')}>
                                <Text style={styles.link}>{'Sign up'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ alignContent: 'center', flex: 0.2 }}>
                    </View>
                </View>
            </Background>
        )
    }
}
