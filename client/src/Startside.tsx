import {VStack, HStack, Box, Heading, Button, Page, Search, Dialog, BodyLong, LinkCard} from '@navikt/ds-react'
import { PencilIcon, TrashIcon, PlusIcon } from '@navikt/aksel-icons'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { useState } from 'react'

type NewsDTO = {
  id: string
  title: string
  description: string
  body: string
}

export const Startside = () => {
  async function getNews(): Promise<NewsDTO[]> {
    const res = await fetch('/news', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return res.json()
  }

  async function deleteNews(id: string): Promise<void> {
    const response = await fetch(`/admin/news/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`Sletting feilet: ${response.status}`)
    }
    await mutate()
  }

  const navigate = useNavigate()
  const { data: news, mutate } = useSWR<NewsDTO[]>('news', () => getNews())

  const [searchQuery, setSearchQuery] = useState('')

  const filteredNews =
    news?.filter((item) => {
      const query = searchQuery.toLowerCase()
      const matchesTitle = item.title?.toLowerCase().includes(query)
      const matchesDescription = item.description?.toLowerCase().includes(query)
      return matchesTitle || matchesDescription
    }) || []

  return (
    <Page>
      <Page.Block as="main" width="xl" gutters>
        <VStack gap="space-8" margin="space-20">
          <HStack justify="space-between" align="center">
            <Heading size="large" level="1">
              Nyheter
            </Heading>
            <Button
              variant="primary"
              icon={<PlusIcon aria-hidden />}
              iconPosition="left"
              onClick={() => navigate('/createNewsPage')}
            >
              Opprett nyhet
            </Button>
          </HStack>
          <Search
            label="Søk etter nyheter"
            variant="secondary"
            hideLabel={false}
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            onClear={() => setSearchQuery('')}
          />
          <VStack gap="space-12">
              {filteredNews.map((news) => (
                  // {news?.map((news, index) => (
              <LinkCard key={news.id} onClick={() => navigate(`/news/${news.id}/edit`)} >
                <HStack justify="space-between" align="start" gap="space-8" wrap={false}>
                  <VStack gap="space-2" style={{ flex: 1, minWidth: 0 }}>
                    <Heading size="small" level="2">
                      {news.title}
                    </Heading>
                    <BodyLong>{news.description}</BodyLong>
                  </VStack>
                  <HStack gap="space-2">
                    <Dialog>
                      <Dialog.Trigger>
                        <Button data-color="danger" size="small" icon={<TrashIcon aria-hidden />}>
                          Slett
                        </Button>
                      </Dialog.Trigger>
                      <Dialog.Popup role="alertdialog" closeOnOutsideClick={false}>
                        <Dialog.Header withClosebutton={false}>
                          <Dialog.Title>Er du sikker?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <BodyLong>
                            Du er i ferd med å slette denne nyheten. Denne handlingen kan ikke angres.
                          </BodyLong>
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.CloseTrigger>
                            <Button variant="secondary" data-color="neutral">
                              Avbryt
                            </Button>
                          </Dialog.CloseTrigger>
                          <Dialog.CloseTrigger>
                            <Button variant="danger" onClick={() => deleteNews(news.id)}>
                              Ja, slett
                            </Button>
                          </Dialog.CloseTrigger>
                        </Dialog.Footer>
                      </Dialog.Popup>
                    </Dialog>
                  </HStack>
                </HStack>
              </LinkCard>
            ))}
            {news && filteredNews.length === 0 && <BodyLong>Ingen nyheter matchet søket ditt.</BodyLong>}
          </VStack>
        </VStack>
      </Page.Block>
    </Page>
  )
}
