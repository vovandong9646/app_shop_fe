import { NextPage } from 'next'
import UserLayoutNoApp from 'src/views/layouts/UserLayoutNoApp'
import MyProfilePage from 'src/views/pages/my-profile'

type TProps = {}
const MyProfile: NextPage<TProps> = () => {
  return <MyProfilePage />
}

export default MyProfile

MyProfile.guestGuard = false
MyProfile.authGuard = true
MyProfile.getLayout = (page: React.ReactNode) => <UserLayoutNoApp>{page}</UserLayoutNoApp>
