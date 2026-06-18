import {VStack, HStack, Box, Heading, BodyShort, Button, Page, Search} from "@navikt/ds-react";
import { PencilIcon, TrashIcon, PlusIcon } from "@navikt/aksel-icons";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

type NewsDTO = {
  id: string
  title: string
  body: string
}

export const Startside = () => {
  async function getNews(): Promise<NewsDTO[]> {
    const res = await fetch("/news" , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

      return res.json()
    }

    const navigate = useNavigate();
  const { data: news} = useSWR<NewsDTO[]>('news', () => getNews())

    console.log(news)

  return (
    <Page>
      <Page.Block as="main" width="xl" gutters>
        <Box margin={"space-20"}>
          <HStack justify="space-between" align="center" style={{ marginBottom: "48px" }}>
            <Heading size="large" level="1">Nyheter</Heading>

            <Button
              variant="primary"
              icon={<PlusIcon aria-hidden />}
              iconPosition="left"
              onClick={() => navigate('/createNewsPage')}
            >
              Opprett nyhet
            </Button>
          </HStack>
            <Search label="Søk etter nyheter" variant="secondary" hideLabel={false}/>
          <VStack gap="space-0 space-6">
            {news?.map((news, index) => (
              <Box
                key={index}
                padding="space-6"
                margin={"space-12"}
                borderRadius={"8"}
                background={"accent-soft"}
              >
                <HStack justify="space-between" align="start" gap="space-0 space-4">
                  <VStack gap='space-0 space-6'>
                    <Heading size="small" level="2">{news.title}</Heading>
                    <BodyShort textColor="subtle">{news.body}</BodyShort>
                  </VStack>
                  <HStack gap="space-0 space-2" style={{ flexShrink: 0 }}>
                    <Button
                      variant={"primary"}
                      size="small"
                      icon={<PencilIcon aria-hidden />}
                      onClick={() => navigate(`/news/${news.id}/edit`)}
                    >
                      Rediger
                    </Button>
                    <Button
                      data-color={"danger"}
                      size="small"
                      icon={<TrashIcon aria-hidden />}
                      onClick={() => console.log('Slett', news.id)}
                    >
                      Slett
                    </Button>
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
