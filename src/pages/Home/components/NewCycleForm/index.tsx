import { FormContainer, MinuteAmountInput } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Zod from 'zod'

const newCycleFormValidateSchema = Zod.object({
  task: Zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: Zod.number().min(1).max(60),
})

type NewCycleFormData = Zod.infer<typeof newCycleFormValidateSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidateSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
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
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>Minutos.</span>
    </FormContainer>
  )
}
