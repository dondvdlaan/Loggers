import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Props{
    title: String,
    onClose: () => void,
    action: String,
    error: any
}

export default function ErrorDialog(props: Props) {

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert 
        onClose={props.onClose}
        variant="outlined" 
        severity="error"
      >
        - Message: {props.title} - 
         Error: {JSON.stringify(props.error.message)} -  
         Action: {props.action} 
      </Alert>
    </Stack>
  );
}