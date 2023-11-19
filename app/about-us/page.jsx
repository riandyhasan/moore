'use client'

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import colors from '@src/src/styles/colors'

export default function AboutUse() {
  return (
    <Flex
      w="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      padding="2rem 8rem"
    >
      <Flex w="100%" h="100%" alignItems="center" gap="2rem">
        <Box w="100%">
          <Image src="/images/about-us.png" />
        </Box>
        <Flex flexDir="column">
          <Heading color={colors.orange} fontSize="2.5em" mb="1rem">
            Power down your costs
          </Heading>
          <Text fontWeight={600} fontSize="1.3em" textAlign="justify">
            <span style={{ color: colors.orange }}>m00re.</span> adalah pionir
            dalam memberikan solusi untuk penghematan energi listrik dengan
            memberikan rekomendasi penghematan yang terukur serta grafik visual
            yang memudahkan pengguna dalam memahami pola penggunaan alat
            listrik.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
