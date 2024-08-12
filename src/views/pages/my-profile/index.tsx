'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Box, Button, Card, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { NextPage } from 'next'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import IconifyIcon from 'src/components/Icon'
import CustomTextField from 'src/components/text-field'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import { EMAIL_REG } from 'src/configs/regex'
import { useAuth } from 'src/hooks/useAuth'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().required().matches(EMAIL_REG, 'Email is not valid'),
  role: yup.string().required(),
  fullName: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  phone: yup.string().required(),
  avatar: yup.string().required()
})

type TDefaultValues = {
  email: string
  role: string
  fullName: string
  address: string
  city: string
  phone: string
  avatar: string
}

type TProps = {}

const MyProfilePage: NextPage<TProps> = () => {
  // state
  const theme = useTheme()
  const { user } = useAuth()

  const defaultValues: TDefaultValues = {
    email: '',
    role: '',
    fullName: '',
    address: '',
    city: '',
    phone: '',
    avatar: ''
  }

  const handleUploadAvatar = (file: File) => {
    console.log(file)
  }

  // validate
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: TDefaultValues) => console.log(data)

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        role: user.role?.name,
        fullName: user.fullName,
        address: user.address,
        city: user.city,
        phone: user.phone,
        avatar: user.avatar || ''
      })
    }
  }, [user])

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='false'>
      <Card sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', p: 2 }}>
        <Grid container spacing={4}>
          <Grid container item md={6} xs={12} spacing={4}>
            {/* start line 1 */}
            <Grid container item md={12} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }}>
                  {user && user?.avatar ? user.avatar : <IconifyIcon icon={'ph:user-thin'} fontSize={50} />}
                </Avatar>
                <WrapperFileUpload
                  uploadFunc={handleUploadAvatar}
                  objectAcceptFile={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                >
                  <Button variant='outlined' sx={{ width: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
                    <IconifyIcon icon='ph:camera-thin'></IconifyIcon>
                    Upload avatar
                  </Button>
                </WrapperFileUpload>
              </Box>
            </Grid>
            <Grid container item md={6} xs={12}>
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
            </Grid>
            <Grid container item md={6} xs={12}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    disabled={true}
                    label={'Role *'}
                    variant={'outlined'}
                    fullWidth
                    placeholder='Input Your Role ...'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={Boolean(errors?.role)}
                    helperText={errors?.role?.message}
                  />
                )}
                name='role'
              />
            </Grid>
            {/* end line 1 */}
          </Grid>

          <Grid container item md={6} xs={12} spacing={4}>
            {/* line 2 */}
            <Grid container item md={6} xs={12}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    label={'FullName *'}
                    variant={'outlined'}
                    fullWidth
                    placeholder='Input Your FullName ...'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={Boolean(errors?.fullName)}
                    helperText={errors?.fullName?.message}
                  />
                )}
                name='fullName'
              />
            </Grid>
            <Grid container item md={6} xs={12}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    label={'Address *'}
                    variant={'outlined'}
                    fullWidth
                    placeholder='Input Your Address ...'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={Boolean(errors?.address)}
                    helperText={errors?.address?.message}
                  />
                )}
                name='address'
              />
            </Grid>
            <Grid container item md={6} xs={12}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    label={'City *'}
                    variant={'outlined'}
                    fullWidth
                    placeholder='Input Your City ...'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={Boolean(errors?.city)}
                    helperText={errors?.city?.message}
                  />
                )}
                name='city'
              />
            </Grid>
            <Grid container item md={6} xs={12}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    label={'Phone *'}
                    variant={'outlined'}
                    fullWidth
                    placeholder='Input Your Phone ...'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={Boolean(errors?.phone)}
                    helperText={errors?.phone?.message}
                  />
                )}
                name='phone'
              />
            </Grid>
            {/* end line 2 */}
          </Grid>
        </Grid>
      </Card>

      <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
        Update
      </Button>
    </form>
  )
}

export default MyProfilePage
