import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

import { Container, Form, Header } from "./styles";

export default function Register() {
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

      <Form as="form">
        <label>
          <Text size={'sm'}>Nome de usuário</Text>
          <TextInput
            placeholder={'seu-usuário'}
            prefix={'ignite.com/'}
            autoComplete={'off'}
            spellCheck={'false'}
          />
        </label>

        <label>
          <Text size={'sm'}>Nome completo</Text>
          <TextInput
            placeholder={'Seu Nome'}
            autoComplete={'off'}
            spellCheck={'false'}
          />
        </label>

        <Button type={'submit'}>
          Proximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
