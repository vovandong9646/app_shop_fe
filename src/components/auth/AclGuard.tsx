// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { ACLObj, AppAbility, buildAbilityFor } from 'src/configs/acl'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { AbilityContext } from 'src/components/acl/Can'
import BlankLayout from 'src/views/layouts/BlankLayout'
import NotAuthorized from 'src/pages/401'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props
  const auth = useAuth()
  const router = useRouter()

  let ability: AppAbility
  // check user đăng nhập rồi, nhưng chưa có aclAbilities thì khởi tạo aclAbilities cho nó
  if (auth.user && !ability) {
    const permissionUser = auth.user?.role.permissions ?? []
    ability = buildAbilityFor(permissionUser, aclAbilities.subject)
  }
  // check neu la guest page/ 404/ 501 / not auth page -> redirect ve children (chinh no)
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    // neu user login va ability thi return them context ability de su dung
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      // truong hopj user chua login thi thoi
      return children
    }
  }
  // check neu user login va co quyen vao trang do thi return ve children
  if (auth.user && ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // nguoc lai return ve trang 401
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
