import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';

import * as S from './styles'

type Players = 'left' | 'right'

const PLAYER_LEFT_NAME = '@Snooker/PlayerLeftName'
const PLAYER_RIGHT_NAME = '@Snooker/PlayerRightName'

const balls = [
  {
    number: 1,
    color: 'red',
  },
  {
    number: 2,
    color: 'yellow',
  },
  {
    number: 3,
    color: 'green',
  },
  {
    number: 4,
    color: 'brown',
  },
  {
    number: 5,
    color: 'blue',
  },
  {
    number: 6,
    color: 'pink',
  },
  {
    number: 7,
    color: 'black',
  },
]

export function HomeScreen() {
  const position = useRef(new Animated.Value(0)).current;
  const [currentPlayer, setCurrentPlayer] = useState<Players>('left')
  const [playerLeft, setPlayerLeft] = useState({
      player: 'left',
      name: 'Player 1',
      points: 0,
  })
  const [playerRight, setPlayerRight] = useState({
      player: 'right',
      name: 'Player 2',
      points: 0,
  })

  const resultPoints = useMemo(() => {
    const points = playerLeft.points - playerRight.points
    if (points > 0) {
      return { name: playerLeft.name, points } 
    }
    if (points < 0) {
      return { name: playerRight.name, points: points * -1 } 
    }
    return { name: 'Empate', points: 0 }
  }, [playerLeft.points, playerRight.points])

  const handlePlayer = useCallback((player: Players) => {
    return () => {
      setCurrentPlayer(player)
      Keyboard.dismiss()
    }
  }, [])

  const handleBall = useCallback((ball: number) => {
    return () => {
      if (currentPlayer === 'left') {
        setPlayerLeft(_playerLeft => ({
          ..._playerLeft,
          points: _playerLeft.points + ball,
        }))
      } else {
        setPlayerRight(_playerRight => ({
          ..._playerRight,
          points: _playerRight.points + ball,
        }))
      }
    }
  }, [currentPlayer])

  const handleChangeName = useCallback(async (name: string, player: Players) => {
    if (player === 'left') {
      setPlayerLeft(_playerLeft => ({ ..._playerLeft, name }))
      await AsyncStorage.setItem(PLAYER_LEFT_NAME, name)
    } else {
      setPlayerRight(_playerRight => ({ ..._playerRight, name }))
      await AsyncStorage.setItem(PLAYER_RIGHT_NAME, name)
    }
  }, [])

  const handleShowResetAlert = useCallback(() => {
    Alert.alert('Deseja reiniciar?', 'Deseja reiniciar?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          setPlayerLeft(_playerLeft => ({ ..._playerLeft, points: 0 }))
          setPlayerRight(_playerRight => ({ ..._playerRight, points: 0 }))
        }
      },
    ])
  }, [])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: -50,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  }, [position]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    async function getNamesFromAsyncStorage() {
      const playerLeftName = await AsyncStorage.getItem(PLAYER_LEFT_NAME)
      const playerRightName = await AsyncStorage.getItem(PLAYER_RIGHT_NAME)
      setPlayerLeft(_playerLeft => ({ ..._playerLeft, name: playerLeftName || 'Player 1' }))
      setPlayerRight(_playerRight => ({ ..._playerRight, name: playerRightName || 'Player 2' }))
    }
    getNamesFromAsyncStorage()
  }, [])

  return (
    <S.Container>
      <S.LeftPlayer onPress={handlePlayer('left')}>
        <S.PlayerNameContainer>
          <S.PlayerName
            editable
            value={playerLeft.name}
            onChangeText={(name: string) => handleChangeName(name, 'left')}
          />
        </S.PlayerNameContainer>
        <S.PlayerPoint>{playerLeft.points}</S.PlayerPoint>
      </S.LeftPlayer>
      <S.RightPlayer onPress={handlePlayer('right')}>
        <S.PlayerNameContainer>
          <S.PlayerName
            editable
            value={playerRight.name}
            onChangeText={(name: string) => handleChangeName(name, 'right')}
          />
        </S.PlayerNameContainer>
        <S.PlayerPoint align="flex-end">{playerRight.points}</S.PlayerPoint>
      </S.RightPlayer>
      <S.CurrentPlayerContainer currentPlayer={currentPlayer}>
        <S.CueBall style={{ transform: [{ translateY: position }] }} />
      </S.CurrentPlayerContainer>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        delayLongPress={1000} 
        onLongPress={handleShowResetAlert}
      >
        <S.ResultContainer>
            <S.ResultPlayer>{resultPoints.name}</S.ResultPlayer>
            <S.ResultPoints>{resultPoints.points}</S.ResultPoints>
        </S.ResultContainer>
      </TouchableWithoutFeedback>
      <S.BallsContainer>
        {balls.map(ball => (
          <S.Ball key={ball.number} color={ball.color} onPress={handleBall(ball.number)}>
            <S.BallCircle>
              <S.BallNumber>{ball.number}</S.BallNumber>
            </S.BallCircle>
          </S.Ball>
        ))}
      </S.BallsContainer>
    </S.Container>
  )
}
