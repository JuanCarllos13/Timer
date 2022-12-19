import { useContext } from 'react'
import { CyclesContext } from '../../context/CyclesContext'
import { formatDistanceToNow } from 'date-fns'

import ptBr from 'date-fns/locale/pt-BR'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Incio</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycles) => {
              return (
                <tr key={cycles.id}>
                  <td>{cycles.task}</td>
                  <td>{cycles.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycles.startDate), {
                      addSuffix: true,
                      locale: ptBr,
                    })}
                  </td>
                  <td>
                    {cycles.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}

                    {cycles.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {!cycles.finishedDate && !cycles.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
