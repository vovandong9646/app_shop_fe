import React, { ReactNode } from 'react'
import RegisterPage from 'src/views/pages/register'
import BlankLayout from 'src/views/layouts/BlankLayout'
import { NextPage } from 'next'

type TProps = {}
const Register: NextPage<TProps> = () => {
  return <RegisterPage />
}

export default Register

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true
