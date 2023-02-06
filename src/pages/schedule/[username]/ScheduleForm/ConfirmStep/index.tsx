import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email({ message: 'O email deve ser válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormDate = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormDate>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmScheduling(data: ConfirmFormDate) {
    console.log(data)
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label>
        <Text size={'sm'}>Nome Completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {!!errors.name && (
          <FormError size={'sm'}>{errors.name.message}</FormError>
        )}
      </label>

      <label>
        <Text size={'sm'}>Endereço de Email</Text>
        <TextInput
          type={'email'}
          placeholder="johndoe@exemple.com"
          {...register('email')}
        />
        {!!errors.email && (
          <FormError size={'sm'}>{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size={'sm'}>Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type={'button'} disabled={isSubmitting} variant={'tertiary'}>
          Cancelar
        </Button>
        <Button type={'submit'} disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
