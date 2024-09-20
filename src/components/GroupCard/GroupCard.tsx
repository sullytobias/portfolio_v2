import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group } from "three";
import { useSpring, animated } from "@react-spring/three";

type CategoriesTypes = {
    cardPositionX: number;
    categoryTitle: string;
    cardColor: string;
};

type GroupCardProps = {
    lightOn: boolean;
    onCardClick?: (index: number) => void;
    categories: CategoriesTypes[];
    activeCardIndex: number;
    interactionDisabled: boolean;
};

const GroupCard: React.FC<GroupCardProps> = ({
    lightOn,
    onCardClick,
    categories,
    activeCardIndex,
    interactionDisabled,
}) => {
    const meshRef = useRef<Group>(null!);
    const [showText, setShowText] = useState(false);

    const { positionY } = useSpring({
        positionY: lightOn ? 0 : 5,
        config: { duration: 1000 },
        onRest: () => setShowText(true),
    });

    const { opacity } = useSpring({
        opacity: showText ? 1 : 0,
        config: { duration: 1000 },
    });

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        if (meshRef.current)
            meshRef.current.position.y =
                positionY.get() + Math.sin(time * 2) * 0.2;
    });

    const currentCategory = (index: number) => index === activeCardIndex;

    return (
        <animated.group ref={meshRef} position={[0, positionY.get(), -2]}>
            {categories.map(
                ({ cardPositionX, categoryTitle, cardColor }, index) => (
                    <group key={categoryTitle}>
                        <Card
                            positionX={cardPositionX}
                            onClick={() =>
                                !interactionDisabled && onCardClick?.(index)
                            }
                            enteringSphere={currentCategory(index)}
                            cardColor={cardColor}
                        />
                        {lightOn && (
                            <animated.mesh>
                                <Text
                                    position={[cardPositionX, -2.5, 0]}
                                    fontSize={0.5}
                                    color="white"
                                    anchorX="center"
                                    anchorY="middle"
                                >
                                    <animated.meshStandardMaterial
                                        opacity={opacity}
                                        transparent
                                    />
                                    {categoryTitle}
                                </Text>
                            </animated.mesh>
                        )}
                    </group>
                )
            )}
        </animated.group>
    );
};

export default GroupCard;