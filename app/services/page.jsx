'use client'

import { Flex, Heading } from '@chakra-ui/react'
import colors from '@src/styles/colors'
import Link from 'next/link'

const services = [
  {
    name: 'Advice and Assist',
    path: '/services/advice-and-assist',
  },
  {
    name: 'Inspect, Analyze, and Evaluate  Power Consumption',
    path: '/services/inspect-analyze-evaluate',
  },
  {
    name: 'Product Procurement',
    path: '/services/product-procurement',
  },
]

export default function Services() {
  return (
    <Flex w="100%" flexDir="column" minHeight="80vh" padding="2rem 5rem">
      <Flex mt="1rem" mb="2rem">
        <Heading fontSize="2.5em">OUR SERVICES</Heading>
      </Flex>

      <Flex w="100%" flexDirection="column" gap="2rem">
        {services.map((service, idx) => (
          <Link href={service.path} key={idx}>
            <Flex
              padding="1rem 2rem"
              borderLeft={`10px solid ${colors.orange}`}
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.2)"
              borderRadius="5px"
              w="100%"
              transition="background-color 0.3s, color 0.3s"
              _hover={{
                backgroundColor: colors.orange,
                color: 'white',
              }}
            >
              <Heading>{service.name}</Heading>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}
