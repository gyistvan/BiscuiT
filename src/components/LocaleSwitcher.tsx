import React from 'react'
import { useRouter } from 'next/router'
import { locales, languageNames } from '../translations/config'
import { LocaleContext } from '../context/LocaleContext'
import styled from 'styled-components'

const LangWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  justify-content: end;
  font-family: 'Montserrat';
  font-size: 14px;
`;

const LangBtn = styled.div`
--gold: ${props => props.theme.color.gold};
--speed3: cubic-bezier(0.26, 0.48, 0.08, 0.9);
--height: 32px;
  margin-right: 5%;
.language-switcher {
  position: relative;
  display: inline-block;
  width: calc(var(--height) * 2);
  height: var(--height);
  transform: translateY(40%);

  // Closing Animation
  transition: transform 0.17s var(--speed3);

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .select-fr,
  .select-en {
    position: absolute;
    font-size: calc(var(--height) / 2.5);
    top: calc(var(--height) / 4);
  }
  .select-fr {
    left: calc(var(--height) / 3.5);
    color: ${props => props.lang === 'fr' ? '#000' : null};
  }
  .select-en {
    right: calc(var(--height) / 4);
    color: ${props => props.lang === 'en' ? '#000' : null};
  }
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--gold);
  box-shadow: 0 3px 64px rgba(var(--gold), .1);
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: var(--height);
  width: var(--height);
  left: 0;
  bottom: 0;
  background-color: white;
  box-shadow: 0 3px 64px rgba(var(--gold), .16);
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--gold);
}

input:focus + .slider {
  box-shadow: none;
}

input:checked + .slider:before {
  transform: translateX(var(--height));
}

/* Rounded sliders */
.slider.round {
  border-radius: var(--height);
}

.slider.round:before {
  border-radius: 50%;
}

`;

const LocaleSwitcher: React.FC = () => {
  const router = useRouter()
  const { locale: { lang } } = React.useContext(LocaleContext)
  const handleLocaleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const targetLang = e.target.checked ? 'en' : 'fr'
      const regex = new RegExp(`^/(${locales.join('|')})`)
      router.push(router.pathname, router.asPath.replace(regex, `/${targetLang}`))
    },
    [router]
  )

  return (
    <LangWrapper>
      <LangBtn lang={lang}>
        <label className="language-switcher">
          <input type="checkbox" onChange={handleLocaleChange} checked={lang === 'en' ? true : false} />
          <span className="slider round"></span>
          <span className="select-fr">FR</span>
          <span className="select-en">EN</span>
        </label>
      </LangBtn>
    </LangWrapper>
  )
}

export default LocaleSwitcher