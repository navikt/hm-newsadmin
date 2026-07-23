import { useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Toast } from 'komponenter/Toast.tsx'
import { NewsFormValues } from 'komponenter/useNewsForm.ts'
import { NewsAdmin } from 'pages/NewsAdmin.tsx'
import useSWR, { useSWRConfig } from 'swr'
import { deleteNews } from 'utils/api-util.ts'
import { uploadImageFile } from 'utils/image-util.ts'

import { CheckmarkIcon } from '@navikt/aksel-icons'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export const EditNewsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const backUrl = searchParams.size ? `/?${searchParams.toString()}` : '/'
  const { mutate } = useSWRConfig()
  const { data: news } = useSWR(`/admin/news/${id}`, () => fetch(`${base}/admin/news/${id}`).then((res) => res.json()))
  const selectedImageFile = useRef<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  async function editNews(data: NewsFormValues) {
    setLoading(true)
    try {
      const uri = await uploadImageFile(id!, selectedImageFile.current)
      if (uri) data = { ...data, imageUrl: uri }
      const res = await fetch(`${base}/admin/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
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
    navigate(backUrl)
  }

  return (
    <>
      <NewsAdmin
        loading={loading}
        onSubmit={editNews}
        onDelete={handleDelete}
        defaultValues={news}
        newsId={id}
        onFileSelect={(file) => (selectedImageFile.current = file)}
        returnTo={backUrl}
      />
      <Toast message={toastMessage} icon={<CheckmarkIcon aria-hidden />} />
    </>
  )
}
