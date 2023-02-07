import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Calendar } from '../../../../../components/Calendar'
import { api } from '../../../../../lib/axios'
import {
  Container,
  TimerPicker,
  TimerPickerHeader,
  TimerPickerItem,
  TimerPickerList,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)

  const isDateSelected = !!selectedDate

  const router = useRouter()
  const username = router.query.username as string

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  async function getAvailabilityDates() {
    const { data } = await api.get<Availability>(
      `/users/${username}/availability`,
      {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      },
    )

    setAvailability(data)
  }

  useEffect(() => {
    if (!selectedDate) {
      return
    }

    getAvailabilityDates()
  }, [selectedDate, username])

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
            {availability?.possibleTimes.map((time) => (
              <TimerPickerItem
                key={time}
                disabled={!availability.availableTimes.includes(time)}
              >
                {String(time).padStart(2, '0')}:00h
              </TimerPickerItem>
            ))}
          </TimerPickerList>
        </TimerPicker>
      )}
    </Container>
  )
}
