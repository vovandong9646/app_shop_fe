// ** React Imports

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { NextPage } from 'next'
import React from 'react'
import BlankLayout from 'src/views/layouts/BlankLayout'

type TProps = {}
const Error404: NextPage<TProps> = () => {
  return (
    <Box className='content-center'>
      <Typography variant='h2' sx={{ mb: 1.5 }}>
        Page Not Found
      </Typography>
    </Box>
  )
}

Error404.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>
Error404.guestGuard = false
Error404.authGuard = false
export default Error404
