'use client'

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Tag,
  Text,
} from '@chakra-ui/react'
import colors from '@src/styles/colors'

export default function AdviceAndAssist() {
  return (
    <Flex w="100%" flexDir="column" minHeight="80vh" padding="2rem 5rem">
      <Flex>
        <Heading fontSize="3em">Advice and Assist</Heading>
      </Flex>

      <Flex w="100%" flexDir="column">
        <Grid
          gap="2rem"
          templateColumns="1fr 1fr 1fr"
          w="100%"
          paddingX="8rem"
          py="2rem"
        >
          <GridItem>
            <Flex
              width="250px"
              flexDir="column"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.2)"
              borderRadius="10px"
              position="relative"
            >
              <Flex width="250px" height="250px">
                <Image
                  src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  borderRadius="10px"
                />
              </Flex>
              <Flex
                position="absolute"
                bottom={2}
                w="100%"
                alignItems="center"
                flexDirection="column"
              >
                <Box>
                  <Tag bg={colors.orange} color="white">
                    Monan
                  </Tag>
                </Box>
                <Box>
                  <Text color={colors.orange}>Junior IT</Text>
                </Box>
              </Flex>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex
              width="250px"
              flexDir="column"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.2)"
              borderRadius="10px"
              position="relative"
            >
              <Flex width="250px" height="250px">
                <Image
                  src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  borderRadius="10px"
                />
              </Flex>
              <Flex
                position="absolute"
                bottom={2}
                w="100%"
                alignItems="center"
                flexDirection="column"
              >
                <Box>
                  <Tag bg={colors.orange} color="white">
                    Monan
                  </Tag>
                </Box>
                <Box>
                  <Text color={colors.orange}>Junior IT</Text>
                </Box>
              </Flex>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex
              width="250px"
              flexDir="column"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.2)"
              borderRadius="10px"
              position="relative"
            >
              <Flex width="250px" height="250px">
                <Image
                  src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  borderRadius="10px"
                />
              </Flex>
              <Flex
                position="absolute"
                bottom={2}
                w="100%"
                alignItems="center"
                flexDirection="column"
              >
                <Box>
                  <Tag bg={colors.orange} color="white">
                    Monan
                  </Tag>
                </Box>
                <Box>
                  <Text color={colors.orange}>Junior IT</Text>
                </Box>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>

        <Flex mt="2rem" px="8rem">
          <Text>
            Advice and assist service is a vital resource providing tailored
            guidance and support to individuals and organizations. Through
            consultations, these services bring clarity, aiding in
            problem-solving and strategizing. By combining expertise with a
            personalized approach, they empower clients to make well-informed
            choices and take effective action.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
