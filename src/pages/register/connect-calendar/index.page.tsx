import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'

import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'
  let isNavigation = false

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigationToNext() {
    isNavigation = true
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Connect sua agenda do Google | Ignite Call" noindex />

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

            {isSignedIn ? (
              <Button size={'sm'} disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                onClick={handleConnectCalendar}
                variant={'secondary'}
                size={'sm'}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size={'sm'}>
              Falha ao se Conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button
            type={'submit'}
            disabled={!isSignedIn || isNavigation}
            onClick={handleNavigationToNext}
          >
            Proximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
