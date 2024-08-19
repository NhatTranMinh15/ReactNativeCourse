import React from 'react';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import ImageAssets from '../assets/images';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Background({ children } : any) {
    return (
        <ImageBackground
            source={ImageAssets.background_dot}
            resizeMode="repeat"
            style={styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

type IBackgroundStyles = {
    container: ViewStyle;
    text: TextStyle;
    background: ViewStyle;
};

const styles = StyleSheet.create<IBackgroundStyles>({
    background: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
});