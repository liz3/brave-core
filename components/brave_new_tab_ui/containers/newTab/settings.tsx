/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

import {
  SettingsMenu,
  SettingsRow,
  SettingsText,
  SettingsTitle,
  SettingsWrapper,
  IconButton,
  IconButtonSideText
} from '../../components/default'

import { Toggle } from '../../components/toggle'

import { getLocale } from '../../../common/locale'
import { SettingsIcon } from 'brave-ui/components/icons'

export interface Props {
  textDirection: string
  showSettingsMenu: boolean
  onClick: () => void
  onClickOutside: () => void
  toggleShowBackgroundImage: () => void
  toggleShowClock: () => void
  toggleShowStats: () => void
  toggleShowTopSites: () => void
  toggleShowRewards: () => void
  toggleShowTogether: () => void
  toggleShowBinance: () => void
  toggleBrandedWallpaperOptIn: () => void
  showBackgroundImage: boolean
  showStats: boolean
  showClock: boolean
  showTopSites: boolean
  brandedWallpaperOptIn: boolean
  allowSponsoredWallpaperUI: boolean
  showRewards: boolean
  showTogether: boolean
  showBinance: boolean
  binanceSupported: boolean
  togetherSupported: boolean
}

export default class Settings extends React.PureComponent<Props, {}> {
  settingsMenuRef: React.RefObject<any>
  constructor (props: Props) {
    super(props)
    this.settingsMenuRef = React.createRef()
  }

  handleClickOutside = (event: Event) => {
    if (this.settingsMenuRef && !this.settingsMenuRef.current.contains(event.target)) {
      this.props.onClickOutside()
    }
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  onKeyPressSettings = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      this.props.onClickOutside()
    }
  }

  toggleShowBackgroundImage = () => {
    this.props.toggleShowBackgroundImage()
  }

  render () {
    const {
      textDirection,
      showSettingsMenu,
      toggleShowClock,
      toggleShowStats,
      toggleShowTopSites,
      toggleShowRewards,
      toggleShowTogether,
      toggleBrandedWallpaperOptIn,
      showBackgroundImage,
      showStats,
      showClock,
      showTopSites,
      showRewards,
      showTogether,
      brandedWallpaperOptIn,
      allowSponsoredWallpaperUI,
      onClick,
      toggleShowBinance,
      showBinance,
      binanceSupported,
      togetherSupported
    } = this.props
    return (
      <SettingsWrapper
        textDirection={textDirection}
        title={getLocale('dashboardSettingsTitle')}
        innerRef={this.settingsMenuRef}
      >
        <IconButtonSideText textDirection={textDirection}>
          <IconButton onClick={onClick} onKeyDown={this.onKeyPressSettings}><SettingsIcon/></IconButton>
          {getLocale('customize')}
        </IconButtonSideText>
        {showSettingsMenu &&
          <SettingsMenu textDirection={textDirection}>
            <SettingsTitle>{getLocale('dashboardSettingsTitle')}</SettingsTitle>
            {allowSponsoredWallpaperUI &&
            <SettingsRow>
              <SettingsText>{getLocale('showBackgroundImage')}</SettingsText>
              <Toggle
                onChange={this.toggleShowBackgroundImage}
                checked={showBackgroundImage}
                size='small'
              />
            </SettingsRow>
            }
            {allowSponsoredWallpaperUI &&
            <SettingsRow isChildSetting={true}>
              <SettingsText>{getLocale('brandedWallpaperOptIn')}</SettingsText>
              <Toggle
                onChange={toggleBrandedWallpaperOptIn}
                // This option can only be enabled if
                // users opt in for background images
                checked={showBackgroundImage && brandedWallpaperOptIn}
                disabled={!showBackgroundImage}
                size='small'
              />
            </SettingsRow>
            }
            <SettingsRow>
              <SettingsText>{getLocale('showRewards')}</SettingsText>
              <Toggle
                onChange={toggleShowRewards}
                checked={showRewards}
                size='small'
              />
            </SettingsRow>
            {
              togetherSupported
              ? <SettingsRow>
                  <SettingsText>{getLocale('showTogether')}</SettingsText>
                  <Toggle
                    onChange={toggleShowTogether}
                    checked={showTogether}
                    size='small'
                  />
                </SettingsRow>
              : null
            }
            {
              binanceSupported
              ? <SettingsRow>
                  <SettingsText>{getLocale('showBinance')}</SettingsText>
                  <Toggle
                    onChange={toggleShowBinance}
                    checked={showBinance}
                    size='small'
                  />
                </SettingsRow>
              : null
            }
            <SettingsRow>
              <SettingsText>{getLocale('showBraveStats')}</SettingsText>
              <Toggle
                onChange={toggleShowStats}
                checked={showStats}
                size='small'
              />
            </SettingsRow>
            <SettingsRow>
              <SettingsText>{getLocale('showClock')}</SettingsText>
              <Toggle
                onChange={toggleShowClock}
                checked={showClock}
                size='small'
              />
            </SettingsRow>
            <SettingsRow>
              <SettingsText>{getLocale('showTopSites')}</SettingsText>
              <Toggle
                onChange={toggleShowTopSites}
                checked={showTopSites}
                size='small'
              />
            </SettingsRow>
        </SettingsMenu>
      }
      </SettingsWrapper>
    )
  }
}
