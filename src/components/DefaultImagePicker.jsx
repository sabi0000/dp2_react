import { Dialog, DialogTitle, Grid,} from '@mui/material';

function DefaultImagePicker({ open, handleClose, handleSelect }) {
  const images = [
    '/default-images/sample1.jpg',
    '/default-images/sample2.png',
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Vyberte predvolený obrázok</DialogTitle>
      <Grid container spacing={2} padding={2}>
        {images.map((imgPath, index) => (
          <Grid item xs={4} key={index}>
            <img
              src={imgPath}
              alt={`sample${index}`}
              style={{ width: '100%', cursor: 'pointer' }}
              onClick={() => handleSelect(imgPath)}
            />
          </Grid>
        ))}
      </Grid>
    </Dialog>
  );
}
export default DefaultImagePicker;
