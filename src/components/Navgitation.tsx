import React from 'react'
import styled from 'styled-components'
import useTranslation from '../hooks/useTranslation'
import { useRouter } from 'next/router'
import { motion, AnimateSharedLayout } from 'framer-motion'
import LocaleLink from './LocaleLink'

const ActiveLinks = [
  { tKey: 'navigation_Home', path: '' },
  { tKey: 'navigation_Blog', path: 'blog' },
  { tKey: 'navigation_About', path: 'about' },
  { tKey: 'navigation_Uses', path: 'uses' },
  // { tKey: 'navigation_Projects', path: 'projects' },
  { tKey: 'navigation_Contact', path: 'contact' },
]

const NavgitationStyles = styled.nav`
  --contentWidth: ${(props) => `${props.theme.layout.contentWidth}px`};

  background: black;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 1000px;
  display: flex;
  border-top: 1px solid ${(props) => props.theme.color.accent};
  border-bottom: none;
  z-index: 5;

  @media (min-width: ${(props) => `${props.theme.layout.contentWidth}px`}) {
    bottom: unset;
    height: 60px;
    top: 0;
    background: ${(props) => props.theme.background};
    border-top: none;
    border-bottom: 1px solid ${(props) => props.theme.color.accent};
    margin: auto;
    left: 50%;
    transform: translateX(-50%);
  }
  .nav-selected {
    background: black;
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: -1;
  }
`

const StyledMenuLink = styled(motion.a)<{ current: boolean }>`
  font-size: 20px;
  font-size: max(18px, min(2vw, 22px));
  padding: 12px 0;
  color: ${(props) => (props.current ? 'black' : 'white')};
  cursor: pointer;
  flex-grow: 2;
  text-align: center;
  font-weight: ${(props) => (props.current ? '600' : '400')};
  position: relative;
  tab-index: 0;
  &:focus {
    border: solid 1px ${(props) => props.theme.color.accent};
  }
`

const Navigation = () => {
  const { locale, t } = useTranslation()
  const router = useRouter()
  const { pathname } = router
  const isCurrentPath = (path) => {
    const filteredPathname = pathname
      .replace(/(\/\[lang\]\/?)/g, '')
      .replace(/\/.*/g, '')
    return filteredPathname === path
  }

  return (
    <AnimateSharedLayout>
      <NavgitationStyles>
        {ActiveLinks.map(({ tKey, path }, i) => (
          <LocaleLink href={`/${path}`} as={`/${path}`} key={i} passHref={true}>
            <StyledMenuLink current={isCurrentPath(path)} animate key={i}>
              {isCurrentPath(path) && (
                <motion.div
                  layoutId="nav-selected"
                  className="nav-selected"
                  style={{ backgroundColor: '#FBB03B' }}
                />
              )}
              {t('common')[tKey]}
            </StyledMenuLink>
          </LocaleLink>
        ))}
      </NavgitationStyles>
    </AnimateSharedLayout>
  )
}
export default Navigation
