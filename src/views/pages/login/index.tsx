'use client'
import * as React from 'react'
import { NextPage } from 'next'
import { Button, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CustomTextField from 'src/components/text-field'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import IconifyIcon from 'src/components/Icon'
import { useState } from 'react'
import Image from 'next/image'
import LoginLight from '/public/images/login-light.png'
import LoginDark from '/public/images/login-dark.png'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'

type TProps = {}

const schema = yup
  .object()
  .shape({
    email: yup.string().required().matches(EMAIL_REG, 'Email is not valid'),
    password: yup
      .string()
      .required()
      .matches(PASSWORD_REG, 'Password is must contain at least 1 uppercase, 1 lowercase, 1 number and 1 symbol')
  })
  .required()

const LoginPage: NextPage<TProps> = () => {
  // state
  const [showPassword, setShowPassword] = useState(false)
  const [isRemember, setRemember] = useState(false)

  // context
  const theme = useTheme()
  const auth = useAuth()

  // validate
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: 'admin@gmail.com',
      password: '123456789Kha@'
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: { email: string; password: string }) => {
    if (!Object.keys(errors)?.length) {
      auth.login({ ...data, rememberMe: isRemember })
    }
  }

  return (
    <Box
      sx={{
        width: '100w',
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItem: 'center',
        padding: '40px',
        minWidth: '50vw'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          backgroundColor: theme.palette.customColors.bodyBg
        }}
      >
        <Image
          src={theme.palette.mode === 'dark' ? LoginDark : LoginLight}
          alt={'Login image'}
          style={{
            height: 'auto',
            width: 'auto',
            objectFit: 'cover'
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '50%'
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box sx={{ mt: 1, width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='false'>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    label={'Email *'}
                    variant={'outlined'}
                    fullWidth
                    placeholder='Input Your Email ...'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                  />
                )}
                name='email'
              />

              <Box sx={{ mt: 5, mb: 2 }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      label={'Password *'}
                      variant={'outlined'}
                      fullWidth
                      placeholder='Input Your Password ...'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      error={Boolean(errors?.password)}
                      helperText={errors?.password?.message}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position={'end'}>
                            <IconButton edge={'end'} onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? (
                                <IconifyIcon icon={'material-symbols:visibility-outline'} />
                              ) : (
                                <IconifyIcon icon={'mdi:visibility-off-outline'} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='password'
                />
              </Box>

              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
                value={isRemember}
                onChange={e => {
                  setRemember(e.target.checked)
                }}
              />
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/register' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <IconButton sx={{ color: '#497ce2' }} onClick={() => {}}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      role='img'
                      fontSize='1.375rem'
                      className='iconify iconify--mdi'
                      width='1em'
                      height='1em'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z'
                      ></path>
                    </svg>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton sx={{ color: theme.palette.error.main }} onClick={() => {}}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      role='img'
                      fontSize='1.375rem'
                      className='iconify iconify--mdi'
                      width='1em'
                      height='1em'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z'
                      ></path>
                    </svg>
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
