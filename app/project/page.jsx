'use client'

import { Flex, Heading } from '@chakra-ui/react'
import colors from '@src/styles/colors'
import { MdOutlineRateReview } from 'react-icons/md'

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

      <Flex w="100%" h="100%">
        <Flex
          w="100%"
          h="50vh"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          color={colors.orange}
        >
          <MdOutlineRateReview size="3em" />
          <Heading size="2.5em">No review yet.</Heading>
        </Flex>
        {/* <Grid gap="2rem" templateColumns="1fr 1fr 1fr" w="100%">
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
        </Grid> */}
      </Flex>
    </Flex>
  )
}
