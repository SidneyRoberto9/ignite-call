import { useState } from 'react'

import { Calendar } from '../../../../../components/Calendar'
import {
  Container,
  TimerPicker,
  TimerPickerHeader,
  TimerPickerItem,
  TimerPickerList,
} from './styles'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

      {isDateSelected && (
        <TimerPicker>
          <TimerPickerHeader>
            terça-feira <span>20 de setembro</span>
          </TimerPickerHeader>

          <TimerPickerList>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>08:00h</TimerPickerItem>
          </TimerPickerList>
        </TimerPicker>
      )}
    </Container>
  )
}
