import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

interface SkillNode {
  id: string;
  name: string;
  unlocked: boolean;
  dependencies: string[];
}

interface SkillTreeProps {
  skills: SkillNode[];
  pointsAvailable: number;
  spentPoints: number;
}

const SkillTreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkillTree: React.FC<SkillTreeProps> = ({ skills, pointsAvailable }) => {
  const theme = useTheme();
  return (
    <SkillTreeContainer theme={theme}>
      <div>Points: {pointsAvailable}</div>
      {skills.map((skill) => (
        <div key={skill.id} style={{ opacity: skill.unlocked ? 1 : 0.5 }}>
          <span>{skill.name}</span> <span>{skill.unlocked ? '✓' : '🔒'}</span>
        </div>
      ))}
    </SkillTreeContainer>
  );
};
