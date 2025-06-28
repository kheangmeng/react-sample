import { useState } from "react";
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { createProduct } from '../../features/productSlice';
import { fetchCategories } from '../../features/categorySlice';
import { TextField } from "@mui/material"
import Button from "@mui/material/Button";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CategoryForm from "./CategoryForm";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface FileUploadProps {
  onUpload: (url: string) => void;
}
function InputFileUpload({ onUpload }: FileUploadProps) {
  const [objUrl, setObjUrl] = useState<string>('')

  async function handleFileUpload(files: FileList | null): Promise<void> {
    if(!files) return onUpload('')
    const file = files[0]
    const url = URL.createObjectURL(file as File)
    setObjUrl(url)
    onUpload(url)
  }

  return (
    <div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload Image
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => handleFileUpload(event.target.files)}
          multiple
        />
      </Button>

      { objUrl && <img
        src={objUrl}
        alt='image load'
        loading="lazy"
      /> }
    </div>
  );
}


export default function ProductForm() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { isLoading, error, statusMessage } = useSelector((state: RootState) => state.product);
  const { isLoading: categoryLoading, categories } = useSelector((state: RootState) => state.category);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [lowStockThreshold, setLowStockThreshold] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isSellable, setIsSellable] = useState(false);
  const [taxExempt, setTaxExempt] = useState(false);
  const [imageUrl, setImageUrl] = useState('')

  const [openDialog, setOpenDialog] = useState(false)

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [tempTag, setTempTag] = useState('')
  const [tagSelects, setTagSelects] = useState([
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Books',
    'Toys & Games',
    'Sports & Outdoors',
  ])
  const handleAddTag = () => {
    if(!tempTag) return

    setTagSelects([
      ...tagSelects,
      tempTag
    ])
  }

  function handleFetchCategory(): void {
    console.log('fff')
    if (categories.length) return
    dispatch(fetchCategories({page: 1, limit: 10}))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createProduct({
      name,
      description,
      categoryId: Number(categoryId),
      brand,
      sku,
      basePrice,
      tags,
      stockQuantity,
      lowStockThreshold,
      isActive,
      isSellable,
      taxExempt,
      imageUrl
    }))
  };

  return <Card >
    <CardContent>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Product Name" variant="outlined"
              value={name} onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoryId}
                  label="Category"
                  onOpen={() => handleFetchCategory() }
                  onChange={
                    (event: SelectChangeEvent) => setCategoryId(event.target.value)
                  }
                >
                  {
                    categoryLoading ?
                      <MenuItem>Loading...</MenuItem> :
                      categories.map((c) => <MenuItem value={c.id}>
                        <div>{c.name}</div>
                        </MenuItem>)
                  }
                </Select>
              </FormControl>
            <IconButton aria-label="add" onClick={() => setOpenDialog(true)}>
              <AddIcon />
            </IconButton>
            </Stack>
          </Grid>
          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Brand" variant="outlined"
              value={brand} onChange={(e) => setBrand(e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="SKU" variant="outlined"
              value={sku} onChange={(e) => setSku(e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Base Price" variant="outlined"
              value={basePrice} onChange={(e) => setBasePrice(Number(e.target.value) || 0)}
            />
          </Grid>
          <Grid size={6}>
            <Autocomplete
              value={tags}
              onChange={(ele, value) => setTags(value)}
              multiple
              id="checkboxes-tags-demo"
              options={tagSelects}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                );
              }}
              onInputChange={
                (event, newInputValue) => {
                  setTempTag(newInputValue)
                }
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleAddTag()
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Tags" />
              )}
            />
          </Grid>
          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Stock Quantity" variant="outlined"
              value={stockQuantity} onChange={(e) => setStockQuantity(Number(e.target.value) || 0)}
            />
          </Grid>
          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Low Stock Threshold" variant="outlined"
              value={lowStockThreshold} onChange={(e) => setLowStockThreshold(Number(e.target.value) || 0)}
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
                  <Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked) } />
                }
                label={ isActive ? "Active" : "Inactive" }
              />
            </FormGroup>
          </Grid>
          <Grid size={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={isSellable} onChange={(e) => setIsSellable(e.target.checked) } />
                }
                label={ isSellable ? "Sellable" : "Not Sellable" }
              />
            </FormGroup>
          </Grid>
          <Grid size={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={taxExempt} onChange={(e) => setTaxExempt(e.target.checked) } />
                }
                label={ `Tax exempt:  ${taxExempt ? "Yes" : "No"}` }
              />
            </FormGroup>
          </Grid>
          <Grid size={12}>
            <InputFileUpload onUpload={(url) => setImageUrl(url)} />
          </Grid>
          <Grid container size={12}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ color: 'red' }}>{error}</p>
            {statusMessage && <p style={{ color: 'red' }}>{statusMessage}</p>}
          <Button variant="contained" type="submit" loading={isLoading}>Submit</Button>
        </Grid>
      </Grid>
    </form>
  </CardContent>

  <Dialog
    open={openDialog}
    onClose={() => setOpenDialog(false)}
  >
    <DialogTitle>Create Category</DialogTitle>
    <DialogContent>
      <CategoryForm onSubmitCategory={ () => setOpenDialog(false)} />
    </DialogContent>
  </Dialog>
  </Card>
}
