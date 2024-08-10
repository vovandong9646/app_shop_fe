import React from 'react'
import IconifyIcon from 'src/components/Icon'
import { useSettings } from 'src/hooks/useSettings'
import IconButton from '@mui/material/IconButton'

const ToggleTheme = () => {
  const { settings, saveSettings } = useSettings()

  const handleChangeTheme = () => {
    if (settings.mode === 'light') {
      saveSettings({ ...settings, mode: 'dark' })
    } else {
      saveSettings({ ...settings, mode: 'light' })
    }
  }

  return (
    <IconButton color='inherit' onClick={handleChangeTheme}>
      {settings.mode === 'light' ? (
        <IconifyIcon icon={'material-symbols-light:light-mode-outline-rounded'} />
      ) : (
        <IconifyIcon icon={'iconamoon:mode-dark-fill'} />
      )}
    </IconButton>
  )
}

export default ToggleTheme
