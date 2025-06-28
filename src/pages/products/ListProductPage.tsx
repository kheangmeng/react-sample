import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { fetchProducts } from '../../features/productSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ListProductPage() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  dispatch(fetchProducts({page: 1, limit: 10}))

  return <div>
    <h1>List Products Page</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sellable</TableCell>
            <TableCell align="right" width={"300"}>SKU</TableCell>
            <TableCell align="right">Stock Quantity</TableCell>
            <TableCell align="right">Low Stock Threshold</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          products.length ? products.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.basePrice}</TableCell>
              <TableCell align="right">{row.isSellable}</TableCell>
              <TableCell align="right">{row.sku}</TableCell>
              <TableCell align="right">{row.stockQuantity}</TableCell>
              <TableCell align="right">{row.lowStockThreshold}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">{row.updatedAt}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )) :
          <div style={{ padding: '12px' }}>Loading...</div>
        }
        </TableBody>
      </Table>
    </TableContainer>
  </div>
}
