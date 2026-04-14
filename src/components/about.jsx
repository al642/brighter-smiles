import { useState } from 'react';
import { teamMembers } from '../data/team.js';
import { useMediaQuery } from '../utils/use-media-query.js';

const storyMoments = [
  {
    number: '01',
    title: 'Care that feels calm',
    text: 'Patients are welcomed into a clinic experience designed to reduce anxiety and build trust from the first conversation.'
  },
  {
    number: '02',
    title: 'Clinical depth',
    text: 'The practice combines preventive, restorative, cosmetic, and orthodontic care so treatment can stay coordinated.'
  },
  {
    number: '03',
    title: 'Community focus',
    text: 'Brighter Smiles supports outreach work that expands oral health access beyond the walls of the clinic.'
  }
];

export function About() {
  const [leadMember, ...supportingTeam] = teamMembers;
  const isMobile = useMediaQuery('(max-width: 820px)');
  const [expandedMember, setExpandedMember] = useState(0);

  const toggleMember = (index) => {
    setExpandedMember((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <>
      <section id="about" className="story-section">
        <div className="shell-inner story-grid">
          <div className="story-sticky" data-reveal="slide-right">
            <p className="eyebrow">About the clinic</p>
            <h2>Strong dental care starts with trust, consistency, and a team that listens.</h2>
            <p>
              Brighter Smiles combines modern treatment with a welcoming atmosphere, helping
              families and individuals feel cared for before, during, and after every visit.
            </p>
            <ul className="analysis-list">
              <li>Experienced leadership grounded in restorative and preventive care.</li>
              <li>Patient communication that keeps treatment simple and reassuring.</li>
              <li>Team expertise across orthodontics, nursing, and cosmetic dentistry.</li>
              <li>Community outreach that extends oral health education and access.</li>
            </ul>
          </div>

          <div className="story-steps">
            {storyMoments.map((item, index) => (
              <article
                key={item.number}
                className="story-card"
                data-reveal={index % 2 === 0 ? 'slide-up' : 'slide-left'}
              >
                <span className="story-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="shell-inner">
          <div className="section-heading" data-reveal="slide-up">
            <p className="eyebrow">Meet the team</p>
            <h2>Clinical expertise with a more human, reassuring approach.</h2>
          </div>

          {isMobile ? (
            <div className="team-mobile-stack">
              {teamMembers.map((member, index) => {
                const isExpanded = expandedMember === index;

                return (
                  <article
                    key={member.name}
                    className={isExpanded ? 'team-card team-card--accordion is-expanded' : 'team-card team-card--accordion'}
                  >
                    <button
                      type="button"
                      className="team-card-toggle"
                      aria-expanded={isExpanded}
                      onClick={() => toggleMember(index)}
                    >
                      <img src={member.image} alt={member.name} className="team-card-image" />
                      <div className="team-card-copy">
                        <p className="team-role">{member.role}</p>
                        <h3>{member.name}</h3>
                      </div>
                      <span className="team-card-chevron" aria-hidden="true">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    <div className="team-card-details">
                      <p>
                        {index === 0
                          ? 'Dr. Chris founded Brighter Smiles with a vision to deliver world-class dental care in Mbarara while maintaining high standards of comfort, safety, and compassion.'
                          : member.summary}
                      </p>
                      {index === 0 ? (
                        <div className="credentials">
                          <span>BDS, Makerere University</span>
                          <span>Advanced Restorative Dentistry</span>
                          <span>Member, Uganda Dental Association</span>
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <>
              <div className="team-feature" data-reveal="zoom-in">
                <img src={leadMember.image} alt={leadMember.name} className="team-feature-image" />
                <div className="team-feature-copy">
                  <p className="team-role">{leadMember.role}</p>
                  <h3>{leadMember.name}</h3>
                  <p>
                    Dr. Chris founded Brighter Smiles with a vision to deliver world-class dental care
                    in Mbarara while maintaining high standards of comfort, safety, and compassion.
                  </p>
                  <div className="credentials">
                    <span>BDS, Makerere University</span>
                    <span>Advanced Restorative Dentistry</span>
                    <span>Member, Uganda Dental Association</span>
                  </div>
                </div>
              </div>

              <div className="team-grid">
                {supportingTeam.map((member, index) => (
                  <article
                    key={member.name}
                    className="team-card"
                    data-reveal={index === 1 ? 'slide-up' : 'slide-left'}
                  >
                    <img src={member.image} alt={member.name} className="team-card-image" />
                    <div className="team-card-copy">
                      <p className="team-role">{member.role}</p>
                      <h3>{member.name}</h3>
                      <p>{member.summary}</p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
