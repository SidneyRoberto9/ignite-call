import { Button, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "./styles";

const ClaimUsernameFormSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit, reset } = useForm<ClaimUsernameFormData>()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
    reset()
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size={'sm'}
        prefix={'ignite.com/'}
        placeholder={'seu-usuário'}
        {...register('username')}
      />

      <Button size={'sm'} type={'submit'}>
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
