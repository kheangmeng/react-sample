import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { createCategory } from '../../features/categorySlice';
import { TextField } from "@mui/material"
import Button from "@mui/material/Button";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface CategoryFormProps {
  onSubmitCategory: () => void;
}

export default function CategoryForm({ onSubmitCategory }: CategoryFormProps) {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.category);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory({ name, description, isActive }))
    onSubmitCategory()
  };

  return <Card sx={{ maxWidth: 500 }}>
    <CardContent>
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField fullWidth id="outlined-basic" label="Category Name" variant="outlined"
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <TextField multiline minRows={3} fullWidth id="outlined-basic" label="Description" variant="outlined"
            value={description} onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked) } name="gilad" />
              }
              label={ isActive ? "Active" : "Inactive" }
            />
          </FormGroup>
        </Grid>
        <Grid container size={12}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <p style={{ color: 'red' }}>{error}</p> */}
          {/* {statusMessage && <p style={{ color: 'red' }}>{statusMessage}</p>} */}
        <Button variant="contained" type="submit" loading={isLoading}>Submit</Button>
      </Grid>
    </Grid>
  </form>
  </CardContent>
  </Card>
}
