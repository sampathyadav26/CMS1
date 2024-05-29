import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import forwardButton from '../../image/ForwardButton.png';
import backwardButton from '../../image/BackwardButton.png'
 
const PaginationComponent = ({ totalPages, totalItems, recordsPerPage, getCurrentPage, getRecordsPerPage }) => {
  const [page, setPage] = useState(1);
 
  const startItem = Math.min((page-1) * recordsPerPage + 1, totalItems);
  const endItem = Math.min(page*recordsPerPage, totalItems);
 
  useEffect(() => {
    setPage(1);
    getCurrentPage(1);
    getRecordsPerPage(recordsPerPage);
  }, [recordsPerPage]);
 
  const handleBack = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    getCurrentPage(page-1);
  };
 
  const handleNext = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    getCurrentPage(page+1);
  };
 
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {totalPages ?
                <>
                    <IconButton onClick={handleBack} disabled={page === 1}>
                        {<img src={backwardButton} alt="backward" style={{ width: '25px', height: '25px', marginRight: 2 }} />}
                    </IconButton>
                    <Typography>
                        {`${startItem}-${endItem} of ${totalItems}`}
                    </Typography>
                    <IconButton onClick={handleNext} disabled={page === totalPages}>
                        {<img src={forwardButton} alt="forward" style={{ width: '25px', height: '25px', marginRight: 2 }} />}
                    </IconButton>
                </>
                : ""}
    </div>
  );
};
 
export default PaginationComponent;