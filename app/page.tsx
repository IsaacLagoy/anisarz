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
          <Section>
            <div className="relative w-full h-full">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full relative z-10">
                <div className="flex flex-col gap-6 md:w-1/2 text-[#333]">
                  <h1 className="text-6xl md:text-7xl font-bold">Anisa Roshan-Zamir</h1>
                  <div className="flex flex-col gap-3 text-xl md:text-2xl">
                    <p className="font-medium">Mechanical Engineering</p>
                    <p className="text-lg md:text-xl">UT Dallas • 4.0 GPA</p>
                    <p className="text-lg md:text-xl">Structures & Payload • Commet Rocketry</p>
                  </div>
                </div>
                
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <div className="relative">
                    <Image 
                      src="/images/anisa/anisa.jpeg" 
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
        <Section header="Projects" dark>
          <FancyBox>
            <div className="relative z-0 w-full max-w-xl aspect-video mx-auto">
              <MemoizedScene modelPath={["/models/brokenrook.obj"]} position={[0, -1.2, 0]}/>
            </div>
          </FancyBox>
          <FancyBox>
            <div className="relative z-0 w-full max-w-xl aspect-video mx-auto">
              <MemoizedScene modelPath={["/models/glue_gun.obj"]} position={[0, -0.6, 0]} scale={[0.02, 0.02, 0.02]}/>
            </div>
          </FancyBox>
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
          <FancyBox>
            <div className="relative z-0 w-full max-w-xl aspect-video mx-auto">
              <MemoizedScene modelPath={Array.from({ length: 109 }, (_, i) => `/models/rocketL3_${i + 1}.obj`)} scale={[2, 2, 2]} initialRotation={[0, 0, 1, 0]}/>
            </div>
          </FancyBox>
        </Section>
      )
    },
    { 
      id: 3, 
      bg: 'bg-(--main-green)', 
      content: (
        <Section header="Experience">
          <div>
            <h2><strong>Student Success Center at UTD</strong> - Academic Peer Tutor - 08/2024 – Present</h2>
            <ul>
              <li>Enhance student comprehension by providing one-on-one tutoring sessions in multi-variable calculus to between
              20-30 students a week</li>
              <li>Assist students in improving their grades by identifying individual strengths and weaknesses and walking them
              through challenging problems and helping them prepare for exams</li>
              <li>Guide students towards independent problem-solving skills through collaborative learning exercises during
              tutoring sessions</li>
            </ul>
          </div>
          <div>
            <h2><strong>Space Center Houston</strong> - Guest Services - 06/2022 - 08/2024</h2>
            <ul>
              <li>Provided customer service by welcoming guests, handling admissions, addressing inquiries, and ensuring safety
              to enhance visitor experience in a dynamic educational environment</li>
            </ul>
          </div>
        </Section>
      )
    },
    { 
      id: 4, 
      bg: 'bg-(--main-tan)', 
      content: (
        <Section header="Skills" dark>
          <div>
            <h2>Languages</h2>
            <ul>
              <li>English</li>
              <li>Spanish</li>
              <li>Romanian</li>
            </ul>
          </div>
          <div>
            <h2>Technical</h2>
            <ul>
              <li>SOLIDWORKS</li>
              <li>OpenRocket</li>
              <li>Python</li>
              <li>Microsoft 365 (Word, Excel, PowerPoint)</li>
              <li>C</li>
            </ul>
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