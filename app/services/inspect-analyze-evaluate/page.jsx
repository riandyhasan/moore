'use client'

import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import colors from '@src/styles/colors'

export default function InspectAnalyzeEvaluate() {
  return (
    <Flex w="100%" flexDir="column" minHeight="80vh" padding="2rem 5rem">
      <Flex>
        <Heading fontSize="3em">Inspect, Analyze and Evaluate</Heading>
      </Flex>

      <Flex w="100%" alignItems="center" pr="8rem">
        <Image src="/images/inspect-analyze-evaluate.png" />
        <Flex w="70%" flexDir="column">
          <Text textAlign="justify">
            Through inspection, one can assess the infrastructure, identifying
            potential areas of inefficiency or wastage. Analyzing power
            consumption involves delving into data, understanding usage
            patterns, and pinpointing peak usage times or excessive consumption.
            This analysis is essential for making informed decisions about
            resource allocation and identifying opportunities for conservation.
            Evaluation plays a key role in determining the effectiveness of
            implemented solutions or strategies. It helps in assessing the
            impact of changes made to reduce consumption and improve efficiency.
          </Text>
          <Box mt="2rem">
            <Button
              backgroundColor={colors.orange}
              color="white"
              _hover={{
                backgroundColor: colors.darkerOrange,
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
