import { Box, Button, Flex, Portal, Toast, Toaster, createToaster } from '@chakra-ui/react'
import { memo, useCallback } from 'react'
import { useCounter } from '../adapters/useCounter'

const controlHeight = '40px'

const counterToaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: false,
  overlap: true,
  max: 1,
  removeDelay: 0,
})

function ToastSuccessIcon() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="32"
      style={{ flexShrink: 0 }}
      viewBox="0 0 24 24"
      width="32"
    >
      <circle cx="12" cy="12" r="10" stroke="#74C898" strokeWidth="2" />
      <path
        d="M8 12.5l2.5 2.5L16 9"
        stroke="#74C898"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

const toastRadial = '53.57% 282.15% at 2.14% 50%'
const toastBackground = `radial-gradient(${toastRadial}, rgba(116, 200, 152, 0.15) 0%, rgba(116, 200, 152, 0.03) 100%), #46474F`
const toastBorderGradient = `radial-gradient(${toastRadial}, rgba(116, 200, 152, 0.65) 0%, rgba(116, 200, 152, 0.1) 100%), linear-gradient(0deg, #6F7076, #6F7076)`
const toastBoxShadow =
  '0px 0px 0px 1px rgba(40, 41, 50, 0.04), 0px 2px 2px -1px rgba(40, 41, 50, 0.04), 0px 4px 4px -2px rgba(40, 41, 50, 0.04), 0px 8px 8px -4px rgba(40, 41, 50, 0.06), 0px 16px 32px rgba(40, 41, 50, 0.06)'

function CounterToast({ value }: { value: number }) {
  const textStyles = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    lineHeight: '20px',
    color: '#FFFFFF',
  }

  return (
    <Box
      background={toastBorderGradient}
      borderRadius="10px"
      boxShadow={toastBoxShadow}
      minW="280px"
      p="1px"
    >
      <Flex
        align="center"
        background={toastBackground}
        borderRadius="9px"
        direction="row"
        gap="12px"
        padding="16px 32px 16px 20px"
      >
        <ToastSuccessIcon />
        <Flex direction="column" gap="6px">
          <Box as="span" {...textStyles} fontWeight={700}>
            Incremented
          </Box>
          <Box as="span" {...textStyles} fontWeight={500}>
            {`Counter is now ${value}`}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

function Display() {
  const { count } = useCounter()

  return (
    <Box
      alignItems="center"
      bg="transparent"
      border="1px solid #FF3337"
      borderRadius="sm"
      color="#424355"
      display="flex"
      h={controlHeight}
      px={4}
    >
      {`Current count ${count}`}
    </Box>
  )
}

function CounterButton() {
  const { count, increment } = useCounter()

  const handleClick = useCallback(() => {
    const nextCount = count + 1
    increment()
    counterToaster.dismiss()
    counterToaster.create({
      title: <CounterToast value={nextCount} />,
      duration: 3000,
      closable: false,
    })
  }, [count, increment])

  return (
    <Button
      bg="#FF3337"
      borderRadius="sm"
      color="white"
      h={controlHeight}
      onClick={handleClick}
      _hover={{ bg: '#FF3337' }}
    >
      +1
    </Button>
  )
}

const CounterToaster = memo(function CounterToaster() {
  return (
    <Portal>
      <Toaster toaster={counterToaster}>
        {(toast) => (
          <Toast.Root
            unstyled
            bg="transparent"
            boxShadow="none"
            p={0}
            width="auto"
            css={{
              transition: 'opacity 0.15s ease, translate 0.15s ease, scale 0.15s ease',
              '&[data-state=closed]': { transitionDuration: '0.1s' },
            }}
          >
            {toast.title}
          </Toast.Root>
        )}
      </Toaster>
    </Portal>
  )
})

export function Counter() {
  return (
    <>
      <CounterToaster />
      <Flex align="stretch" borderRadius="md" direction="row" gap={2}>
        <Display />
        <CounterButton />
      </Flex>
    </>
  )
}
