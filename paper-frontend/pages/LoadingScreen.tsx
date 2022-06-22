import React from 'react'
import { CircularProgress } from "@material-ui/core";
import { LoadingScreenContainer } from './LoadingScreen.styles';

const LoadingScreen = (): JSX.Element => {
  return (
    <LoadingScreenContainer>
      <CircularProgress/>
    </LoadingScreenContainer>
  )
}

export default LoadingScreen