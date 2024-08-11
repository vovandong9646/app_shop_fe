import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import * as React from 'react'
import VerticalLayout from 'src/views/layouts/VerticalLayout'

type IUserLayout = {
  children: React.ReactNode
}

export default function UserLayoutNoApp({ children }: IUserLayout) {
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <VerticalLayout isMenuIcon={false} />
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container
          sx={{
            m: 4,
            backgroundColor: theme.palette.background.paper,
            width: 'calc(100vw - 32px)',
            maxWidth: 'unset !important',
            borderRadius: '15px',
            maxHeight: `100vh - ${theme.mixins.toolbar.minHeight} - 32px`
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}
