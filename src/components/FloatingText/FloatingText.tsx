import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { SpringValue } from "@react-spring/web";
import { Vector3, Mesh } from "three";
import { colorPalette } from "../../utils/constants";

type FloatingTextProps = {
    text: string;
    overridedOpacity: SpringValue<number>;
};

const FloatingText: React.FC<FloatingTextProps> = ({
    text,
    overridedOpacity,
}) => {
    const meshRef = useRef<Mesh>(null!);
    const { opacity } = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 2000 },
        reset: true,
    });

    useFrame(({ pointer }) => {
        if (meshRef.current) {
            const targetPosition = new Vector3(
                pointer.x * 0.5,
                0 + pointer.y * 0.5,
                0
            );

            meshRef.current.position.lerp(targetPosition, 0.1);
            meshRef.current.children.forEach((child) => {
                const meshChild = child as Mesh;

                if (meshChild.material) {
                    const material = Array.isArray(meshChild.material)
                        ? meshChild.material[0]
                        : meshChild.material;

                    if (material.opacity !== undefined)
                        material.opacity =
                            overridedOpacity.get() ?? opacity.get();
                }
            });
        }
    });

    return (
        <animated.mesh ref={meshRef}>
            <Text
                font="https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WlhzQ.woff"
                color={colorPalette.lime}
                fontSize={0.5}
                maxWidth={200}
                lineHeight={1}
                letterSpacing={0.4}
                textAlign="center"
            >
                {text}
            </Text>
        </animated.mesh>
    );
};

export default FloatingText;