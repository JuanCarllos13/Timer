import React from 'react'
import { Play } from 'phosphor-react'
import {
  CountDownCOntainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" placeholder="Dê um nome para o seu projeto" />

          <label htmlFor="minutesAmount">durante</label>
          <MinuteAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
          />

          <span>Minutos.</span>
        </FormContainer>

        <CountDownCOntainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownCOntainer>

        <StartCountDownButton type="submit" disabled>
          <Play size={25} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
