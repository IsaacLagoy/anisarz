"use client";

import { useState, useEffect, useRef, useMemo, memo } from 'react';
import Image from 'next/image';
import FancyBox from '@/app/components/FancyBox';
import Scene from '@/app/components/Scene';
import Section from '@/app/components/Section';

// Memoize Scene to prevent re-renders on transform updates
const MemoizedScene = memo(Scene);

export default function StickyBottomDemo() {
  const [scrollOffsets, setScrollOffsets] = useState<Record<number, any>>({});
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sections = useMemo(() => [
    { 
      id: 1, 
      bg: 'bg-(--main-green)', 
      content: (
        <>
          {/* Large tan circle in top left */}
          <div 
            className="absolute top-0 left-0 rounded-full"
            style={{
              width: '120vw',
              height: '120vw',
              backgroundColor: 'var(--main-tan)',
              transform: 'translate(-50%, -50%)',
              zIndex: 0
            }}
          />
          <Section className="p-[10%]">
            <div className="relative w-full h-full">
              <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8 w-full relative z-10">
                <div className="flex flex-col gap-6 md:w-1/2 text-[#333]">
                  <h1 className="text-6xl md:text-7xl font-bold">Anisa Roshan-Zamir</h1>
                  <div className="flex flex-col gap-3 text-xl md:text-2xl">
                    <p className="font-medium">Mechanical Engineering</p>
                    <p className="text-lg md:text-xl">UT Dallas • 4.0 GPA</p>
                    <p className="text-lg md:text-xl">Commet Rocketry</p>
                  </div>
                </div>
                
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <div className="relative">
                    <Image 
                      src="/images/anisa/anisa_violin.JPG" 
                      alt="Anisa Roshan-Zamir" 
                      width={400}
                      height={400}
                      className="rounded-full object-cover w-64 h-64 md:w-80 md:h-80 border-4 border-white shadow-md"
                    />
                    <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4">
                      <Image 
                        src="/images/rocketry/rocket_launch.jpg" 
                        alt="Rocket Launch" 
                        width={80}
                        height={80}
                        className="rounded-full object-cover w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </>
      )
    },
    { 
      id: 2, 
      bg: 'bg-(--main-tan)', 
      content: (
        <Section dark className="pt-[10%]">
          <div  className="ml-[10%] mr-[10%]">
            <h2 className="text-6xl font-bold">Projects</h2>
          </div>
          <div className="flex flex-col gap-4 w-screen mt-5 mb-5">
            <div className="flex flex-col-reverse md:flex-row gap-4 bg-(--smoky-rose) p-4 shadow-xl pl-[10%] pr-[10%]">
              <FancyBox>
                <div className="relative z-0 w-full max-w-xl aspect-video mx-auto">
                  <MemoizedScene modelPath={["/models/brokenrook.obj"]} position={[0, -1.2, 0]}/>
                </div>
              </FancyBox>
              <div className="text-white">
                <h2 className="text-2xl font-bold">Rook</h2>
                <p>
                  This is a model of a rook. It is made of wood and glue.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 pl-[10%] pr-[10%] mt-5 mb-5">
              <div>
                <h2 className="text-2xl font-bold">Glue Gun</h2>
                <p>
                  This is a model of a glue gun. It is made of plastic and glue.
                </p>
              </div>
              <FancyBox>
                <div className="relative z-0 w-full max-w-xl aspect-video mx-auto">
                  <MemoizedScene modelPath={Array.from({ length: 15 }, (_, i) => `/models/glue_gun_${i + 1}.obj`)} position={[0, 0, 0]} scale={[0.02, 0.02, 0.02]}/>
                </div>
              </FancyBox>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-4 bg-(--smoky-rose) p-4 shadow-xl pl-[10%] pr-[10%] mt-5 mb-5">
              <FancyBox>
                <div className="relative z-0 w-full max-w-xl aspect-video mx-auto">
                  <MemoizedScene modelPath={[                
                    "/models/rocketL1_1.obj",
                    "/models/rocketL1_2.obj",
                    "/models/rocketL1_3.obj",
                    "/models/rocketL1_4.obj",
                    "/models/rocketL1_5.obj",
                    "/models/rocketL1_6.obj",
                    "/models/rocketL1_7.obj",
                    "/models/rocketL1_8.obj",
                    "/models/rocketL1_10.obj",
                    "/models/rocketL1_11.obj",
                    "/models/rocketL1_12.obj",
                    "/models/rocketL1_13.obj"
                    ]} position={[-0.1, 0, 0]}/>
                </div>
              </FancyBox>
              <div className="text-white">
                <h2 className="text-2xl font-bold">Rocket L1</h2>
                <p>
                  This is a model of a rocket. It is made of plastic and glue.
                </p>
              </div>
            </div>
              
            <div className="flex flex-col md:flex-row gap-4 pl-[10%] pr-[10%] mt-5 mb-10">
              <div>
                <h2 className="text-2xl font-bold">Rocket L3</h2>
                <p>
                  This is a model of a rocket. It is made of plastic and glue.
                </p>
              </div>
              <FancyBox>
                <div className="relative z-0 w-full max-w-xl aspect-video mx-auto">
                  <MemoizedScene modelPath={Array.from({ length: 109 }, (_, i) => `/models/rocketL3_${i + 1}.obj`)} scale={[2, 2, 2]} initialRotation={[0, 0, 1, 0]}/>
                </div>
              </FancyBox>
            </div>
          </div>
        </Section>
      )
    },
    { 
      id: 3, 
      bg: 'bg-(--main-green)', 
      content: (
        <Section header="Experience" className="p-[10%]">
          <div className="flex flex-col gap-8">
            {/* Achievement Badge */}
            <div 
              className="rounded-lg p-6 shadow-lg"
              style={{ 
                backgroundColor: 'var(--smoky-rose)', 
                color: 'white'
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h3 className="text-2xl font-bold">Achievement</h3>
              </div>
              <p className="text-lg">
                Ranked <strong>53rd out of 121</strong> in Spaceport America Cup 2024 in the 10K COTS category as a first-time competitor
              </p>
            </div>

            {/* Experience Cards */}
            <div className="flex flex-col gap-6">
              {/* Student Success Center */}
              <div 
                className="rounded-lg p-6 shadow-md"
                style={{ backgroundColor: 'var(--bone)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--dusty-olive)' }}>
                      Student Success Center at UTD
                    </h3>
                    <p className="text-lg font-medium" style={{ color: 'var(--smoky-rose)' }}>
                      Academic Peer Tutor
                    </p>
                  </div>
                  <span 
                    className="px-4 py-1 rounded-full text-sm font-medium self-start"
                    style={{ 
                      backgroundColor: 'var(--dusty-olive)', 
                      color: 'white' 
                    }}
                  >
                    08/2024 – Present
                  </span>
                </div>
                <ul className="flex flex-col gap-2" style={{ color: 'var(--foreground)' }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Enhance student comprehension by providing one-on-one tutoring sessions in multi-variable calculus to between 20-30 students a week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Assist students in improving their grades by identifying individual strengths and weaknesses and walking them through challenging problems and helping them prepare for exams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Guide students towards independent problem-solving skills through collaborative learning exercises during tutoring sessions</span>
                  </li>
                </ul>
              </div>

              {/* UTD Baháʼí Club */}
              <div 
                className="rounded-lg p-6 shadow-md"
                style={{ backgroundColor: 'var(--bone)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--dusty-olive)' }}>
                      UTD Baháʼí Club
                    </h3>
                    <p className="text-lg font-medium" style={{ color: 'var(--smoky-rose)' }}>
                      Vice President
                    </p>
                  </div>
                  <span 
                    className="px-4 py-1 rounded-full text-sm font-medium self-start"
                    style={{ 
                      backgroundColor: 'var(--dusty-olive)', 
                      color: 'white' 
                    }}
                  >
                    08/2024 – Present
                  </span>
                </div>
                <ul className="flex flex-col gap-2" style={{ color: 'var(--foreground)' }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Assist in organizing and preparing devotionals, firesides, and social events for the religious organization, fostering meaningful and engaging experiences for members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Attended mandatory meetings to stay informed on campus club requirements, managing documentation to maintain active club registration</span>
                  </li>
                </ul>
              </div>

              {/* Space Center Houston */}
              <div 
                className="rounded-lg p-6 shadow-md"
                style={{ backgroundColor: 'var(--bone)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--dusty-olive)' }}>
                      Space Center Houston
                    </h3>
                    <p className="text-lg font-medium" style={{ color: 'var(--smoky-rose)' }}>
                      Guest Services
                    </p>
                  </div>
                  <span 
                    className="px-4 py-1 rounded-full text-sm font-medium self-start"
                    style={{ 
                      backgroundColor: 'var(--dusty-olive)', 
                      color: 'white' 
                    }}
                  >
                    06/2022 - 08/2024
                  </span>
                </div>
                <ul className="flex flex-col gap-2" style={{ color: 'var(--foreground)' }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Provided customer service by welcoming guests, handling admissions, addressing inquiries, and ensuring safety to enhance visitor experience in a dynamic educational environment</span>
                  </li>
                </ul>
              </div>

              {/* UTD Comet Rocketry */}
              <div 
                className="rounded-lg p-6 shadow-md"
                style={{ backgroundColor: 'var(--bone)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--dusty-olive)' }}>
                      UTD Comet Rocketry
                    </h3>
                    <p className="text-lg font-medium" style={{ color: 'var(--smoky-rose)' }}>
                      Member
                    </p>
                  </div>
                  <span 
                    className="px-4 py-1 rounded-full text-sm font-medium self-start"
                    style={{ 
                      backgroundColor: 'var(--dusty-olive)', 
                      color: 'white' 
                    }}
                  >
                    08/2023 – Present
                  </span>
                </div>
                <ul className="flex flex-col gap-2" style={{ color: 'var(--foreground)' }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Member of the Rocketry structures team, assisting in 3D modeling body tube, couplers, nose cone, boat tail, bulkheads, and fins of rocket, and researching and writing out manufacturing document for construction of nose cone</span>
                  </li>
                </ul>
              </div>

              {/* Musica Nova */}
              <div 
                className="rounded-lg p-6 shadow-md"
                style={{ backgroundColor: 'var(--bone)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--dusty-olive)' }}>
                      Musica Nova
                    </h3>
                    <p className="text-lg font-medium" style={{ color: 'var(--smoky-rose)' }}>
                      Member
                    </p>
                  </div>
                  <span 
                    className="px-4 py-1 rounded-full text-sm font-medium self-start"
                    style={{ 
                      backgroundColor: 'var(--dusty-olive)', 
                      color: 'white' 
                    }}
                  >
                    08/2023 – Present
                  </span>
                </div>
                <ul className="flex flex-col gap-2" style={{ color: 'var(--foreground)' }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Violinist in the UTD chamber ensemble Musica Nova, which meets once a week to rehearse and polish repertoire for a concert every semester</span>
                  </li>
                </ul>
              </div>

              {/* Self-Employed */}
              <div 
                className="rounded-lg p-6 shadow-md"
                style={{ backgroundColor: 'var(--bone)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--dusty-olive)' }}>
                      Self-Employed
                    </h3>
                    <p className="text-lg font-medium" style={{ color: 'var(--smoky-rose)' }}>
                      Math and Science Tutor
                    </p>
                  </div>
                  <span 
                    className="px-4 py-1 rounded-full text-sm font-medium self-start"
                    style={{ 
                      backgroundColor: 'var(--dusty-olive)', 
                      color: 'white' 
                    }}
                  >
                    04/2020 - 05/2023
                  </span>
                </div>
                <ul className="flex flex-col gap-2" style={{ color: 'var(--foreground)' }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Tutored students in the surrounding area in subjects such as pre-calculus, algebra, geometry, chemistry, and physics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Increased student comprehension of difficult topics by breaking down complex concepts into manageable steps</span>
                  </li>
                </ul>
              </div>

              {/* Gulf Coast Aquatics */}
              <div 
                className="rounded-lg p-6 shadow-md"
                style={{ backgroundColor: 'var(--bone)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--dusty-olive)' }}>
                      Gulf Coast Aquatics
                    </h3>
                    <p className="text-lg font-medium" style={{ color: 'var(--smoky-rose)' }}>
                      Lifeguard
                    </p>
                  </div>
                  <span 
                    className="px-4 py-1 rounded-full text-sm font-medium self-start"
                    style={{ 
                      backgroundColor: 'var(--dusty-olive)', 
                      color: 'white' 
                    }}
                  >
                    05/2021 - 09/2021
                  </span>
                </div>
                <ul className="flex flex-col gap-2" style={{ color: 'var(--foreground)' }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Worked at various pools throughout League City opening and closing the pool, watching patrons, and checking the water's chemical levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--smoky-rose)' }}></span>
                    <span>Learned and maintained proficiency in first responder skills such as First Aid and CPR to offer individuals in distress optimal support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>
      )
    },
    { 
      id: 4, 
      bg: 'bg-(--main-tan)', 
      content: (
        <Section header="Skills" dark className="p-[10%]">
          <div className="flex flex-col gap-10">
            {/* Languages Section */}
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--dusty-olive)' }}>
                Languages
              </h2>
              <div className="flex flex-wrap gap-4">
                {['English', 'Spanish', 'Romanian'].map((lang) => (
                  <div
                    key={lang}
                    className="rounded-lg px-8 py-5 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: 'var(--main-green)' }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--smoky-rose)' }}>
                      <span className="text-white font-bold text-xl">{lang[0]}</span>
                    </div>
                    <span className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>{lang}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Section */}
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--dusty-olive)' }}>
                Technical
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* SOLIDWORKS */}
                <div
                  className="rounded-lg p-6 shadow-md flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: 'var(--main-green)' }}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src="/images/skills/solidworks_logo.png"
                      alt="SOLIDWORKS"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center font-medium" style={{ color: 'var(--foreground)' }}>SOLIDWORKS</span>
                </div>

                {/* OpenRocket */}
                <div
                  className="rounded-lg p-6 shadow-md flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: 'var(--main-green)' }}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src="/images/skills/open_rocket_logo.png"
                      alt="OpenRocket"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center font-medium" style={{ color: 'var(--foreground)' }}>OpenRocket</span>
                </div>

                {/* Creo */}
                <div
                  className="rounded-lg p-6 shadow-md flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: 'var(--main-green)' }}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src="/images/skills/creo_logo.svg"
                      alt="Creo"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center font-medium" style={{ color: 'var(--foreground)' }}>Creo</span>
                </div>

                {/* Python */}
                <div
                  className="rounded-lg p-6 shadow-md flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: 'var(--main-green)' }}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src="/images/skills/python_logo.png"
                      alt="Python"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center font-medium" style={{ color: 'var(--foreground)' }}>Python</span>
                </div>

                {/* C */}
                <div
                  className="rounded-lg p-6 shadow-md flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: 'var(--main-green)' }}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src="/images/skills/c_logo.png"
                      alt="C"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center font-medium" style={{ color: 'var(--foreground)' }}>C</span>
                </div>

                {/* Microsoft Word */}
                <div
                  className="rounded-lg p-6 shadow-md flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: 'var(--main-green)' }}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src="/images/skills/word_logo.png"
                      alt="Microsoft Word"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center font-medium" style={{ color: 'var(--foreground)' }}>Microsoft Word</span>
                </div>

                {/* Microsoft Excel */}
                <div
                  className="rounded-lg p-6 shadow-md flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: 'var(--main-green)' }}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src="/images/skills/excel_logo.png"
                      alt="Microsoft Excel"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center font-medium" style={{ color: 'var(--foreground)' }}>Microsoft Excel</span>
                </div>

                {/* Microsoft PowerPoint */}
                <div
                  className="rounded-lg p-6 shadow-md flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: 'var(--main-green)' }}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src="/images/skills/powerpoint_logo.png"
                      alt="Microsoft PowerPoint"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center font-medium" style={{ color: 'var(--foreground)' }}>Microsoft PowerPoint</span>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )
    },
  ], []);

  useEffect(() => {
    // Measure section heights after render
    const measureHeights = () => {
      const heights: Record<number, number> = {};
      sections.forEach(section => {
        const el = sectionRefs.current[section.id];
        if (el) {
          heights[section.id] = el.offsetHeight;
        }
      });
      return heights;
    };

    let rafId: number | null = null;
    let needsUpdate = false;

    const handleScroll = () => {
      if (!needsUpdate) {
        needsUpdate = true;
        rafId = requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const vh = window.innerHeight;
          const sectionHeights = measureHeights();
          
          let cumulativeHeight = 0;
          const offsets: Record<number, any> = {};
          
          sections.forEach((section) => {
            const sectionHeight = sectionHeights[section.id] || vh;
            const sectionStart = cumulativeHeight;
            const sectionEnd = cumulativeHeight + sectionHeight;
            
            if (scrollTop < sectionStart) {
              // Haven't reached this section yet - position below viewport
              const distanceToSection = sectionStart - scrollTop;
              offsets[section.id] = { type: 'below', distance: distanceToSection };
            } else if (scrollTop >= sectionStart && scrollTop < sectionEnd) {
              // Currently in this section - scroll content
              const scrollWithinSection = scrollTop - sectionStart;
              const maxScroll = Math.max(0, sectionHeight - vh);
              offsets[section.id] = { type: 'active', scroll: Math.min(scrollWithinSection, maxScroll) };
            } else {
              // Past this section - fully scrolled
              const maxScroll = Math.max(0, sectionHeight - vh);
              offsets[section.id] = { type: 'past', scroll: maxScroll };
            }
            
            cumulativeHeight += sectionHeight;
          });
          
          setScrollOffsets(offsets);
          
          // Update container height
          if (containerRef.current) {
            containerRef.current.style.height = `${cumulativeHeight}px`;
          }
          
          needsUpdate = false;
        });
      }
    };
    
    // Initial measure and setup
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={containerRef} />
      
      <div className="fixed inset-0 pointer-events-none">
        {sections.map((section, index) => {
          const offsetData = scrollOffsets[section.id];
          // Render sections even if offsetData isn't ready yet (for initial mount)
          if (!offsetData) {
            // Return a placeholder that sets up the ref, but keep it hidden
            return (
              <div
                key={section.id}
                className="absolute inset-0 opacity-0"
                style={{ pointerEvents: 'none' }}
              >
                <div 
                  ref={el => { if (el) sectionRefs.current[section.id] = el; }}
                  className="min-h-screen w-full"
                >
                  {section.content}
                </div>
              </div>
            );
          }
          
          let sectionTransform = '';
          let contentTransform = '';
          
          if (offsetData.type === 'below') {
            sectionTransform = `translateY(${offsetData.distance}px)`;
          } else if (offsetData.type === 'active' || offsetData.type === 'past') {
            contentTransform = `translateY(-${offsetData.scroll}px)`;
          }
          
          return (
            <div
              key={section.id}
              className={`absolute inset-0 ${section.bg} overflow-hidden`}
              style={{ 
                zIndex: index,
                transform: sectionTransform,
                willChange: 'transform',
                boxShadow: '0 -10px 40px -10px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div 
                ref={el => { sectionRefs.current[section.id] = el; }}
                className="min-h-screen w-full flex items-center justify-center shadow-md"
                style={{ 
                  transform: contentTransform,
                  willChange: 'transform'
                }}
              >
                {section.content}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}