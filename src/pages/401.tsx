import Typography from '@mui/material/Typography'
import BlankLayout from 'src/views/layouts/BlankLayout'

const Error401 = () => {
  return (
    <Typography variant='h2' sx={{ mb: 1.5 }}>
      You are not authorized!
    </Typography>
  )
}

Error401.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>
Error401.guestGuard = false
Error401.authGuard = false
export default Error401
