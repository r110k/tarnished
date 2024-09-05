import { Navigate, useLocation, useRouteError } from 'react-router-dom'
import { ErrorEmptyData, ErrorUnauthorized } from '../errors'

export const ItemsPageError: React.FC = () => {
  const error = useRouteError()
  const e = error as Error
  // location
  const loc = useLocation()
  const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
  if (e instanceof ErrorUnauthorized) {
    return <Navigate to={`/sign_in?from=${from}`} />
  } else if (e instanceof ErrorEmptyData) {
    return <Navigate replace to="/home" />
  } else {
    return <div>其他错误 </div>
  }
}
