import Image from "next/image";
import Scene from "./components/Scene";
import FancyBox from "./components/FancyBox";
import Section from "./components/Section";

export default function Home() {
  return (
    <div className="flex flex-col font-sans relative" style={{ backgroundColor: '#b9c49f' }}>
      {/* Large quarter circle in top left */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{ backgroundColor: '#fff1db', borderRadius: '0 0 100% 0'}}
      />
      <main className="w-full max-w-5xl relative z-10 mx-auto">
        {/* Hero Section - Picture and Title */}
        <section className="flex min-h-screen items-center justify-center py-32 px-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
            {/* Left side - Content */}
            <div className="flex flex-col gap-6 md:w-1/2">
              <h1 className="text-6xl md:text-7xl font-bold text-white">Anisa Roshan-Zamir</h1>
              <div className="flex flex-col gap-3 text-xl md:text-2xl text-white/90">
                <p className="font-medium">Mechanical Engineering</p>
                <p className="text-lg md:text-xl text-white/80">UT Dallas • 4.0 GPA</p>
                <p className="text-lg md:text-xl text-white/80">Structures & Payload • Commet Rocketry</p>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative">
                <Image 
                  src="/images/anisa/anisa.jpeg" 
                  alt="Anisa Roshan-Zamir" 
                  width={400}
                  height={400}
                  className="rounded-full object-cover w-64 h-64 md:w-80 md:h-80 border-4 border-white shadow-md"
                />
                {/* Small rocket launch image overlapping bottom left */}
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
        </section>

        {/* Projects Section */}
        <Section header="Projects">
          <FancyBox>
            <div className="relative z-0 w-full max-w-xl aspect-video mx-auto">
              <Scene modelPath="/models/glue_gun.obj" />
            </div>
          </FancyBox>
        </Section>

        {/* Experience Section */}
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

        {/* Skills Section */}
        <Section header="Skills">
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
      </main>
    </div>
  );
}
