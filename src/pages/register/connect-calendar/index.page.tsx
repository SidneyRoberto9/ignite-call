import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";

import { Container, Header } from "../styles";
import { ConnectBox, ConnectItem } from "./styles";

export default function ConnectCalendar() {
  async function handleRegister(data: any) {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant={'secondary'} size={'sm'}>
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type={'submit'}>
          Proximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}