'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Box, Button, Card, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import IconifyIcon from 'src/components/Icon'
import CustomTextField from 'src/components/text-field'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import { EMAIL_REG } from 'src/configs/regex'
import { getAuthMe } from 'src/services/auth'
import { AppDispatch } from 'src/stores'
import { resetState } from 'src/stores/apps/auth'
import { updateMeAsync } from 'src/stores/apps/auth/action'
import { getBase64, splitFullName, toFullName } from 'src/utils/common'
import * as yup from 'yup'
import { RootState } from '../../../stores/index'

const schema = yup.object().shape({
  email: yup.string().required().matches(EMAIL_REG, 'Email is not valid'),
  role: yup.string().required(),
  fullName: yup.string().required(),
  address: yup.string().notRequired(),
  city: yup.string().notRequired(),
  phone: yup
    .string()
    .notRequired()
    .min(10, 'Phone number min length is 10')
    .max(10, 'Phone number max length is 10')
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Phone number is not valid'),
  avatar: yup.string().notRequired()
})

type TDefaultValues = {
  email: string
  role: string
  fullName: string
  address?: string | null
  city?: string | null
  phone?: string | null
  avatar?: string | null
}

const defaultValues: TDefaultValues = {
  email: '',
  role: '',
  fullName: '',
  address: '',
  city: '',
  phone: '',
  avatar: ''
}

type TProps = {}

const MyProfilePage: NextPage<TProps> = () => {
  // state
  const theme = useTheme()
  const [avatar, setAvatar] = useState('')
  const [roleId, setRoleId] = useState('')
  const dispatch: AppDispatch = useDispatch()
  const { message, isLoading, isSuccess, isError } = useSelector((state: RootState) => state.auth)

  // translate
  const { i18n } = useTranslation()

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
  const onSubmit = (data: TDefaultValues) => {
    const { email, fullName, address, city, phone } = data
    const { firstName, middleName, lastName } = splitFullName(fullName, i18n.language)
    dispatch(
      updateMeAsync({
        email,
        role: roleId,
        firstName,
        middleName,
        lastName,
        address,
        phoneNumber: phone,
        avatar
      })
    )
  }

  const handleUploadAvatar = async (file: File) => {
    const base64Avatar = await getBase64(file)
    setAvatar(base64Avatar)
  }

  async function fetchData() {
    try {
      const res = await getAuthMe()
      if (!res.typeError) {
        const user = res.data
        setRoleId(user.role?._id)
        setAvatar(user.avatar)
        reset({
          email: user.email,
          role: user.role?.name,
          fullName: toFullName(user.firstName, user.middleName, user.lastName, i18n.language),
          address: user.address,
          city: user.city,
          phone: user.phoneNumber
        })
      }
    } catch (err) {
      // setLoading(false)
      console.log(err)
    }
  }

  // fetch data
  useEffect(() => {
    fetchData()
  }, [])

  // display message error or success
  useEffect(() => {
    if (message) {
      if (isError) {
        toast.error(message)
      } else if (isSuccess) {
        toast.success(message)
        fetchData()
      }
      dispatch(resetState())
    }
  }, [isSuccess, isError, message])

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
                {avatar ? (
                  <Box sx={{ position: 'relative' }}>
                    <Avatar sx={{ width: 100, height: 100 }} src={avatar} />
                    <Box
                      onClick={() => setAvatar('')}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        cursor: 'pointer',
                        '&:hover': { color: 'rgba(212, 51, 51, 0.7)' }
                      }}
                    >
                      <IconifyIcon icon={'oi:delete'} />
                    </Box>
                  </Box>
                ) : (
                  <Avatar sx={{ width: 100, height: 100 }}>
                    {avatar ? avatar : <IconifyIcon icon={'ph:user-thin'} fontSize={50} />}
                  </Avatar>
                )}
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
                    disabled={true}
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
                    onChange={e => {
                      const replaceNumber = e.target.value.replace(/\D/g, '')
                      onChange(replaceNumber)
                    }}
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
