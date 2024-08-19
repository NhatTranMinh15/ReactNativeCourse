import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import React from 'react';
import useSWR from "swr";
import Button from "../components/Button";
import { getProductDetailUrl, ProductDetailFetcher } from "../services/ProductService";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface ProductDetailScreenProps {
  navigation: DetailScreenNavigationProp;
  route: DetailScreenRouteProp
}
const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route, navigation }) => {
  const { user } = useAuth();
  const productId = route.params.productId;
  const { data, isLoading, error } = useSWR(user ? getProductDetailUrl(productId) : null, ProductDetailFetcher);

  return (
    <View style={{ margin: 10, flex: 1, flexDirection: 'column' }}>
      {user && data ? (
        <>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            <View style={styles.container}>
              <Image source={{ uri: data.image }} style={styles.image} />
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.description}>{data.description}</Text>
              <Text style={styles.price}>{`${data.price} ${data.priceUnit}`}</Text>
            </View>
          )}
        </>
      ) : (
        <>
          <Text style={{ flex: 1 }}>
            Welcome Guest. Please login to view product detail.
          </Text>
          <Button title="Login" onPress={() => navigation.navigate("Sign In")}>
            <Text>Log in</Text>
          </Button>
        </>
      )}
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 8,
  },
});
export default ProductDetailScreen;
