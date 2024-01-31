
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function VendorModal(props:any) {
  return (
    <div>
    <Modal
      open={props.op}
      onClose={props.cl}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.message}
        </Typography>
        <div>
        <Button variant="outlined" onClick={props.cl} className='vendor-modal-btn'>ok</Button>
        </div>
      </Box>
    </Modal>
  </div>
  )
}

export default VendorModal
