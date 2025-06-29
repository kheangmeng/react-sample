import { useState, useEffect } from "react";
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { loginUser, clearAuthMessages } from '../../features/authSlice';
import { TextField } from "@mui/material"
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function LoginForm() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading, error, statusMessage } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    return () => { dispatch(clearAuthMessages()); };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
    console.log("Form submitted", email, password);
  };

  return <Card sx={{ maxWidth: 500 }}>
    <CardContent>
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField fullWidth label="Email" variant="outlined"
            value={email} onChange={(e) => setEmail(e.target.value)}
            error={!email}
            helperText={!email && 'Email is required'}
          />
        </Grid>
        <Grid size={12}>
          <TextField fullWidth label="Password" variant="outlined" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            error={!password || password.length < 8}
            helperText={
              !password
                ? 'Password is required'
                : password.length < 8
                  ? 'Password minimum 8 characters'
                  : ''
            }
          />
        </Grid>
        <Grid container size={12}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ color: 'red' }}>{error}</p>
          {statusMessage && <p style={{ color: 'red' }}>{statusMessage}</p>}
        <Button variant="contained" type="submit" loading={isLoading}>Login</Button>
      </Grid>
    </Grid>
  </form>
  </CardContent>
  </Card>
}
