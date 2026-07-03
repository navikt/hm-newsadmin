import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Pagination } from '@navikt/ds-react'

type Props = {
  currentPage: number
  totalPages: number
}

export default function NewsPagination({ currentPage, totalPages }: Props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    navigate(`${pathname}?${params.toString()}`)
  }

  return (
    <Pagination
      page={currentPage}
      count={totalPages}
      onPageChange={goToPage}
      srHeading={{ tag: 'h2', text: 'Sidenavigasjon' }}
      prevNextTexts
    />
  )
}
