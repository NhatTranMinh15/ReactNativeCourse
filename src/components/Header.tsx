import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header({ text }: any) {
    return <Text style={styles.header}>{text}</Text>;
}

type IHeaderStyles = {
    header: TextStyle;
};

const styles = StyleSheet.create<IHeaderStyles>({
    header: {
        fontSize: 21,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
});