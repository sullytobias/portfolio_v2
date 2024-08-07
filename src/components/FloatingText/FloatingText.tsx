// src/components/MovingText.tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

import { useSpring, animated, SpringValue } from "@react-spring/three";

import { Vector3, Mesh } from "three";

type FloatingTextTypes = {
    text: string;
    overridedOpacity: SpringValue<number>;
};

const FloatingText = ({ text, overridedOpacity }: FloatingTextTypes) => {
    const meshRef = useRef<Mesh>(null!);
    const { opacity } = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 2000 },
        reset: true,
    });

    useFrame(({ pointer }) => {
        if (meshRef.current) {
            const movementScale = 0.5;
            const targetPosition = new Vector3(
                pointer.x * movementScale,
                -5 + pointer.y * movementScale,
                0
            );

            meshRef.current.position.lerp(targetPosition, 0.1);

            meshRef.current.children.forEach(({ material }) => {
                if (material)
                    material.opacity = overridedOpacity.get() ?? opacity.get();
            });
        }
    });

    return (
        <animated.mesh ref={meshRef}>
            <Text
                color="#FFFC31"
                fontSize={0.4}
                maxWidth={200}
                lineHeight={1}
                letterSpacing={0.5}
                textAlign="center"
            >
                {text}
            </Text>
        </animated.mesh>
    );
};

export default FloatingText;
