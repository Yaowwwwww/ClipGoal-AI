import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectSport'>;

type SportItem = {
  name: string;
  image: any;
  likes: string; // 喜欢数量
};

const goalOriented: SportItem[] = [
  { name: 'Soccer', image: require('../assets/sports/Soccer.png'), likes: '4.91K' },
  { name: 'Basketball', image: require('../assets/sports/Basketball.jpg'), likes: '3.87K' },
  { name: 'Tennis', image: require('../assets/sports/Tennis.png'), likes: '2.30K' },
];

const arenaOriented: SportItem[] = [
  { name: 'Badminton', image: require('../assets/sports/Badminton.png'), likes: '2.99K' },
  { name: 'Volleyball', image: require('../assets/sports/Volleyball.png'), likes: '3.12K' },
  { name: 'Hockey', image: require('../assets/sports/Hockey.png'), likes: '1.80K' },
];

export default function SportSelectorScreen({ navigation }: Props) {
  const handleSelect = (sport: string) => {
    navigation.replace('Main');
  };

  const renderCard = ({ item }: { item: SportItem }) => (
    <TouchableOpacity onPress={() => handleSelect(item.name)} style={styles.card}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardFooter}>
        <Text style={styles.sportName}>{item.name}</Text>
        <View style={styles.likesContainer}>
          <Text style={styles.heart}>♡</Text>
          <Text style={styles.likesText}>{item.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.categoryTitle}>🎯 Goal-Oriented</Text>
        <FlatList
          data={goalOriented}
          renderItem={renderCard}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
        <Text style={styles.categoryTitle}>🏟️ Arena-Oriented</Text>
        <FlatList
          data={arenaOriented}
          renderItem={renderCard}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    color: 'white',
    fontSize: 20,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 10,
  },
  card: {
    width: 160,
    height: 180,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  sportName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: {
    fontSize: 14,
    color: '#222',
    marginRight: 4,
  },
  likesText: {
    fontSize: 13,
    color: '#222',
  },
});
