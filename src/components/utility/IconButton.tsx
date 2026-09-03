import React from 'react';
import { Button, ButtonProps } from './Button';

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode;
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, ariaLabel, ...props }) => {
  return (
    <Button {...props} ariaLabel={ariaLabel}>
      {icon}
    </Button>
  );
};
