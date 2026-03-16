import { Box, Card, Grid, Heading, Text } from 'theme-ui'
import SlideUp from '../slide-up'
import usePrefersMotion from '../../lib/use-prefers-motion'
import useHasMounted from '../../lib/use-has-mounted'

const Content = ({ onJoinClick }) => (
  <Grid gap={3} pt={[5, '100px']} pb={[3, 4]}>
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        textShadow: 'text',
        textAlign: ['center', 'center']
      }}
    >
      <Heading
        as="h1"
        variant="title"
        sx={{
          color: 'white',
          fontSize: [5, 6, 7],
          lineHeight: 'limit',
          mb: [2, 3]
        }}
      >
        Hack Club Slack
      </Heading>
    </Box>
    <SlideUp sx={{ zIndex: 5, display: 'flex', alignItems: 'center' }}>
      <Card
        sx={{
          variant: 'cards.translucent',
          maxWidth: (t) => `calc(${t.sizes.narrow} * 1.2)`,
          mx: 'auto',
          textAlign: 'center'
        }}
      >
        <Text as="p" sx={{ fontSize: [2, 3], mb: 3 }}>
          Hack Clubbers hang out on our Slack.
          <br />
          Join up to make friends, find projects, and have fun.
        </Text>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Text
            as="button"
            onClick={onJoinClick}
            sx={{
              bg: 'red',
              backgroundImage:
                'radial-gradient(ellipse farthest-corner at top left, #ff8c37, #ec3750)',
              color: 'white',
              fontSize: [2, 3],
              px: 5,
              py: 3,
              borderRadius: 'extra',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.125s ease-in-out',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              ':hover': {
                transform: 'scale(1.05)',
                backgroundImage:
                  'radial-gradient(ellipse farthest-corner at bottom right, #ff8c37, #ec3750)'
              }
            }}
          >
            Join Hack Club
          </Text>
        </Box>
      </Card>
    </SlideUp>
  </Grid>
)

const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      backgroundImage: (t) => t.util.gx('cyan', 'purple'),
      opacity: 0.625,
      zIndex: 1
    }}
  />
)

const Static = ({
  img = 'https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png',
  onJoinClick
}) => (
  <Box
    as="section"
    id="slack"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover'
    }}
  >
    <Cover />
    <Content onJoinClick={onJoinClick} />
  </Box>
)

const Slack = ({ onJoinClick }) => {
  const hasMounted = useHasMounted()
  const prefersMotion = usePrefersMotion()
  if (hasMounted && prefersMotion) {
    return (
      <Box
        as="section"
        id="slack"
        sx={{ overflow: 'hidden', position: 'relative' }}
      >
        <Box
          as="video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png"
          duration={2000}
          sx={{
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            zIndex: -1,
            width: '100vw',
            objectFit: 'cover'
          }}
        >
          <source
            src="https://cdn.glitch.com/2d637c98-ed35-417a-bf89-cecc165d7398%2Foutput-no-duplicate-frames.hecv.mp4?v=1590780967658"
            type="video/mp4; codecs=hevc"
          />
          <source
            src="https://cdn.glitch.com/2d637c98-ed35-417a-bf89-cecc165d7398%2Foutput-no-duplicate-frames.webm?v=1590781698834"
            type="video/webm; codecs=vp9,opus"
          />
          <source
            src="https://cdn.glitch.com/2d637c98-ed35-417a-bf89-cecc165d7398%2Foutput-no-duplicate-frames.mov?v=1590781491717"
            type="video/quicktime"
          />
        </Box>
        <Cover />
        <Content onJoinClick={onJoinClick} />
      </Box>
    )
  } else {
    return <Static onJoinClick={onJoinClick} />
  }
}

export default Slack
