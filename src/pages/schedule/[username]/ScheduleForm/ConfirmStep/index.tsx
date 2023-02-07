import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '../../../../../lib/axios'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email({ message: 'O email deve ser válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormDate = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormDate>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  async function handleConfirmScheduling(data: ConfirmFormDate) {
    const { name, email, observations } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    await router.push(`/schedule/${username}`)
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size={'sm'}>Nome Completo</Text>
        <TextInput
          placeholder="Seu nome"
          {...register('name')}
          autoComplete={'off'}
          spellCheck={'false'}
        />
        {!!errors.name && (
          <FormError size={'sm'}>{errors.name.message}</FormError>
        )}
      </label>

      <label>
        <Text size={'sm'}>Endereço de Email</Text>
        <TextInput
          type={'email'}
          placeholder="johndoe@exemple.com"
          autoComplete={'off'}
          spellCheck={'false'}
          {...register('email')}
        />
        {!!errors.email && (
          <FormError size={'sm'}>{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size={'sm'}>Observações</Text>
        <TextArea
          {...register('observations')}
          autoComplete={'off'}
          spellCheck={'false'}
        />
      </label>

      <FormActions>
        <Button
          type={'button'}
          disabled={isSubmitting}
          variant={'tertiary'}
          onClick={onCancelConfirmation}
        >
          Cancelar
        </Button>
        <Button type={'submit'} disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
