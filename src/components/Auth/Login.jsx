'use client'

import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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

export default function Login({ isOpen, onClose }) {
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="20px" padding="1rem 0.5rem">
        <ModalHeader textAlign="center">Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
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
                          <Box ml="1" position="absolute" right={5}>
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
        </ModalBody>

        <ModalFooter>
          <Flex w="100%" flexDir="column">
            <Flex position="relative" w="100%">
              <Divider height="1.5px" backgroundColor="#D1BEBE" w="100%" />
              <AbsoluteCenter bg="white" px="4" fontWeight="bold">
                or login with
              </AbsoluteCenter>
            </Flex>
            <Flex
              w="100%"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
              mt="2rem"
            >
              <Box w={8} h={8} cursor="pointer">
                <Image src="/images/google.png" />
              </Box>
              <Box w={8} h={8} cursor="pointer">
                <Image src="/images/facebook.png" />
              </Box>
              <Box w={8} h={8} cursor="pointer">
                <Image src="/images/instagram.png" />
              </Box>
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
