import { AutoColumn } from 'components/Column'
import styled from 'styled-components/macro'

export const Wrapper = styled(AutoColumn)`
  max-width: 800px;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 480px;
  `};
`

export default function Feed() {
  return <Wrapper>feed</Wrapper>
}
