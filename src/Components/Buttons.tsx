import React, { FC } from 'react';
import { Button } from '@mui/material';

type prop = {
  text: string;
  onClick?: () => void;
};

const Buttons: FC<prop> = ({ text, onClick }): JSX.Element => {
  return (
    <Button
      variant="contained"
      size="large"
      style={{
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default Buttons;
