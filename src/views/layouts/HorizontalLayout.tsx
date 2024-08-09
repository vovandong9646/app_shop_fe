import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse } from '@mui/material'
import { horizontalMenu } from 'src/configs/horizontalMenu'
import IconifyIcon from 'src/components/Icon'

const drawerWidth: number = 240

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}))

function RecruiseMenu({ items, level }: { items: any; level: number }) {
  const [openState, setOpenState] = React.useState<{ [key: string]: boolean }>({})

  const handleClick = (title: string) => {
    setOpenState(prev => {
      return {
        ...prev,
        [title]: !prev[title]
      }
    })
  }

  return (
    <>
      {items?.map((item: any) => (
        <React.Fragment key={item.title}>
          <ListItemButton
            sx={{
              paddingLeft: `${level * 24}px`
            }}
            onClick={() => {
              if (item.children && item.children?.length > 0) {
                handleClick(item.title)
              }
            }}
          >
            <ListItemIcon>
              <IconifyIcon icon={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {item.children && item.children?.length > 0 ? openState[item.title] ? <ExpandLess /> : <ExpandMore /> : ''}
          </ListItemButton>
          {item.children && item.children?.length > 0 && (
            <>
              <Collapse in={openState[item.title]} timeout='auto' unmountOnExit>
                <RecruiseMenu items={item.children} level={level + 1} />
              </Collapse>
            </>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default function HorizontalLayout({ open, toggleDrawer }) {
  return (
    <Drawer variant='permanent' open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        <RecruiseMenu items={horizontalMenu} level={1} />
      </List>
    </Drawer>
  )
}
