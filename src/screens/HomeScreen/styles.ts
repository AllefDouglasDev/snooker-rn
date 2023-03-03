// @ts-ignore
import styled from 'styled-components/native'
import { css } from 'styled-components'
import { Animated } from 'react-native'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  background-color: #fff;
  position: relative;
`

export const LeftPlayer = styled.TouchableOpacity`
  flex: 1;
  width: 50%;
  background-color: blue;
  padding: 10px 20px;
  opacity: 0.8;
`

export const RightPlayer = styled.TouchableOpacity`
  flex: 1;
  width: 50%;
  background-color: red;
  padding: 10px 20px;
  opacity: 0.8;
`

export const PlayerNameContainer = styled.View`
  width: 100%;
  height: 40px;
  background-color: black;
  opacity: 0.8;
  border-radius: 8px;
  justify-content: center;
  padding: 0 10px;
`

export const PlayerName = styled.TextInput`
  font-size: 20px;
  font-weight: bold;
  color: white;
`

export const PlayerPoint = styled.Text`
  ${({ align = 'flex-start' }) => css`
    font-weight: bold;
    font-size: 40px;
    color: green;
    align-self: ${align};
  `}
`

export const BallsContainer = styled.View`
  position: absolute;
  bottom: 10px;
  padding: 10px 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const Ball = styled.TouchableOpacity<{ color: string }>`
  ${({ color }: { color: string }) => css`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${color};
    align-items: center;
    justify-content: center;
  `}
`

export const BallCircle = styled.View`
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background-color: white;
  align-items: center;
  justify-content: center;
`

export const BallNumber = styled.Text`
  font-size: 20px;
  font-weight: bold;
`

export const ResultContainer = styled.View`
  width: 40%;
  height: 50%;
  position: absolute;
  top: 60px;
  left: 30%;
  background-color: black;
  opacity: 0.8;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`

export const ResultPlayer = styled.Text`
  font-weight: bold;
  font-size: 30px;
  color: white;
  text-align: center;
`

export const ResultPoints = styled.Text`
  font-weight: bold;
  font-size: 80px;
  color: white;
  text-align: center;
`

export const CurrentPlayerContainer = styled.View`
  ${({ currentPlayer = 'left' }) => css`
    position: absolute;
    top: 40%;
    ${currentPlayer === 'left' ? 'left: 15%' : 'right: 15%'};
  `}
`

export const CueBall = styled(Animated.View)`
  background-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

