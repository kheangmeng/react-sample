import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from 'react-redux';
import { store } from './store.ts';
// import './index.css'
import GuestLayout from './layouts/GuestLayout.tsx'
import Dashboard from './layouts/DashboardLayout.tsx'
import About from './pages/AboutPage.tsx'
import Login from './pages/LoginPage.tsx'
import App from './App.tsx'
import ListProductPage from './pages/products/ListProductPage.tsx';
import CreateProductPage from './pages/products/CreateProductPage.tsx';
import EditProductPage from './pages/products/EditProductPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <Routes>
          {/* <Route path="/*" element={<GuestLayout />} /> */}
          <Route index element={<App />} />
          <Route path="about" element={<About />} />

          <Route path='/' element={<GuestLayout />}>
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="dashboard" element={<Dashboard />}>
            <Route path="products">
              <Route index element={<ListProductPage />} />
              <Route path="create" element={<CreateProductPage />} />
              <Route path="edit/:id" element={<EditProductPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
