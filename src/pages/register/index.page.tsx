import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Container, Form, FormError, Header } from "./styles";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letra.' })
    .regex(/^([a-zA-Z\\-]+)$/, {
      message: 'O usuário só pode conter letras e hifens.',
    })
    .transform((value) => value.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})

type RegisterFormDate = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormDate>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: RegisterFormDate) {
    console.log(data)
    reset()
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas Informações para criar seu perfil! Ah, você pode
          editar esses informações depois.
        </Text>

        <MultiStep size={4} currentStep={1}></MultiStep>
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size={'sm'}>Nome de usuário</Text>
          <TextInput
            placeholder={'seu-usuário'}
            prefix={'ignite.com/'}
            autoComplete={'off'}
            spellCheck={'false'}
            {...register('username')}
          />

          {!!errors.username && (
            <FormError size={'sm'}>{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size={'sm'}>Nome completo</Text>
          <TextInput
            placeholder={'Seu Nome'}
            autoComplete={'off'}
            spellCheck={'false'}
            {...register('name')}
          />

          {!!errors.name && (
            <FormError size={'sm'}>{errors.name.message}</FormError>
          )}
        </label>

        <Button type={'submit'} disabled={isSubmitting}>
          Proximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
