'use client';

import Button from 'react-bootstrap/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error 
  reset: () => void
}) {
  const handleClick = () => {
    console.error(error.message);
    reset();
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
      Some error occurred

      <Button variant='warning' onClick={handleClick}>
        Try Again
      </Button>
    </div>
  );
}
