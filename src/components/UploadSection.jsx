import { Grid, Button } from '@mui/material';
import DefaultImagePicker from './DefaultImagePicker';

function UploadSection({ handleFileChange, openPicker, setOpenPicker, handleDefaultImageSelect }) {
  return (
    <div style={{ marginTop: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <label htmlFor="upload-file" style={{ width: '100%' }}>
            <input
              id="upload-file"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button variant="contained" component="span" color="primary" fullWidth>
              Nahrať vlastný obrázok
            </Button>
          </label>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={() => setOpenPicker(true)} fullWidth>
            Vybrať predvolený obrázok
          </Button>
        </Grid>
      </Grid>

      <DefaultImagePicker 
        open={openPicker} 
        handleClose={() => setOpenPicker(false)} 
        handleSelect={handleDefaultImageSelect} 
      />
    </div>
  );
}

export default UploadSection;
