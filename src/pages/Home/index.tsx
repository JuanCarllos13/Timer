import React, { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Zod from 'zod'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import { CyclesContext } from '../../context/CyclesContext'

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

const newCycleFormValidateSchema = Zod.object({
  task: Zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: Zod.number().min(1).max(60),
})

type NewCycleFormData = Zod.infer<typeof newCycleFormValidateSchema>

export function Home() {
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidateSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })
  const { activeCycle, InterruptCycle, createNewCycle } =
    useContext(CyclesContext)

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={InterruptCycle}>
            <HandPalm size={25} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={25} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
