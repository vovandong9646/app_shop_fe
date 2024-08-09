import React from 'react'
import { NextPage } from 'next'
import Box from '@mui/material/Box'

type TProps = {
  children: React.ReactNode
}

const BlankLayout: NextPage<TProps> = ({ children }) => {
  return <Box>{children}</Box>
}

export default BlankLayout
