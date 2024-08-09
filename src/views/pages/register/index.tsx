'use client'
import * as React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Button, Grid, IconButton, InputAdornment } from '@mui/material'
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
import RegisterLight from '/public/images/register-light.png'
import RegisterDark from '/public/images/register-dark.png'
import { useTheme } from '@mui/material/styles'

type TProps = {}

type TDefaultValues = {
  email: string
  password: string
  confirmPassword: string
}

const schema = yup.object().shape({
  email: yup.string().required().matches(EMAIL_REG, 'Email is not valid'),
  password: yup
    .string()
    .required()
    .matches(PASSWORD_REG, 'Password is must contain at least 1 uppercase, 1 lowercase, 1 number and 1 symbol'),
  confirmPassword: yup
    .string()
    .required()
    .matches(PASSWORD_REG, 'Password is must contain at least 1 uppercase, 1 lowercase, 1 number and 1 symbol')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

const RegisterPage: NextPage<TProps> = () => {
  // state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setConfirmPassword] = useState(false)
  const theme = useTheme()

  const defaultValues: TDefaultValues = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  // validate
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: { email: string; password: string }) => console.log(data)

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
          src={theme.palette.mode === 'light' ? RegisterLight : RegisterDark}
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
            Register
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

              <Box sx={{ mt: 5, mb: 5 }}>
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

              <Box sx={{ mb: 2 }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      label={'Confirm Password *'}
                      variant={'outlined'}
                      fullWidth
                      placeholder='Input Your Confirm Password ...'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      error={Boolean(errors?.confirmPassword)}
                      helperText={errors?.confirmPassword?.message}
                      type={showConfirmPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position={'end'}>
                            <IconButton edge={'end'} onClick={() => setConfirmPassword(!showConfirmPassword)}>
                              {showConfirmPassword ? (
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
                  name='confirmPassword'
                />
              </Box>

              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='/login' variant='body2'>
                    Do you have an account?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default RegisterPage
