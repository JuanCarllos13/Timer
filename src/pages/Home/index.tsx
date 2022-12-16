import React, { useEffect, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'

import { differenceInSeconds } from 'date-fns'

import { StartCountDownButton, StopCountDownButton } from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setaAtiveCycleId] = useState<string | null>(null)

  const task = watch('task')
  const isSubmitDisabled = !task

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycles: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycles])
    setaAtiveCycleId(newCycles.id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setaAtiveCycleId(null)
  }

  console.log(cycles)

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <CountDown
          activeCycle={activeCycle}
          setCycle={setCycles}
          activeCycleId={activeCycleId}
        />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
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
