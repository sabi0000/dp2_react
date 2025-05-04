import { Dialog, DialogTitle, Grid,} from '@mui/material';

function DefaultImagePicker({ open, handleClose, handleSelect }) {
  const images = [
    '/default-images/ISIC_0031197.jpg',
    '/default-images/ISIC_0024698.jpg',
    '/default-images/ISIC_0025964.jpg',
    '/default-images/ISIC_0027008.jpg',
    '/default-images/ISIC_0028155.jpg',
    '/default-images/ISIC_0029417.jpg',
    '/default-images/ISIC_0027419.jpg',
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
