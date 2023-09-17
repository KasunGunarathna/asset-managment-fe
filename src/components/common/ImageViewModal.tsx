import React from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Container,
  Paper,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface ImageViewModalProps {
  open: boolean;
  onClose: () => void;
  imageURL: string | null;
}

const ImageViewModal: React.FC<ImageViewModalProps> = ({ open, onClose, imageURL }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container component="main" maxWidth="md">
          <Paper
            sx={{
              backgroundColor: 'white',
              padding: '26px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={onClose}
              aria-label="close"
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
            >
              <CloseIcon />
            </IconButton>
            {imageURL && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                  src={imageURL}
                  alt="Enlarged"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                />
              </Box>
            )}
          </Paper>
        </Container>
      </Fade>
    </Modal>
  );
};

export default ImageViewModal;
