import { Box, Button, Flex } from '@chakra-ui/react'
import { useCounter } from '../adapters/useCounter'

const controlHeight = '40px'

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
  const { increment } = useCounter()

  return (
    <Button
      bg="#FF3337"
      borderRadius="sm"
      color="white"
      h={controlHeight}
      onClick={increment}
      _hover={{ bg: '#FF3337' }}
    >
      +1
    </Button>
  )
}

export function Counter() {
  return (
    <Flex align="stretch" borderRadius="md" direction="row" gap={2}>
      <Display />
      <CounterButton />
    </Flex>
  )
}
