import React from 'react';
import { Award, ShieldCheck, UserCheck } from 'lucide-react';
import awardImage from '../assets/team/Felix-award.jpg';
import awardImage1 from '../assets/team/Samuel-award.jpg'
import awardImage2 from '../assets/team/Goodnews-award.jpg';
import awardImage3 from  "../assets/team/Tenerifa-award (1).jpg"
import awardImage4 from '../assets/team/felix-award (2).jpg';
import awardImage5 from '../assets/team/Sam.jpg';



interface AwardItem {
  title: string;
  recipient: string;
  organization: string;
  category: string;
  desc: string;
  recipientImage: string;
  awardImage: string;
}

export const Awards: React.FC = () => {
  const individualAwardsList: AwardItem[] = [
    {
      title: 'Most Innovative Student at Bonny Digital Literacy Initiative 2026',
      recipient: 'Awajiikatelem Felix (CEO)',
      organization: 'Technoville Innovation, Nigeria',
      category: 'Innovation & Leadership',
      desc: 'Recognized as the most innovative student for driving creative problem-solving and digital transformation through technology leadership and impactful building.',
      recipientImage: '/assets/awards/maya-patel.jpg',
      awardImage: awardImage
    },
    {
      title: 'Overall Best Student Award 2026 at Bonny Digital Literacy Initiative (BDLI)',
      recipient: 'Samuel Brown (CTO)',
      organization: 'Technoville Innovation, Nigeria',
      category: 'Robotics & AI',
      desc: 'Awarded as the overall best student for outstanding excellence in technology learning, innovation, and applied problem-solving across emerging digital fields.',
      recipientImage: '/assets/awards/alex-chen.jpg',
      awardImage: awardImage5
    },
    {
      title: 'Best Frontend Developer',
      recipient: 'Goodnews Uwem',
      organization: 'Technoville Innovation, Nigeria',
      category: 'Frontend & Web Development',
      desc: 'Honored for building polished, functional, and user-centered web experiences with strong frontend execution and modern development practices.',
      recipientImage: '/assets/awards/liam-vance.jpg',
      awardImage: awardImage2
    },
    {
      title: 'Best Collaborative Student at Bonny Digital Literacy Initiative 2026',
      recipient: 'Tenerifa Igwe (Research Lead)',
      organization: 'Technoville Innovation Nigeria',
      category: 'Research & Collaboration',
      desc: 'Recognized for exceptional teamwork, research excellence, and collaborative problem-solving that helped turn ideas into meaningful digital solutions.',
      recipientImage: '/assets/awards/sophia-rossi.jpg',
      awardImage: awardImage3
    },
    {
      title: 'Best in Backend Development at Bonny Digital Literacy Initiative 2026',
      recipient: 'Awajiikatelem Felix (CEO)',
      organization: 'Technoville Innovation Nigeria',
      category: 'Backend Development & System Architecture',
      desc: 'Awarded for outstanding backend development skills, system architecture design, and building scalable digital solutions that solve real-world problems.',
      recipientImage: '/assets/awards/devon-kim.jpg',
      awardImage: awardImage4
    },
    {
      title: 'Most Proactive Student at Bonny Digital Literacy Initiative 2026',
      recipient: 'Samuel Brown',
      organization: 'Technoville Innovation Nigeria',
      category: 'Proactivity & Initiative',
      desc: 'Recognized for proactive engagement, initiative-taking, and consistently contributing to team success through innovative ideas and practical solutions.',
      recipientImage: '/assets/awards/alex-chen.jpg',
      awardImage: awardImage1
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-slate-950/80 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Honors & Achievements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Individual Member <span className="gradient-text">Awards & Presentation Photos</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Our 5 team members hold 6 verified individual awards, shown here with the presentation ceremonies.
          </p>
        </div>

        {/* 6 Awards Grid - Big Images */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {individualAwardsList.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                
                {/* Large Presentation Image */}
                <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={item.awardImage}
                    alt={item.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = awardImage;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Recipient Rounded Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-slate-950/80 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-sky-400/50 bg-slate-800 shrink-0">
                      <img
                        src={item.recipientImage}
                        alt={item.recipient}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = awardImage;
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 block font-mono">Recipient</span>
                      <span className="text-xs font-bold text-white block">{item.recipient.split(' ')[0]} {item.recipient.split(' ')[1]}</span>
                    </div>
                  </div>

                  <span className="absolute top-4 right-4 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/80 text-amber-400 border border-slate-800 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <span className="text-xs font-semibold text-slate-400 block">
                    Presented by: {item.organization}
                  </span>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Presentation Photo</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
