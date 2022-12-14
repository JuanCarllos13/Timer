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
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinuteAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
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
