import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { useImage } from '../../hooks/useImage';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: string;
  status?: 'online' | 'offline' | 'away';
  onClick?: () => void;
}

const AvatarContainer = styled.div<{ $size: number; $clickable: boolean }>`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $size }) => $size * 0.4}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatusDot = styled.div<{ $status: string }>`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.surface};
  background: ${({ $status }) => {
    switch ($status) {
      case 'online':
        return '#22c55e';
      case 'offline':
        return '#64748b';
      case 'away':
        return '#eab308';
      default:
        return 'transparent';
    }
  }};
`;

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 40,
  fallback,
  status,
  onClick,
}) => {
  const theme = useTheme();
  const { error } = useImage(src || '');
  const showFallback = !src || error;

  return (
    <AvatarContainer
      $size={size}
      $clickable={!!onClick}
      onClick={onClick}
      theme={theme}
      role={showFallback ? 'img' : undefined}
      aria-label={showFallback ? alt : undefined}
    >
      {!showFallback ? (
        <AvatarImage src={src} alt={alt} />
      ) : (
        <span>{fallback || alt?.[0] || '?'}</span>
      )}
      {status && <StatusDot $status={status} theme={theme} />}
    </AvatarContainer>
  );
};
