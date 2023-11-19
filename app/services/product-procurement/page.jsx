'use client'

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import colors from '@src/src/styles/colors'

const products = [
  {
    name: 'Smart LED Bulb',
    image: '/images/light-bulb.png',
    price: 'Rp67.000,00',
  },
  {
    name: 'Smart Socket',
    image: '/images/smart-socket.png',
    price: 'Rp430.000,00',
  },
  {
    name: 'Smart Plug',
    image: '/images/smart-plug.png',
    price: 'Rp116.000,00',
  },
  {
    name: 'Smart Wall Socket',
    image: '/images/smart-wall-socket.png',
    price: 'Rp227.000,00',
  },
]

export default function ProductProcurement() {
  return (
    <Flex w="100%" flexDir="column" minHeight="80vh" padding="2rem 5rem">
      <Flex>
        <Heading fontSize="3em">Product Procurement</Heading>
      </Flex>

      <Flex w="100%" px="8rem" mt="2rem">
        <Grid templateColumns="1fr 1fr" w="100%" rowGap="2rem">
          {products.map((product, idx) => (
            <GridItem key={idx}>
              <Flex
                boxShadow="1px 4px 10px 2.5px rgba(0, 0, 0, 0.2)"
                p="2rem"
                borderRadius="20px"
                w="450px"
                height="200px"
                alignItems="center"
                gap="2rem"
              >
                <Box>
                  <Image src={product.image} />
                </Box>
                <Flex
                  w="100%"
                  height="150px"
                  flexDir="column"
                  justifyContent="space-between"
                  pt="1rem"
                >
                  <Box>
                    <Text fontSize="1.3em">
                      <span style={{ color: colors.orange }}>m00re.</span>{' '}
                      {product.name}
                    </Text>
                    <Heading fontSize="1.2em" mt="0.4rem">
                      {product.price}
                    </Heading>
                  </Box>
                  <Flex gap="0.5rem">
                    <Button
                      backgroundColor={colors.blue}
                      color="white"
                      _hover={{
                        backgroundColor: colors.darkerBlue,
                      }}
                      size="sm"
                    >
                      Buy Now
                    </Button>
                    <Button
                      backgroundColor={colors.orange}
                      color="white"
                      _hover={{
                        backgroundColor: colors.darkerOrange,
                      }}
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  )
}
