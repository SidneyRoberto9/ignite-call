import dayjs from 'dayjs'
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

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

      {isDateSelected && (
        <TimerPicker>
          <TimerPickerHeader>
            {weekDay + ' '}
            <span>{describedDate}</span>
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
