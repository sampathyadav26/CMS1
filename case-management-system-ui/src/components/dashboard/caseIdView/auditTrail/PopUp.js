import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import Link from '@mui/material/Link';
import { styled } from '@mui/system';
import PopUpComponent from './TimelineComponent';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  backdropFilter: 'blur(5px)',
}));


const ViewFullTrail = ({caseId}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      {/* Use Link component for underlined text */}
      <Link
        component="button"
        variant="outlined"
        underline="hover"
        onClick={handleOpenDialog}
        fontSize="10px"
      >
        View full Trail
      </Link>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} BackdropComponent={StyledBackdrop}>
        <PopUpComponent onClose={handleCloseDialog} caseId={caseId} />
      </Dialog>
    </div>
  );
};

export default ViewFullTrail;
