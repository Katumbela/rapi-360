import React from 'react'
import ContentLoader from 'react-content-loader'

const ProfileCard = props => {
  return (
    <ContentLoader
      speed={1}
      width={200}  // Ajuste o valor de width conforme necessário
      height={250}
      viewBox="0 0 350 300"  // Ajuste o valor de viewBox conforme necessário
      backgroundColor="#E0FFEF"
      foregroundColor="#FFD2D2"
      {...props}
    >
      <rect x="0" y="53" rx="0" ry="0" width="2" height="300" />
      <rect x="348" y="55" rx="0" ry="0" width="2" height="300" />
      <rect x="0" y="53" rx="0" ry="0" width="350" height="2" />
      <rect x="0" y="353" rx="0" ry="0" width="350" height="2" />
      <circle cx="175" cy="147" r="44" />
      <rect x="3" y="53" rx="0" ry="0" width="344" height="41" />
      <rect x="27" y="207" rx="0" ry="0" width="296" height="9" />
      <rect x="60" y="236" rx="0" ry="0" width="230" height="9" />
      <rect x="35" y="324" rx="0" ry="0" width="280" height="51" />
    </ContentLoader>
  )
}

ProfileCard.metadata = {
  name: 'Reputacao 360',
  github: 'katumbela',
  description: 'An Angolan Reputation Platform',
  filename: 'R360',
}

export default ProfileCard;
