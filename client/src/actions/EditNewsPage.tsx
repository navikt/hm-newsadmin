import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useSWR, { useSWRConfig } from 'swr'
import { deleteNews, uploadNewsMedia } from 'utils/api-util.ts'
import { NewsAdmin } from 'pages/NewsAdmin.tsx'
import { NewsFormValues } from 'komponenter/useNewsForm.ts'
import { useRef, useState } from 'react'
import { Toast } from 'komponenter/Toast.tsx'
import { CheckmarkIcon } from '@navikt/aksel-icons'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export const EditNewsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const returnTo = searchParams.get('returnTo') ?? ''
  const homeUrl = returnTo ? `/?${returnTo}` : '/'
  const { mutate } = useSWRConfig()
  const { data: news } = useSWR(`/admin/news/${id}`, () => fetch(`${base}/admin/news/${id}`).then((res) => res.json()))
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const pendingFile = useRef<File | null>(null)

  async function editNews(data: NewsFormValues) {
    setLoading(true)
    try {
      const res = await fetch(`${base}/admin/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        if (pendingFile.current) {
          await uploadNewsMedia(id!, pendingFile.current)
        }
        await mutate('news')
        await mutate(`/admin/news/${id}`)
        setToastMessage('Lagret')
        setTimeout(() => setToastMessage(null), 3000)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!news) return <div></div>

  async function handleDelete() {
    await deleteNews(id!)
    navigate(homeUrl)
  }

  return (
    <>
      <NewsAdmin
        loading={loading}
        onSubmit={editNews}
        onDelete={handleDelete}
        defaultValues={news}
        newsId={id}
        onFileSelect={(file) => (pendingFile.current = file)}
        returnTo={homeUrl}
      />
      <Toast message={toastMessage} icon={<CheckmarkIcon aria-hidden />} />
    </>
  )
}
