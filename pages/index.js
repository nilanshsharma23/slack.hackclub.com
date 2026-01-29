import Meta from '@hackclub/meta'
import Head from 'next/head'
import { Box, Heading, Text, Link as ThemeLink } from 'theme-ui'
import { useState, useRef, useCallback } from 'react'

import { thousands } from '../lib/members'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Header from '../components/slack/header'
import Slides from '../components/slides/Slides'

const ChannelName = ({ children, href }) => (
  <Text
    as={href ? 'a' : 'span'}
    href={href}
    target={href ? '_blank' : undefined}
    sx={{
      fontWeight: 400,
      color: '#1264a3',
      fontSize: '1.15rem',
      backgroundColor: '#e8f5fa',
      px: '0.3em',
      py: '0.1em',
      borderRadius: '4px',
      textDecoration: 'none',
      transition: 'background-color 0.15s ease',
      ...(href && {
        '&:hover': {
          backgroundColor: '#c9e5f2'
        }
      })
    }}
  >
    {children}
  </Text>
)

const GuideItem = ({ title, children, isOpen, onToggle }) => {
  const contentRef = useRef(null)

  const handleClick = () => {
    onToggle()
  }

  const handleTransitionEnd = useCallback(() => {
  }, [])

  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'smoke',
        overflow: 'hidden',
        '&:last-child': { borderBottom: 'none' }
      }}
    >
      <Box
        as="button"
        onClick={handleClick}
        sx={{
          width: '100%',
          py: '1rem',
          px: 0,
          fontWeight: 600,
          fontSize: '1.5rem',
          color: 'steel',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'inherit',
          textAlign: 'left',
          transition: 'color 0.2s ease',
          '&:hover': { color: 'primary' },
          '&:hover .guide-icon': { color: 'primary' }
        }}
      >
        {title}
        <Text
          className="guide-icon"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'muted',
            transition: 'color 0.2s ease'
          }}
        >
          {isOpen ? '−' : '+'}
        </Text>
      </Box>
      <Box
        ref={contentRef}
        onTransitionEnd={handleTransitionEnd}
        sx={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.3s ease',
          '& > div': { overflow: 'hidden' }
        }}
      >
        <Box
          sx={{
            fontSize: '1.15rem',
            pb: isOpen ? '1rem' : 0,
            transition: 'padding 0.3s ease',
            '& p': { mb: '0.75rem', color: 'slate' },
            '& p:last-child, & ul:last-child': { mb: 0 },
            '& ul': { pl: '1.5rem' },
            '& li': { mb: '0.5rem', color: 'slate' },
            '& code': {
              bg: 'sunken',
              px: '0.3em',
              py: '0.1em',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

const Card = ({ children, sx, ...props }) => (
  <Box
    sx={{
      bg: 'white',
      borderRadius: '12px',
      p: '1.5rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      transition: 'box-shadow 0.2s ease',
      '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)' },
      ...sx
    }}
    {...props}
  >
    {children}
  </Box>
)

const SlackPage = () => {
  const nameInputRef = useRef(null)
  const [openGuide, setOpenGuide] = useState(null)
  const [slidesOpen, setSlidesOpen] = useState(false)

  const handleGuideToggle = (index) => {
    setOpenGuide(openGuide === index ? null : index)
  }

  const handleJoinClick = () => {
    setSlidesOpen(true)
  }

  const handleSlidesClose = useCallback(() => {
    setSlidesOpen(false)
    window.history.pushState(null, '', '/')
  }, [])

  return (
    <>
      <Meta
        as={Head}
        name="Join our Slack"
        description={`The Hack Club Slack is a community of ${thousands}k+ high school hackers around the world. Chat, meet new friends, code together, share your work.`}
        image="https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/02020-07-25_d2dd4egb1th5k71w4uj0abbfkvvtnc01.jpeg"
      />
      <ForceTheme theme="light" />
      <Nav />
      <Slides isOpen={slidesOpen} onClose={handleSlidesClose} />
      <Header onJoinClick={handleJoinClick} />

      <Box
        as="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr 1fr'],
          gap: '1.5rem',
          maxWidth: '1200px',
          mx: 'auto',
          p: ['1rem', '2rem']
        }}
      >
        {/* Guide Section */}
        <Card sx={{ gridColumn: ['1', '1 / -1'] }}>
          <Heading as="h2" sx={{ fontSize: '3rem', color: 'black', mb: '1rem' }}>
            New? Read this first!
          </Heading>

          <GuideItem
            title="How Slack works"
            isOpen={openGuide === 0}
            onToggle={() => handleGuideToggle(0)}
          >
            <p>
              Welcome! Our Slack can be intimidating, but that&apos;s because there
              is so much happening. We care about you, and wrote this guide to
              help you.
            </p>
            <p>
              <strong>Channels:</strong> Channels are to Slack what food is to a
              restaurant. The whole point! When you want to talk about
              something, you find the channel with other people who want to talk
              about it, or if that channel doesn&apos;t exist, you make your own.
            </p>
            <p>
              <strong>DMs:</strong> You can also DM individual users or groups
              of users.
            </p>
            <p>
              <strong>Search:</strong> The search bar at the top of your Slack
              is how you find channels to join, find people to DM, and look up
              messages. It has a lot of hidden functions; for example you can
              search in a specific channel for a specific message on a specific
              day.
            </p>
            <p>
              <strong>The Sidebar:</strong> Once you join a channel or start a
              DM, it lives in your sidebar. You can play around and reorganize
              it in the way that makes sense to you.
            </p>
          </GuideItem>

          <GuideItem
            title="Where to start"
            isOpen={openGuide === 1}
            onToggle={() => handleGuideToggle(1)}
          >
            <p><strong>As a new user, you&apos;re put into a special welcome channel for new
              users</strong> who joined around the same time as you. This is overseen by our
              Gardeners, teen hackers who volunteer to help new users. Don&apos;t be shy:
              ask them a question! It&apos;s also a good place to make friends with other new users, 
              and do fun things organized by the Special Activities Division.</p>
            <p>Other than your welcome channel, here are some core channels:</p>
            <p>
              <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0710J7F4U9">#ysws</ChannelName> - At Hack Club, the
              #1 activity is making things! &quot;You Ship, We Ship&quot; is a challenge
              where you make something and you get a prize in return. Make what?
              Get what? There are lots of different YSWS, offering different
              prizes for different kinds of projects. Browse{' '}
              <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0710J7F4U9">#ysws</ChannelName> to find a challenge
              and get started.
            </p>
            <p>
              Once you find a YSWS you like, join its channel. Many YSWS also
              have a help channel. Join that, too.
            </p>
            <p>Here are more key channels:</p>
            <ul>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0EA9S0A0">#code</ChannelName> - A channel to get help with
                code
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C6C026NHJ">#hardware</ChannelName> - A channel to get help
                with hardware projects
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C01504DCLVD">#scrapbook</ChannelName> - A channel to show off
                your work in progress, and be amazed by others doing the same!
              </li>
            </ul>
            <ul>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0266FRGT">#announcements</ChannelName> - Big announcements
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C05B6DBN802">#happenings</ChannelName> - A biweekly roundup of
                cool stuff happening on the Slack
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C01AS1YEM8A">#neighbourhood</ChannelName> - A channel to help
                you find even more channels! Channels channel channels!
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C078Q8PBD4G">#library</ChannelName> - An app that shows the
                newest and most active channels. We really like channels!
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0266FRGV">#lounge</ChannelName> - A channel for general
                discussion. Remember to follow the code of conduct everywhere in
                the Slack. &quot;General discussion&quot; does not mean spam or bullying.
              </li>
            </ul>
          </GuideItem>

          <GuideItem
            title="Being good"
            isOpen={openGuide === 3}
            onToggle={() => handleGuideToggle(3)}
          >
            <p>
              Hack Club is special, because we insist on making it that way. We
              will hold you to higher standards than most online spaces.
            </p>
            <p>
              Our{' '}
              <ThemeLink href="https://hackclub.com/conduct/">
                Code of Conduct
              </ThemeLink>{' '}
              is short because we expect you to read it, know it, and follow it.
            </p>
            <p>
              If you want to report misconduct, send a DM to <ChannelName href="https://hackclub.slack.com/app_redirect?app=A07K4T4FMAS">@shroud</ChannelName>, which reports it to the Fire Department, our moderation team.
            </p>
          </GuideItem>
        </Card>

        {/* Slack Highlights */}
        <Card sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Heading as="h2" sx={{ fontSize: '3rem', color: 'black', mb: 0 }}>
            Slack Highlights
          </Heading>
          <Text sx={{ fontSize: '1.15rem', color: 'slate' }}>
            Joining from India? Check out <ChannelName href="https://hackclub.enterprise.slack.com/archives/C07BRLYTSSK">#india</ChannelName> to
            meet other Indian Hack Clubbers!
          </Text>
        </Card>

        {/* Changelog */}
        <Card>
          <Heading as="h2" sx={{ fontSize: '3rem', color: 'black', mb: '1rem' }}>
            Changelog
          </Heading>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Box
              as="article"
              sx={{ pl: '1rem', borderLeft: '3px solid', borderColor: 'primary' }}
            >
              <Text sx={{ fontWeight: 700, color: 'primary', fontSize: '0.9rem' }}>
                v1.1.0
              </Text>
              <Text sx={{ fontSize: '0.8rem', color: 'muted', ml: '0.5rem' }}>
                January 27 2025
              </Text>
              <Text sx={{ ml: '0.5rem', fontSize: '1.15rem', color: 'slate' }}>
                slides added to onboarding flow
              </Text>
            </Box>
            <Box
              as="article"
              sx={{ pl: '1rem', borderLeft: '3px solid', borderColor: 'primary' }}
            >
              <Text sx={{ fontWeight: 700, color: 'primary', fontSize: '0.9rem' }}>
                v1.0.0
              </Text>
              <Text sx={{ fontSize: '0.8rem', color: 'muted', ml: '0.5rem' }}>
                January 16 2025
              </Text>
              <Text sx={{ ml: '0.5rem', fontSize: '1.15rem', color: 'slate' }}>
                slack.hackclub.com launched
              </Text>
            </Box>
          </Box>
        </Card>
      </Box>

      <Footer />
    </>
  )
}

export default SlackPage
