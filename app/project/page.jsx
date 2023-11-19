'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react'

export default function Project() {
  return (
    <Flex
      w="100%"
      flexDir="column"
      alignItems="center"
      minHeight="80vh"
      padding="2rem 5rem"
    >
      <Flex gap="1rem" justifyContent="center">
        <Heading fontSize="2.5em">Reviews</Heading>
      </Flex>

      <Flex w="100%">
        <Grid gap="2rem" templateColumns="1fr 1fr 1fr" w="100%">
          <GridItem>
            <Card boxShadow="2px 4px 4px 4px rgba(0, 0, 0, 0.2)">
              <CardHeader>
                <Heading size="md"> Customer dashboard</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem>
            <Card boxShadow="2px 4px 4px 4px rgba(0, 0, 0, 0.2)">
              <CardHeader>
                <Heading size="md"> Customer dashboard</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem>
            <Card boxShadow="2px 4px 4px 4px rgba(0, 0, 0, 0.2)">
              <CardHeader>
                <Heading size="md"> Customer dashboard</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  )
}
