import {VStack, ActionMenu, Button, LinkCard, Box, Tag} from "@navikt/ds-react";
import {BandageIcon, ChevronDownIcon} from "@navikt/aksel-icons";
import {useNavigate} from "react-router-dom";

export const Startside = () => {
   async function getNews(): Promise<NewsDTO[]> {
    const res = await fetch("http://localhost:8084/news" , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return res.json()
  }

  type NewsDTO = {
    id: string
    title: string
    body: string
  }

  const navigate = useNavigate();

  const handleCreate = () => {
      navigate('/createNewsPage')
  }

  console.log(getNews())

  return (

  <VStack>
      <ActionMenu>
          <ActionMenu.Trigger>
              <Button
                  data-color="neutral"
                  variant="secondary"
                  icon={<ChevronDownIcon aria-hidden />}
                  iconPosition="right"
              >
                  Meny
              </Button>
          </ActionMenu.Trigger>
          <ActionMenu.Content>
              <ActionMenu.Group label="News Actions">
                  <ActionMenu.Item onSelect={console.info}>View all news</ActionMenu.Item>
                  <ActionMenu.Item onSelect={handleCreate}>Create news</ActionMenu.Item>
                  <ActionMenu.Item onSelect={console.info}>Update news</ActionMenu.Item>
                  <ActionMenu.Item onSelect={console.info}>Delete news</ActionMenu.Item>
              </ActionMenu.Group>
          </ActionMenu.Content>
          <LinkCard>
              <Box
                  asChild
                  borderRadius="12"
                  padding="space-8"
                  style={{ backgroundColor: "var(--ax-bg-moderateA)" }}
              >
                  <LinkCard.Icon>
                      <BandageIcon fontSize="2rem" />
                  </LinkCard.Icon>
              </Box>
              <LinkCard.Title>
                  <LinkCard.Anchor href="/eksempel">Sykepenger</LinkCard.Anchor>
              </LinkCard.Title>
              <LinkCard.Description>
                  Erstatter inntekten din når du ikke kan jobbe på grunn av sykdom eller
                  skade.
              </LinkCard.Description>
              <LinkCard.Footer>
                  <Tag size="small">Pengestøtte</Tag>
              </LinkCard.Footer>
          </LinkCard>
      </ActionMenu>

  </VStack>

  )

}
