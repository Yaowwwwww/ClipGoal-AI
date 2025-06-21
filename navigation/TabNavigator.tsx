import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import TrainScreen from '../screens/TrainScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',       // 黑色背景
          borderTopColor: '#fff',        // 白色分隔线
          borderTopWidth: 0.5,           // 分隔线宽度（细）
        },
        tabBarActiveTintColor: 'white',   // 激活状态颜色
        tabBarInactiveTintColor: 'gray',  // 非激活状态颜色
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
      <Tab.Screen name="Library" component={TrainScreen} />
    </Tab.Navigator>
  );
}
