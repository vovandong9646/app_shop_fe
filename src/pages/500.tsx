import Typography from '@mui/material/Typography'
import BlankLayout from 'src/views/layouts/BlankLayout'

const Error500 = () => {
  return (
    <Typography variant='h2' sx={{ mb: 1.5 }}>
      Oops, something went wrong!
    </Typography>
  )
}

Error500.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>
Error500.guestGuard = false
Error500.authGuard = false
export default Error500
