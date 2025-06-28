import * as React from 'react';
import { Outlet } from "react-router";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material/styles';
import DiscountIcon from '@mui/icons-material/Discount';
import PercentIcon from '@mui/icons-material/Percent';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import ArticleIcon from '@mui/icons-material/Article';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  DashboardLayout,
  ThemeSwitcher,
} from '@toolpad/core/DashboardLayout';
import type { Navigation, Router } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'product',
    title: 'Product',
    icon: <MoveToInboxIcon />,
  },
  {
    segment: 'discount',
    title: 'Discount',
    icon: <DiscountIcon />,
  },
  {
    segment: 'promotion',
    title: 'Promotion',
    icon: <PercentIcon />,
  },
  {
    segment: 'category',
    title: 'Category',
    icon: <CategoryIcon />,
  },
  {
    segment: 'supplier',
    title: 'Supplier',
    icon: <LocalShippingIcon />,
  },
  {
    segment: 'report',
    title: 'Report',
    icon: <ArticleIcon />,
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function CustomToolbarActions() {
  return (
    <Stack direction="row" alignItems="center">
      <ThemeSwitcher />
    </Stack>
  );
}

function PageContent() {
  return (
    <Box
      sx={{
        px: 4,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // textAlign: 'center',
      }}
    >
      <Outlet />
    </Box>
  );
}

export default function DashboardLayoutAccountSidebar() {
  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={theme}

      >
        <DashboardLayout
          slots={{
            toolbarActions: CustomToolbarActions,
          }}
        >
          <PageContent />
        </DashboardLayout>
      </AppProvider>
  );
}
