import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  CameraView,
  useCameraPermissions,
  CameraType,
} from 'expo-camera';
import Svg, { Circle, Line, Polygon } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';

type Point = { x: number; y: number };

export default function RecordScreen() {
  /* ---------- 权限 ---------- */
  const [permission, requestPermission] = useCameraPermissions();
  const hasPermission = permission?.granted ?? null;

  /* ---------- 相机引用 ---------- */
  const cameraRef = useRef<CameraView | null>(null);

  /* ---------- 页面聚焦 ---------- */
  const isFocused = useIsFocused();

  /* ---------- 淡入淡出动画 ---------- */
  const camOpacity = useRef(new Animated.Value(0)).current;   // 相机淡入
  const hintFade   = useRef(new Animated.Value(1)).current;   // 提示淡出

  /* ---------- 业务状态 ---------- */
  const [mode, setMode] = useState<'Goal-Oriented' | 'Ground-Oriented'>('Goal-Oriented');
  const [points, setPoints] = useState<Point[]>([]);

  /* ---------- 页面聚焦时：重置蓝点 & 提示框 & 相机透明度 ---------- */
  useEffect(() => {
    if (isFocused) {
      setPoints([]);
      hintFade.setValue(1);
      camOpacity.setValue(0);
      // 提示框 1s 后淡出
      Animated.timing(hintFade, {
        toValue: 0,
        duration: 300,
        delay: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused, hintFade, camOpacity]);

  /* ---------- 相机就绪 → 淡入 ---------- */
  const handleCameraReady = () => {
    Animated.timing(camOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  /* ---------- 点击打点 ---------- */
  const handlePress = (e: any) => {
    const { locationX, locationY } = e.nativeEvent;
    setPoints(prev =>
      prev.length < 4 ? [...prev, { x: locationX, y: locationY }] : [{ x: locationX, y: locationY }],
    );
  };

  /* ---------- 模式切换 ---------- */
  const toggleMode = () => {
    setMode(prev => (prev === 'Goal-Oriented' ? 'Ground-Oriented' : 'Goal-Oriented'));
    setPoints([]);
  };

  /* ---------- 权限处理 ---------- */
  if (hasPermission === null) {
    requestPermission();
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.noPerm}>No access to camera.</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        /* 相机淡入包裹层 */
        <Animated.View style={[styles.cameraWrapper, { opacity: camOpacity }]}>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing="back"
            onCameraReady={handleCameraReady}
          >
            {/* —— 提示框 —— */}
            <Animated.View style={[styles.hintBox, { opacity: hintFade }]}>
              <Text style={styles.hintText}>Please draw region clockwise</Text>
              <Text style={styles.hintArrow}>↻</Text>
            </Animated.View>

            {/* —— 点 / 线 / 遮罩 —— */}
            <Pressable style={StyleSheet.absoluteFill} onPress={handlePress}>
              <Svg style={StyleSheet.absoluteFill}>
                {points.map((p, i) => (
                  <Circle key={i} cx={p.x} cy={p.y} r={6} fill="blue" />
                ))}
                {points.length === 4 && (
                  <>
                    {[0, 1, 2, 3].map(i => (
                      <Line
                        key={i}
                        x1={points[i].x}
                        y1={points[i].y}
                        x2={points[(i + 1) % 4].x}
                        y2={points[(i + 1) % 4].y}
                        stroke="blue"
                        strokeWidth={2}
                      />
                    ))}
                    <Polygon
                      points={points.map(p => `${p.x},${p.y}`).join(' ')}
                      fill="rgba(0,0,0,0.2)"
                    />
                  </>
                )}
              </Svg>
            </Pressable>

            {/* —— 模式按钮 —— */}
            <TouchableOpacity style={styles.toggleBtn} onPress={toggleMode}>
              <Text style={styles.toggleTxt}>{mode}</Text>
            </TouchableOpacity>
          </CameraView>
        </Animated.View>
      )}
    </View>
  );
}

/* ---------- 样式 ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraWrapper: { flex: 1, backgroundColor: '#000' },
  noPerm: { flex: 1, textAlign: 'center', textAlignVertical: 'center', color: '#fff' },

  /* 提示框 */
  hintBox: {
    position: 'absolute',
    top: 90,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 6,
  },
  hintText:  { fontSize: 14, fontWeight: '600', color: '#000' },
  hintArrow: { fontSize: 18, marginLeft: 6, color: '#000' },

  /* 模式按钮 */
  toggleBtn: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  toggleTxt: { color: '#fff', fontSize: 16 },
});
