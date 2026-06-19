import { VStack, HStack, Box, Heading, BodyShort, Button, Page, Search, Dialog, BodyLong } from '@navikt/ds-react'
import { PencilIcon, TrashIcon, PlusIcon } from '@navikt/aksel-icons'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'

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

  console.log(news)

  return (
    <Page>
      <Page.Block as="main" width="xl" gutters>
        <Box margin={'space-20'}>
          <HStack justify="space-between" align="center" style={{ marginBottom: '48px' }}>
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
          <Search label="Søk etter nyheter" variant="secondary" hideLabel={false} />
          <VStack gap="space-0 space-6">
            {news?.map((news, index) => (
              <Box key={index} padding="space-6" margin={'space-12'} borderRadius={'8'} background={'accent-soft'}>
                <HStack justify="space-between" align="start" gap="space-0 space-4">
                  <VStack gap="space-0 space-6">
                    <Heading size="small" level="2">
                      {news.title}
                    </Heading>
                    <Heading size="small" level="3">
                      {news.description}
                    </Heading>
                    <BodyShort textColor="subtle">{news.body}</BodyShort>
                  </VStack>
                  <HStack gap="space-0 space-2" style={{ flexShrink: 0 }}>
                    <Button
                      variant={'primary'}
                      size="small"
                      icon={<PencilIcon aria-hidden />}
                      onClick={() => navigate(`/news/${news.id}/edit`)}
                    >
                      Rediger
                    </Button>
                    <Dialog>
                      <Dialog.Trigger>
                        <Button data-color={'danger'} size={'small'} icon={<TrashIcon aria-hidden />}>
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
              </Box>
            ))}
          </VStack>
        </Box>
      </Page.Block>
    </Page>
  )
}
