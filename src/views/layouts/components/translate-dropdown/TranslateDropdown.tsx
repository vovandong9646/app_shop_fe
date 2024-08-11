import * as React from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import IconifyIcon from 'src/components/Icon'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'

// interface ITranslateProps extends BoxProps {
//   selected: boolean
// }

// const CustomChangeTheme = styled(Box)<ITranslateProps>(data => {
//   const { selected, theme, children } = data
//   if (selected) {
//     return {
//       '&.MuiButtonBase-root .MuiMenuItem-root': {
//         background: 'red',
//         width: '100%'
//       }
//     }
//   }
// })

export default function TranslateDropdown() {
  // hook i18n
  const { i18n } = useTranslation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang)
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={'Change language'}>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <IconifyIcon icon={'clarity:language-line'} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleChangeLang('vi')} selected={i18n.language === 'vi'}>
          Tiếng Việt
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleChangeLang('en')} selected={i18n.language === 'en'}>
          English
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
