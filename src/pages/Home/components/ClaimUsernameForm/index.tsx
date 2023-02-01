import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormAnnotation } from "./styles";

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letra.' })
    .regex(/^([a-zA-Z\\-]+)$/, {
      message: 'O usuário só pode conter letras e hifens.',
    })
    .transform((value) => value.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
    reset()
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size={'sm'}
          prefix={'ignite.com/'}
          placeholder={'seu-usuário'}
          autoComplete={'off'}
          spellCheck={'false'}
          {...register('username')}
        />

        <Button size={'sm'} type={'submit'}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation isError={!!errors.username}>
        <Text size={'sm'}>
          {!!errors.username
            ? errors.username.message
            : 'Digite o nome de usuário desejado.'}
        </Text>
      </FormAnnotation>
    </>
  )
}
