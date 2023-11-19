'use client'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
} from '@chakra-ui/react'
import colors from '@src/src/styles/colors'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

export default function Home() {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const initialValues = {
    username: '',
    password: '',
  }

  const handleSubmit = values => {
    // Handle form submission logic here
    console.log(values)
  }

  return (
    <Flex
      w="100%"
      flexDir="column"
      alignItems="center"
      minHeight="80vh"
      padding="2rem 20%"
    >
      <Flex gap="1rem" justifyContent="center" mb="2rem">
        <Heading fontSize="2em">Calculate your power expences</Heading>
      </Flex>

      <Flex
        w="100%"
        boxShadow="1px 4px 10px 2.5px rgba(0, 0, 0, 0.2)"
        padding="2rem"
        borderRadius="20px"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form style={{ width: '100%' }}>
            <Grid templateColumns="1fr" gap={4} w="100%">
              <GridItem>
                <Field name="username">
                  {({ field, meta }) => (
                    <FormControl isInvalid={meta.touched && !!meta.error}>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Input
                        {...field}
                        id="username"
                        placeholder="Enter your username"
                      />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </GridItem>

              <GridItem>
                <Field name="password">
                  {({ field, meta }) => (
                    <FormControl
                      isInvalid={meta.touched && !!meta.error}
                      position="relative"
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Flex align="center">
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          placeholder="Enter your password"
                          width="100%"
                        />
                        <Box ml="1" position="absolute" right={5} zIndex={10}>
                          {showPassword ? (
                            <FaEyeSlash
                              onClick={handleTogglePasswordVisibility}
                            />
                          ) : (
                            <FaEye onClick={handleTogglePasswordVisibility} />
                          )}
                        </Box>
                      </Flex>
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </GridItem>
            </Grid>
            <Flex w="100%" justifyContent="flex-end" mt="2rem">
              <Box>
                <Button
                  backgroundColor={colors.orange}
                  color="white"
                  _hover={{
                    backgroundColor: colors.darkerOrange,
                  }}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Box>
            </Flex>
          </Form>
        </Formik>
      </Flex>
    </Flex>
  )
}
