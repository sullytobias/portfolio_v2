import { FC, Fragment, useMemo } from "react";
import { animated, SpringValue } from "@react-spring/three";
import ContactInfo from "./Contact/Contact";
import Skills from "./Skills/Skills";
import Projects from "./Projects/Projects";

type SpaceProps = {
    color: string;
    opacity: SpringValue<number>;
    activeCategory: "Contacts" | "Skills" | "Projects";
};

const Overlay = ({
    color,
    opacity,
}: {
    color: string;
    opacity: SpringValue<number>;
}) => (
    <mesh position={[0, 0, -5]}>
        <planeGeometry args={[window.innerWidth, window.innerHeight]} />
        <animated.meshStandardMaterial
            color={color}
            transparent
            opacity={opacity}
        />
    </mesh>
);

const Space: FC<SpaceProps> = ({ color, opacity, activeCategory }) => {
    const contentMap = useMemo(
        () => ({
            Contacts: <ContactInfo />,
            Skills: <Skills />,
            Projects: <Projects />,
        }),
        []
    );

    return (
        <Fragment>
            <Overlay opacity={opacity} color={color} />
            {contentMap[activeCategory]}
        </Fragment>
    );
};

export default Space;