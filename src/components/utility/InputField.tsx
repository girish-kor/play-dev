import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { useId } from '../../hooks/useId';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.error};
`;

export const InputField: React.FC<InputFieldProps> = ({ label, error, id, ...props }) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const theme = useTheme();

  return (
    <InputContainer theme={theme}>
      {label && (
        <Label htmlFor={inputId} theme={theme}>
          {label}
        </Label>
      )}
      <StyledInput
        id={inputId}
        $hasError={!!error}
        theme={theme}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <ErrorText id={`${inputId}-error`} theme={theme}>
          {error}
        </ErrorText>
      )}
    </InputContainer>
  );
};
