import Link, { LinkProps } from 'next/link'
import React from 'react'

import useTranslation from '../hooks/useTranslation'

const LocaleLink: React.FC<LinkProps> = (props) => {
  const { locale } = useTranslation()
  const localized = Object.assign({}, props, {
    href: `/[lang]${props.href}`,
    as: props.as ? `/${locale}${props.as}` : `/${locale}${props.href}`
  })
  return <Link {...localized} />
}

export default LocaleLink