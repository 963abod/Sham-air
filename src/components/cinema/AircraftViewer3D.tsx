'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { FLEET_DATA } from '@/data/fleetData';
import { useDirection } from '@/hooks/useDirection';
import { Rotate3d, ShieldCheck, Sparkles, Wind } from 'lucide-react';

function ProceduralAircraftModel({ modelType }: { modelType: string }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const isA350 = modelType.includes('350');

  return (
    <group ref={meshRef}>
      {/* Fuselage Main Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.7, 8, 32]} />
        <meshStandardMaterial
          color="#0B0C0D"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Nose Cone */}
      <mesh position={[0, 4.3, 0]}>
        <coneGeometry args={[0.7, 1.2, 32]} />
        <meshStandardMaterial color="#B79A63" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Main Wings */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.15, isA350 ? 10 : 9, 1.8]} />
        <meshStandardMaterial color="#121416" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Wingtip Gold Accents */}
      <mesh position={[-4.9, 0.6, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.4]} />
        <meshStandardMaterial color="#B79A63" />
      </mesh>
      <mesh position={[4.9, 0.6, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.4]} />
        <meshStandardMaterial color="#B79A63" />
      </mesh>

      {/* Tail Fin */}
      <mesh position={[0, -3.4, 0.8]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.1, 1.6, 1.4]} />
        <meshStandardMaterial color="#B79A63" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Jet Engines */}
      <mesh position={[-1.8, 0.1, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.38, 1.4, 24]} />
        <meshStandardMaterial color="#292A29" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.8, 0.1, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.38, 1.4, 24]} />
        <meshStandardMaterial color="#292A29" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export function AircraftViewer3D({ locale }: { locale: string }) {
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);
  const [selectedAircraftIndex, setSelectedAircraftIndex] = useState(0);
  const currentAircraft = FLEET_DATA[selectedAircraftIndex];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-20 bg-sham-dark relative overflow-hidden text-sham-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sham-brass/10 border border-sham-brass/30 text-sham-brass text-xs uppercase font-bold">
            <Rotate3d className="w-3.5 h-3.5" />
            <span>{isRTL ? 'مفتش الأسطول ثلاثي الأبعاد' : '3D WebGL Aircraft Inspector'}</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-bold ${titleFontClass}`}>
            {isRTL ? 'أسطول شام الفائق الحديث' : 'The SHAM AIR Imperial Fleet'}
          </h2>
          <p className={`text-xs sm:text-sm text-sham-stone/70 ${fontClass}`}>
            {isRTL
              ? 'استكشف طائراتنا المصممة بأعلى معايير الهندسة الجوية والفخامة الدمشقية.'
              : 'Interactive 360° inspector for Airbus A350-1000 Ultra & Boeing 787-9 Dreamliner.'}
          </p>
        </div>

        {/* Aircraft Selector Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {FLEET_DATA.map((plane, idx) => (
            <button
              key={plane.id}
              onClick={() => setSelectedAircraftIndex(idx)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                selectedAircraftIndex === idx
                  ? 'bg-sham-brass text-sham-dark shadow-brass-glow'
                  : 'glass-panel text-sham-stone hover:text-sham-ivory border border-sham-brass/20'
              }`}
            >
              {plane.name}
            </button>
          ))}
        </div>

        {/* Main 3D Canvas & Specs Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* 3D WebGL Canvas */}
          <div className="lg:col-span-7 h-[420px] glass-panel-gold rounded-2xl border border-sham-brass/40 relative overflow-hidden shadow-luxury">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] uppercase text-sham-brass font-bold bg-sham-dark/80 px-3 py-1.5 rounded border border-sham-brass/30">
              <Rotate3d className="w-3.5 h-3.5 animate-spin" />
              <span>{isRTL ? 'اسحب للتدوير 360 درجة' : 'Drag to rotate 360°'}</span>
            </div>

            {isMounted ? (
              <Canvas className="w-full h-full cursor-grab active:cursor-grabbing">
                <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={50} />
                <ambientLight intensity={1.2} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#B79A63" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
                <ProceduralAircraftModel modelType={currentAircraft.name} />
                <OrbitControls enableZoom={true} maxDistance={15} minDistance={5} />
              </Canvas>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sham-stone text-xs">
                Loading 3D WebGL Engine...
              </div>
            )}
          </div>

          {/* Aircraft Specifications Panel */}
          <div className="lg:col-span-5 space-y-6 glass-panel p-6 sm:p-8 rounded-2xl border border-sham-brass/30">
            <div>
              <span className="text-xs uppercase text-sham-brass font-bold tracking-widest">{currentAircraft.manufacturer}</span>
              <h3 className={`text-2xl font-bold text-sham-ivory ${titleFontClass}`}>{currentAircraft.name}</h3>
              <p className={`text-xs text-sham-brass/90 italic mt-1 ${fontClass}`}>{currentAircraft.tagline}</p>
            </div>

            <p className={`text-xs text-sham-stone/80 leading-relaxed ${fontClass}`}>
              {currentAircraft.description}
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-sham-borderDark pt-4 text-xs">
              <div>
                <span className="text-sham-stone/60 text-[10px] uppercase block">{isRTL ? 'المدى الأقصى' : 'Max Range'}</span>
                <span className="font-bold text-sham-brass">{currentAircraft.rangeKm.toLocaleString()} km</span>
              </div>
              <div>
                <span className="text-sham-stone/60 text-[10px] uppercase block">{isRTL ? 'سرعة التحليق' : 'Cruise Speed'}</span>
                <span className="font-bold text-sham-brass">{currentAircraft.cruiseSpeedKm}</span>
              </div>
              <div>
                <span className="text-sham-stone/60 text-[10px] uppercase block">{isRTL ? 'قوة المحركات' : 'Thrust Power'}</span>
                <span className="font-bold text-sham-stone">{currentAircraft.engineThrust}</span>
              </div>
              <div>
                <span className="text-sham-stone/60 text-[10px] uppercase block">{isRTL ? 'السعة الكلية' : 'Capacity'}</span>
                <span className="font-bold text-sham-stone">{currentAircraft.capacity} Seats</span>
              </div>
            </div>

            {/* Seat Pitch Detail */}
            <div className="bg-sham-dark/90 p-4 rounded-xl border border-sham-brass/20 space-y-2 text-xs">
              <span className="text-sham-brass font-bold uppercase text-[10px] block flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {isRTL ? 'مواصفات المقاعد والراحة' : 'Cabin Seat Pitch & Comfort Specs'}
              </span>
              <ul className="space-y-1 text-sham-stone/80 text-[11px]">
                <li><strong className="text-sham-ivory">First Suite:</strong> {currentAircraft.seatPitch.first}</li>
                <li><strong className="text-sham-ivory">Business:</strong> {currentAircraft.seatPitch.business}</li>
                <li><strong className="text-sham-ivory">Premium Econ:</strong> {currentAircraft.seatPitch.premiumEcon}</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
