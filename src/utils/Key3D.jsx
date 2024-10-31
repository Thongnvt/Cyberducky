import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';

function Key({ keyValue }) {
    const [position, setPosition] = useState([0, 0, 0]); // Vị trí của phím

    // Hook để kéo phím
    const bind = useDrag((state) => {
        const [x, y] = state.offset;
        setPosition([x / 100, -y / 100, 0]); // Chia để điều chỉnh tốc độ kéo
    });

    return (
        <mesh {...bind()} position={position}>
            <boxGeometry args={[1, 0.5, 1]} /> {/* Kích thước của phím */}
            <meshStandardMaterial color="hotpink" />
            <mesh position={[0, 0, 0.6]}>
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[0, 0, 0.5]} >
                <textGeometry args={[keyValue, { size: 0.2, height: 0.1 }]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </mesh>
    );
}

function Keyboard() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 5]} />
            {/* Tạo ra nhiều phím bấm */}
            <Key keyValue="A" />
            <Key keyValue="S" position={[1.5, 0, 0]} />
            <Key keyValue="D" position={[3, 0, 0]} />
            {/* Thêm các phím khác tại đây */}
        </Canvas>
    );
}

export default Keyboard;
