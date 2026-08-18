import { Link } from 'react-router-dom'

import NewsCardFooter from 'komponenter/NewsCardFooter.tsx'
import NewsImage from 'komponenter/NewsImage.tsx'
import { NewsDTO, newsTagMeta } from 'utils/admin-util.tsx'

import { Box, LinkCard } from '@navikt/ds-react'

import './NewsCard.scss'

interface NewsCardProps {
  news: NewsDTO
  searchParams: URLSearchParams
}

export default function NewsCard({ news, searchParams}: NewsCardProps) {
  const query = searchParams.toString()
  const href = `/aktuelt/${news.id}/edit${query ? `?${query}` : ''}`

  const tagMetaData = newsTagMeta[news.tags[0]]

  return (
    <LinkCard style={{minHeight: '450px' } }>

      <LinkCard.Image aspectRatio="16/9">
        {news.imageUrl ? (
          <NewsImage imageUrl={news.imageUrl} alt={news.imageDescription} tags={news.tags} />
        ) : (
          <Box
            height={'100%'}
            style={{
              backgroundColor: tagMetaData.defaultBackgroundColor,
              fontSize: '90px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {tagMetaData.defaultIcon}
          </Box>
        )}
      </LinkCard.Image>

      <LinkCard.Title style={{ textWrap: 'balance', fontWeight: 'initial' }}
      >
        <LinkCard.Anchor asChild>
          <Link to={href} style={{ textDecoration: 'none' }}>{news.title}</Link>
        </LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Footer>
        <NewsCardFooter news={news} />
      </LinkCard.Footer>
    </LinkCard>
  )
}
