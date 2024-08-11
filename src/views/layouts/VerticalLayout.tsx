import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Button } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ROUTER_CONFIG } from 'src/configs/routers'
import { useAuth } from 'src/hooks/useAuth'
import ToggleTheme from 'src/views/layouts/components/toggle-theme/ToggleTheme'
import TranslateDropdown from 'src/views/layouts/components/translate-dropdown/TranslateDropdown'
import UserDropdown from 'src/views/layouts/components/user-dropdown/UserDropdown'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
  toggleDrawer?: () => {}
  isMenuIcon?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

type VerticalLayoutProps = {
  open?: boolean
  toggleDrawer?: () => void
  isMenuIcon?: boolean
}

export default function VerticalLayout({ open, toggleDrawer, isMenuIcon }: VerticalLayoutProps) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()
  return (
    <AppBar position='absolute' open={open}>
      <Toolbar
        sx={{
          pr: '48px' // keep right padding when drawer closed
        }}
      >
        {isMenuIcon && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          {'DashBoard'}
        </Typography>

        <IconButton color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <TranslateDropdown />
        <ToggleTheme />
        {user ? (
          <UserDropdown />
        ) : (
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 3, mb: 2 }}
            onClick={() => router.push(ROUTER_CONFIG.LOGIN)}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
