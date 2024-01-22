import React from 'react'
import ContentLoader from 'react-content-loader'

const EmpresaLoader = props => {
  return (
    <ContentLoader
      height={54}
      width={320}
      viewBox="0 0 320 54"
      backgroundColor="#FFEFEF"
      foregroundColor="#F1FFF9"
      {...props}
    >
      <circle cx="27" cy="27" r="18" />
      <rect x="53" y="14" rx="3" ry="3" width="200" height="13" />
      <rect x="53" y="30" rx="3" ry="3" width="10" height="10" />
      <rect x="66" y="30" rx="3" ry="3" width="10" height="10" />
      <rect x="79" y="30" rx="3" ry="3" width="10" height="10" />
      <rect x="92" y="30" rx="3" ry="3" width="10" height="10" />
      <rect x="105" y="30" rx="3" ry="3" width="10" height="10" />
      {/* <rect x="67" y="30" rx="3" ry="3" width="74" height="10" /> */}
      {/* <circle cx="305" cy="27" r="8" /> */}
      {/* <rect x="0" y="53" rx="0" ry="0" width="320" height="1" /> */}
      <rect x="53" y="48" rx="3" ry="3" width="170" height="11" />
    </ContentLoader>
  )
}

EmpresaLoader.metadata = {
  name: 'Reputacao 360',
  github: 'katumbela',
  description: 'An Angolan Reputation Platform',
  filename: 'R360',
}

export default EmpresaLoader;