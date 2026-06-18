import {VStack, HStack, Box, Heading, BodyShort, Button, Page, Search} from "@navikt/ds-react";
import { PencilIcon, TrashIcon, PlusIcon } from "@navikt/aksel-icons";
import { useNavigate } from "react-router-dom";

type NewsDTO = {
  id: string
  title: string
  body: string
}

export const Startside = () => {
  const navigate = useNavigate();

  const mockNewsList: NewsDTO[] = [
    { id: "1", title: "nyhet1", body: "Dette er en stor nyhet" },
    { id: "2", title: "nyhet2", body: "Dette er en større nyhet" },
    { id: "3", title: "nyhet3", body: "Dette er en jævelig viktig nyhet" },
  ]

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
          <VStack gap="6">
            {mockNewsList.map((news) => (
              <Box
                key={news.id}
                padding="6"
                margin={"space-12"}
                borderRadius={"8"}
                background={"accent-soft"}
                shadow="xsmall"
              >
                <HStack justify="space-between" align="start" gap="4">
                  <VStack gap="1">
                    <Heading size="small" level="2">{news.title}</Heading>
                    <BodyShort textColor="subtle">{news.body}</BodyShort>
                  </VStack>
                  <HStack gap="2" style={{ flexShrink: 0 }}>
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
