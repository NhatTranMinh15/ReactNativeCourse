import * as React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/auth-context';
import Button from '../components/Button';
import useSWR from 'swr';
import { getProductUrl, ProductFetcher } from '../services/product-service';
import ListItem from '../components/ListItem';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const { user } = useAuth();

    const { data: products, isLoading: isLoadingProduct, error } = useSWR(getProductUrl, ProductFetcher, {
        onError: () => {
            console.log("Failed to get products")
        },
    })
    if (!user) return <>
        {navigation.navigate("Sign In")}
    </>
    return (
        <View style={{ margin: 10, flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1 }}>
                {isLoadingProduct ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                    <Text>Error {error.message}</Text>
                ) : products ? (
                    <FlatList
                        data={products}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
                                <ListItem item={{
                                    title: item.name,
                                    body: item.description,
                                    imageUrl: item.image
                                }}></ListItem>
                            </TouchableOpacity>
                        )}
                    />
                ) : (<></>)
                }
            </View>
        </View>
    );
};

export { HomeScreen };