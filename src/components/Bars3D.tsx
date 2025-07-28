import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

interface Participant {
  id: string;
  name: string;
  bid: number;
  isUser: boolean;
}

interface Bars3DProps {
  participants: Participant[];
  maxBid: number;
}

// Отдельный компонент для одного бара
interface BarProps {
  position: [number, number, number];
  height: number;
  isUser: boolean;
  name: string;
  bid: number;
}

const Bar3D: React.FC<BarProps> = ({ position, height, isUser }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Размеры бара
  const width = 1.5;
  const depth = 1.5;
  const barHeight = Math.max(height, 0.2);

  // Простые материалы без сложных эффектов
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: isUser ? "#00CAF1" : "#4A4A5A",
      transparent: true,
      opacity: 0.8,
    });
  }, [isUser]);

  return (
    <group position={position}>
      {/* Основной бар */}
      <mesh ref={meshRef} position={[0, barHeight / 2, 0]}>
        <boxGeometry args={[width, barHeight, depth]} />
        <primitive object={material} />
      </mesh>
    </group>
  );
};

// Основной компонент
const Bars3D: React.FC<Bars3DProps> = ({ participants, maxBid }) => {
  // Нормализуем высоты баров
  const normalizeHeight = (bid: number) => {
    const maxHeight = 6; // Максимальная высота в Three.js единицах
    return (bid / maxBid) * maxHeight;
  };

  // Fallback на случай ошибок
  if (!participants || participants.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      {/* 3D Canvas */}
      <Canvas
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        camera={{
          position: [8, 8, 8],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
      >
        {/* Освещение */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />

        {/* Бары */}
        {participants.map((participant, index) => {
          const spacing = 3;
          const xPosition = (index - 1) * spacing; // Центрируем

          return (
            <Bar3D
              key={participant.id}
              position={[xPosition, 0, 0]}
              height={normalizeHeight(participant.bid)}
              isUser={participant.isUser}
              name={participant.name}
              bid={participant.bid}
            />
          );
        })}
      </Canvas>

      {/* HTML Overlay для текста */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: 0,
          width: "100%",
          pointerEvents: "none",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: "100px",
        }}
      >
        {participants.map((participant) => (
          <div
            key={participant.id}
            style={{
              textAlign: "center",
              color: participant.isUser ? "#00CAF1" : "#FFFFFF",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {participant.name}
          </div>
        ))}
      </div>

      {/* Overlay для значений ставок */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: 0,
          width: "100%",
          pointerEvents: "none",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "100px",
        }}
      >
        {participants.map((participant) => (
          <div
            key={participant.id}
            style={{
              textAlign: "center",
              color: "#FFFFFF",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {participant.bid.toLocaleString("ru-RU")} ₽
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bars3D;
